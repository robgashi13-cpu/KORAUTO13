import { createReadStream, existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";
import { Readable } from "node:stream";

const root = resolve("public");
const port = Number.parseInt(process.env.PORT || "4173", 10);
const apiOrigin = process.env.API_ORIGIN || "https://cars.auctionsapi.com";
const exchangeRateOrigin = "https://api.frankfurter.app";
const logoUrl = "https://13vetura.com/assets/logo-EwEQIT7A.png";
const defaultUsdToEur = 0.86;
const encarTotalPriceFeeEur = 2350;
const vehicleSketchRedirects = new Map([
  ["/images/vehicle/car_sketch_front.webp", `${apiOrigin}/images/vehicle/car_sketch_front.webp`],
  ["/images/vehicle/car_sketch_back.webp", `${apiOrigin}/images/vehicle/car_sketch_back.webp`]
]);
const moneyQueryParams = new Set([
  "priceFrom",
  "priceTo",
  "bid_price_from",
  "bid_price_to",
  "buy_now_price_from",
  "buy_now_price_to",
  "bidFrom",
  "bidTo",
  "buyNowFrom",
  "buyNowTo"
]);
let exchangeRateCache = null;
let carDetailShellCache = null;

const priorityManufacturers = new Map(
  [
    "audi",
    "bmw",
    "mercedes",
    "mercedes benz",
    "mercedes-benz",
    "volkswagen",
    "hyundai",
    "kia",
    "genesis",
    "renault",
    "renault samsung",
    "ssangyong",
    "kgm",
    "daewoo"
  ].map((name, index) => [name, index])
);

const contentTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".webp", "image/webp"],
  [".ico", "image/x-icon"],
  [".woff", "font/woff"],
  [".woff2", "font/woff2"]
]);

function resolveFile(requestPath) {
  const decodedPath = decodeURIComponent(requestPath.split("?")[0] || "/");
  const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  let candidate = join(root, safePath);

  if (existsSync(candidate) && statSync(candidate).isDirectory()) {
    candidate = join(candidate, "index.html");
  }

  if (existsSync(candidate) && statSync(candidate).isFile()) {
    return candidate;
  }

  const routeIndex = join(root, safePath, "index.html");
  if (existsSync(routeIndex) && statSync(routeIndex).isFile()) {
    return routeIndex;
  }

  if (safePath === "/cars" || safePath.startsWith("/cars/")) {
    const carDetailShell = findCarDetailShell();
    if (carDetailShell) {
      return carDetailShell;
    }
  }

  if (extname(safePath)) {
    return null;
  }

  return join(root, "index.html");
}

function toRoutePath(filePath) {
  const relative = filePath.slice(root.length).replaceAll("\\", "/");
  const withoutIndex = relative.endsWith("/index.html") ? relative.slice(0, -"/index.html".length) : relative;
  return withoutIndex || "/";
}

function escapeNuxtPath(routePath) {
  return routePath.replaceAll("/", "\\u002F");
}

function sendDynamicCarDetailShell(requestPath, filePath, response) {
  const shellPath = toRoutePath(filePath);
  const html = readFileSync(filePath, "utf8");
  const rewritten = html
    .replaceAll(shellPath, requestPath)
    .replaceAll(escapeNuxtPath(shellPath), escapeNuxtPath(requestPath));

  response.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "no-store"
  });
  response.end(rewritten);
}

function findCarDetailShell() {
  if (carDetailShellCache !== null) {
    return carDetailShellCache;
  }

  const carsDir = join(root, "cars");
  if (!existsSync(carsDir) || !statSync(carsDir).isDirectory()) {
    carDetailShellCache = "";
    return carDetailShellCache;
  }

  const stack = [carsDir];
  while (stack.length) {
    const current = stack.shift();
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const fullPath = join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }
      if (entry.name === "index.html") {
        carDetailShellCache = fullPath;
        return carDetailShellCache;
      }
    }
  }

  carDetailShellCache = "";
  return carDetailShellCache;
}

function shouldProxyToApi(requestPath) {
  return requestPath.startsWith("/api/");
}

function isExchangeRateRequest(requestPath) {
  return requestPath === "/api/exchange-rates";
}

function getSearchDefaultRedirect(request) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return "";
  }

  const url = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`);
  if (url.pathname !== "/search") {
    return "";
  }

  if (url.searchParams.has("source") || url.searchParams.has("sources")) {
    return "";
  }

  url.searchParams.set("source", "encar");
  return `${url.pathname}${url.search}${url.hash}`;
}

async function getExchangeRates() {
  const now = Date.now();
  if (exchangeRateCache && exchangeRateCache.expiresAt > now) {
    return exchangeRateCache.value;
  }

  try {
    const response = await fetch(`${exchangeRateOrigin}/latest?from=USD&to=EUR`, {
      headers: {
        Accept: "application/json",
        "User-Agent": "13vetura local mirror"
      }
    });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    const payload = await response.json();
    const usdToEur = Number(payload?.rates?.EUR);
    if (!Number.isFinite(usdToEur) || usdToEur <= 0) {
      throw new Error("Invalid EUR exchange rate");
    }
    const value = {
      base: "USD",
      date: payload.date,
      rates: { EUR: usdToEur },
      usdToEur,
      source: exchangeRateOrigin
    };
    exchangeRateCache = {
      value,
      expiresAt: now + 60 * 60 * 1000
    };
    return value;
  } catch (error) {
    const fallback = {
      base: "USD",
      date: new Date().toISOString().slice(0, 10),
      rates: { EUR: defaultUsdToEur },
      usdToEur: defaultUsdToEur,
      source: "fallback",
      warning: error.message
    };
    exchangeRateCache = {
      value: fallback,
      expiresAt: now + 5 * 60 * 1000
    };
    return fallback;
  }
}

function writeJson(response, status, payload) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "Access-Control-Allow-Origin": "*"
  });
  response.end(JSON.stringify(payload));
}

async function handleExchangeRates(response) {
  writeJson(response, 200, await getExchangeRates());
}

function formatEuro(amount) {
  const value = Math.round(Number(amount));
  const formatted = new Intl.NumberFormat("sq-AL", {
    maximumFractionDigits: 0
  }).format(Math.abs(value));
  return value < 0 ? `-€${formatted}` : `€${formatted}`;
}

function convertDollarString(value, usdToEur) {
  if (typeof value !== "string" || !value.includes("$")) {
    return value;
  }

  return value.replace(/\$[\s\u00a0]*-?[\d,.]+/g, (match) => {
    const numeric = Number(match.replace(/[^0-9.-]/g, ""));
    if (!Number.isFinite(numeric)) {
      return match.replace("$", "€");
    }
    return formatEuro(numeric * usdToEur);
  });
}

function parseEuroString(value) {
  if (typeof value !== "string" || !value.includes("€")) {
    return null;
  }

  const normalized = value.replace(/[\s\u00a0]/g, "").replace(",", ".");
  const numeric = Number(normalized.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(numeric) ? numeric : null;
}

function isMoneyKey(key) {
  return /(^|_)(price|bid|buy_now|final_bid|cash_value|wholesale|retail|estimate_repair)(_|$)/i.test(key);
}

const apiTextTranslations = new Map([
  ["Retail value", "Vlera e tregut"],
  ["Run and drives", "Ndez dhe ecën"],
  ["Engine starts", "Motori ndizet"],
  ["Front end", "Pjesa e përparme"],
  ["Rear end", "Pjesa e pasme"],
  ["Side", "Anësore"],
  ["Hail", "Breshër"],
  ["Mechanical", "Mekanike"],
  ["Minor dent scratches", "Gërvishtje të vogla"],
  ["Normal wear", "Konsum normal"],
  ["Water flood", "Dëmtim nga uji"],
  ["Burn", "Djegie"],
  ["Theft", "Vjedhje"],
  ["Repossession", "Rimarrje"],
  ["Automatic", "Automatik"],
  ["Manual", "Manual"],
  ["Gasoline", "Benzinë"],
  ["Diesel", "Naftë"],
  ["Hybrid", "Hibrid"],
  ["Electric", "Elektrik"],
  ["Current bid", "Oferta aktuale"],
  ["Buy now", "Bli tani"],
  ["Final bid", "Oferta finale"],
  ["Final price", "Çmimi final"],
  ["Coming soon", "Së shpejti"],
  ["Sale", "Shitje"],
  ["Sold", "Shitur"],
  ["On approval", "Në miratim"],
  ["Not sold", "Nuk u shit"],
  ["Not on sale", "Jo në shitje"],
  ["TBA", "Në pritje"],
  ["N/A", "N/A"]
]);
const apiTextTranslationsByLowercase = new Map(
  [...apiTextTranslations].map(([key, value]) => [key.toLowerCase(), value])
);

function translateApiText(value) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  return apiTextTranslations.get(trimmed) || apiTextTranslationsByLowercase.get(trimmed.toLowerCase()) || value;
}

function isEncarRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const source = String(value.source || value.sourceLabel || "").toLowerCase();
  return source.includes("encar");
}

function addEncarTotalPriceFee(value) {
  if (!isEncarRecord(value)) {
    return value;
  }

  const next = { ...value };
  for (const key of ["price", "buyNowPrice"]) {
    const current = next[key];
    if (typeof current === "string") {
      const amount = parseEuroString(current);
      if (amount !== null && amount > 0) {
        next[key] = formatEuro(amount + encarTotalPriceFeeEur);
      }
      continue;
    }

    if (typeof current === "number" && Number.isFinite(current) && current > 0) {
      next[key] = Math.round((current + encarTotalPriceFeeEur) * 100) / 100;
    }
  }

  return next;
}

function transformApiPayload(value, usdToEur, key = "") {
  if (Array.isArray(value)) {
    return value.map((item) => transformApiPayload(item, usdToEur));
  }

  if (value && typeof value === "object") {
    const transformed = Object.fromEntries(
      Object.entries(value).map(([entryKey, entryValue]) => [
        entryKey,
        transformApiPayload(entryValue, usdToEur, entryKey)
      ])
    );
    return addEncarTotalPriceFee(transformed);
  }

  if (typeof value === "string") {
    return translateApiText(convertDollarString(value, usdToEur));
  }

  if (typeof value === "number" && Number.isFinite(value) && isMoneyKey(key)) {
    return Math.round(value * usdToEur * 100) / 100;
  }

  return value;
}

function manufacturerPriority(name) {
  const normalized = String(name || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
  return priorityManufacturers.has(normalized) ? priorityManufacturers.get(normalized) : Number.POSITIVE_INFINITY;
}

function sortManufacturersPayload(payload) {
  const sortManufacturers = (items) =>
    [...items].sort((left, right) => {
      const leftPriority = manufacturerPriority(left?.name);
      const rightPriority = manufacturerPriority(right?.name);
      if (leftPriority !== rightPriority) {
        return leftPriority - rightPriority;
      }
      return String(left?.name || "").localeCompare(String(right?.name || ""), "sq", {
        sensitivity: "base"
      });
    });

  if (Array.isArray(payload)) {
    return sortManufacturers(payload);
  }

  if (payload?.data && Array.isArray(payload.data)) {
    return {
      ...payload,
      data: sortManufacturers(payload.data)
    };
  }

  return payload;
}

function buildApiUrl(request, usdToEur) {
  const targetUrl = new URL(request.url || "/", apiOrigin);

  if (
    request.method === "GET" &&
    (targetUrl.pathname === "/api/catalog" ||
      targetUrl.pathname === "/api/catalog/cars" ||
      targetUrl.pathname === "/api/home-cars") &&
    !targetUrl.searchParams.has("source") &&
    !targetUrl.searchParams.has("sources") &&
    !targetUrl.searchParams.has("domain_id")
  ) {
    targetUrl.searchParams.set("source", "encar");
  }

  for (const param of moneyQueryParams) {
    const raw = targetUrl.searchParams.get(param);
    if (!raw) continue;

    const value = Number(String(raw).replace(/[^0-9.-]/g, ""));
    if (!Number.isFinite(value)) continue;

    targetUrl.searchParams.set(param, String(Math.round(value / usdToEur)));
  }

  return targetUrl;
}

function shouldTransformJson(requestPath) {
  return (
    requestPath.startsWith("/api/catalog/") ||
    requestPath === "/api/catalog" ||
    requestPath === "/api/home-cars" ||
    requestPath === "/api/currency/krw-usd"
  );
}

async function proxyToApi(request, response) {
  const requestPath = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`).pathname;
  const rates = await getExchangeRates();
  const targetUrl = buildApiUrl(request, rates.usdToEur);
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");

  try {
    const upstreamResponse = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.method === "GET" || request.method === "HEAD" ? undefined : Readable.toWeb(request),
      duplex: "half",
      redirect: "manual"
    });

    const responseHeaders = {};
    upstreamResponse.headers.forEach((value, key) => {
      if (!["content-encoding", "content-length", "transfer-encoding"].includes(key.toLowerCase())) {
        responseHeaders[key] = value;
      }
    });
    responseHeaders["Access-Control-Allow-Origin"] = "*";
    responseHeaders["Cache-Control"] = "no-store";

    const contentType = upstreamResponse.headers.get("content-type") || "";
    if (contentType.includes("application/json") && shouldTransformJson(requestPath)) {
      const payload = await upstreamResponse.json();
      const transformedPayload =
        requestPath === "/api/currency/krw-usd" && typeof payload?.usdPerKrw !== "undefined"
          ? {
              ...payload,
              usdPerKrw: Number(payload.usdPerKrw) * rates.usdToEur,
              eurPerKrw: Number(payload.usdPerKrw) * rates.usdToEur,
              targetCurrency: "EUR"
            }
          : requestPath === "/api/catalog/manufacturers"
            ? sortManufacturersPayload(transformApiPayload(payload, rates.usdToEur))
            : transformApiPayload(payload, rates.usdToEur);
      writeJson(response, upstreamResponse.status, transformedPayload);
      return;
    }

    response.writeHead(upstreamResponse.status, responseHeaders);

    if (request.method === "HEAD" || !upstreamResponse.body) {
      response.end();
      return;
    }

    Readable.fromWeb(upstreamResponse.body).pipe(response);
  } catch (error) {
    response.writeHead(502, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end(JSON.stringify({ error: "API proxy failed", message: error.message }));
  }
}

const server = createServer((request, response) => {
  const requestPath = new URL(request.url || "/", `http://${request.headers.host || "localhost"}`).pathname;
  const searchDefaultRedirect = getSearchDefaultRedirect(request);
  if (searchDefaultRedirect) {
    response.writeHead(302, {
      Location: searchDefaultRedirect,
      "Cache-Control": "no-store"
    });
    response.end();
    return;
  }

  if (requestPath === "/brand/site-logo.svg") {
    response.writeHead(302, {
      Location: logoUrl,
      "Cache-Control": "public, max-age=3600"
    });
    response.end();
    return;
  }

  if (vehicleSketchRedirects.has(requestPath)) {
    response.writeHead(302, {
      Location: vehicleSketchRedirects.get(requestPath),
      "Cache-Control": "public, max-age=31536000, immutable"
    });
    response.end();
    return;
  }

  if (isExchangeRateRequest(requestPath)) {
    void handleExchangeRates(response);
    return;
  }

  if (shouldProxyToApi(requestPath)) {
    void proxyToApi(request, response);
    return;
  }

  const filePath = resolveFile(request.url || "/");
  if (!filePath) {
    response.writeHead(404, {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store"
    });
    response.end("Not found");
    return;
  }

  const extension = extname(filePath).toLowerCase();
  const contentType = contentTypes.get(extension) || "application/octet-stream";
  const carDetailShell = requestPath.startsWith("/cars/") ? findCarDetailShell() : "";
  if (carDetailShell && filePath === carDetailShell && toRoutePath(filePath) !== requestPath) {
    sendDynamicCarDetailShell(requestPath, filePath, response);
    return;
  }

  const isBrandCustomization = filePath.startsWith(join(root, "brand"));
  const isStaticAsset = /\.(?:css|js|mjs|json|svg|png|jpe?g|webp|ico|woff2?)$/i.test(filePath);
  response.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": isBrandCustomization ? "no-store" : isStaticAsset ? "public, max-age=31536000, immutable" : "no-store"
  });

  createReadStream(filePath).pipe(response);
});

server.listen(port, () => {
  console.log(`Serving mirrored site at http://localhost:${port}`);
});
