import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";

const sourceOrigin = "https://cars.auctionsapi.com";
const outputDir = resolve("public");
const maxPages = 80;
const maxCarPages = 30;

const initialRoutes = [
  "/",
  "/about",
  "/blog",
  "/contacts",
  "/favorites",
  "/privacy",
  "/search",
  "/shipping",
  "/terms"
];

const localeCodes = ["en", "ru", "ro", "uk", "pl", "bg", "ka", "lt"];
const i18nHash = "d46e7eb2";
const buildManifestId = "dba07bad-1e35-418e-b22c-b56288cef007";
const missingUpstreamImageFallbacks = new Set([
  "/images/brands/kS7W0McVqGYAdA5NOzM5BGG6yx21wPpOUgANxVi9.png"
]);
const transparentPng = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=",
  "base64"
);

const localAssetOrigins = new Set([
  "https://cars.auctionsapi.com",
  "https://auctionsapi.com",
  "https://cars.import-motor.com",
  "https://cars2.import-motor.com"
]);

const pageQueue = [...initialRoutes];
const seenPages = new Set();
const seenAssets = new Set();
let carPagesQueued = 0;

function normalizeRoute(value) {
  if (!value || value.startsWith("#")) return "";
  if (/^(mailto:|tel:|javascript:|data:)/i.test(value)) return "";

  let url;
  try {
    url = new URL(value, sourceOrigin);
  } catch {
    return "";
  }

  if (url.origin !== sourceOrigin && url.origin !== "https://api-website.com") {
    return "";
  }

  if (url.search) {
    url.search = "";
  }

  const route = url.pathname.replace(/\/+$/g, "") || "/";
  return route;
}

function shouldQueuePage(route) {
  if (!route || seenPages.has(route) || pageQueue.includes(route)) return false;
  if (route === "/") return true;
  if (/^\/(about|blog|contacts|favorites|privacy|search|shipping|terms)(\/|$)/.test(route)) {
    return true;
  }
  if (route.startsWith("/cars/") && carPagesQueued < maxCarPages) {
    carPagesQueued += 1;
    return true;
  }
  return false;
}

function pageOutputPath(route) {
  if (route === "/") return join(outputDir, "index.html");
  return join(outputDir, route, "index.html");
}

function assetOutputPath(url) {
  return join(outputDir, decodeURIComponent(url.pathname));
}

function extractHtmlUrls(html) {
  const urls = new Set();
  for (const match of html.matchAll(/\b(?:src|href|poster|content)=["']([^"']+)["']/gi)) {
    urls.add(match[1]);
  }
  for (const match of html.matchAll(/url\((["']?)([^"')]+)\1\)/gi)) {
    urls.add(match[2]);
  }
  return urls;
}

function extractAssetUrls(content, baseUrl) {
  const urls = new Set();
  const patterns = [
    /url\((["']?)([^"')]+)\1\)/gi,
    /\bimport\s*\(\s*["']([^"']+)["']\s*\)/gi,
    /\bimport[^;]+?\bfrom\s*["']([^"']+)["']/gi,
    /\bimport\s*["']([^"']+)["']/gi,
    /["'](\.\/[^"']+\.(?:js|css|webp|png|jpg|jpeg|svg|ico|woff2?|json))["']/gi
  ];

  for (const pattern of patterns) {
    for (const match of content.matchAll(pattern)) {
      urls.add(match[2] || match[1]);
    }
  }

  return [...urls]
    .map((value) => toLocalAssetUrl(value, baseUrl))
    .filter(Boolean);
}

function toLocalAssetUrl(value, baseUrl = sourceOrigin) {
  if (!value || value.startsWith("#")) return null;
  if (/^(mailto:|tel:|javascript:|data:|blob:)/i.test(value)) return null;

  let url;
  try {
    url = new URL(value, baseUrl);
  } catch {
    return null;
  }

  if (!localAssetOrigins.has(url.origin)) return null;

  url.search = "";
  url.hash = "";

  const path = url.pathname;
  const hasAssetExtension = /\.(?:js|css|webp|png|jpe?g|svg|ico|woff2?|json|txt)$/i.test(path);
  if (!hasAssetExtension) return null;

  if (
    path.startsWith("/_nuxt/") ||
    path.startsWith("/_i18n/") ||
    path.startsWith("/brand/") ||
    path.startsWith("/images/") ||
    path.startsWith("/cdn-cgi/scripts/") ||
    path === "/favicon.svg" ||
    path === "/robots.txt"
  ) {
    return url;
  }

  // Allow vehicle photos from import-motor (these power the car detail galleries)
  if (path.includes("/iaai/") || path.includes("/copart/") || /\/[A-Z0-9]{17,}-[0-9]+\.(webp|jpg|jpeg|png)$/i.test(path)) {
    return url;
  }

  return null;
}

function patchHtml(html) {
  let next = html
    .replaceAll("https://cars.auctionsapi.com", "")
    .replaceAll("https://api-website.com", "")
    .replaceAll("https://auctionsapi.com/images/", "/images/");

  // Rewrite car photos from import-motor to local mirrored copies
  // so the gallery in car details works with real images like on the original
  next = next.replaceAll(/https?:\/\/cars2?\.import-motor\.com([^\s"'<>]+)/gi, (match, path) => {
    const filename = path.split("/").pop();
    return `/images/vehicle/${filename}`;
  });

  return next;
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 static mirror builder"
    }
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }

  return response.text();
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 static mirror builder"
    }
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

async function writeGeneratedFile(filePath, data) {
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, data);
}

async function downloadAsset(assetUrl) {
  const assetKey = assetUrl.href;
  if (seenAssets.has(assetKey)) return;
  seenAssets.add(assetKey);

  let outputPath = assetOutputPath(assetUrl);

  // Normalize vehicle photos to a clean local folder so gallery images work reliably
  const isVehiclePhoto = /cars2?\.import-motor\.com/i.test(assetUrl.href);
  if (isVehiclePhoto) {
    const filename = assetUrl.pathname.split("/").pop();
    outputPath = join(outputDir, "images", "vehicle", decodeURIComponent(filename));
  }

  try {
    const data = await fetchBuffer(assetUrl);
    await writeGeneratedFile(outputPath, data);

    if (/\.(?:js|css)$/i.test(assetUrl.pathname)) {
      const content = await readFile(outputPath, "utf8");
      const nestedAssets = extractAssetUrls(content, assetUrl.href);
      for (const nestedAsset of nestedAssets) {
        await downloadAsset(nestedAsset);
      }
    }
  } catch (error) {
    if (missingUpstreamImageFallbacks.has(assetUrl.pathname)) {
      await writeGeneratedFile(outputPath, transparentPng);
      console.warn(`Created placeholder for missing upstream asset ${assetUrl.href}`);
      return;
    }

    console.warn(`Skipped asset ${assetUrl.href}: ${error.message}`);
  }
}

async function downloadPage(route) {
  if (seenPages.has(route) || seenPages.size >= maxPages) return;
  seenPages.add(route);

  const sourceUrl = new URL(route, sourceOrigin);
  const html = await fetchText(sourceUrl);
  const outputHtml = patchHtml(html);
  await writeGeneratedFile(pageOutputPath(route), outputHtml);

  for (const value of extractHtmlUrls(html)) {
    const assetUrl = toLocalAssetUrl(value, sourceUrl.href);
    if (assetUrl) {
      await downloadAsset(assetUrl);
    }

    const nextRoute = normalizeRoute(value);
    if (shouldQueuePage(nextRoute)) {
      pageQueue.push(nextRoute);
    }
  }

  console.log(`Fetched ${route}`);
}

async function main() {
  await rm(outputDir, { recursive: true, force: true });
  await mkdir(outputDir, { recursive: true });

  for (const localeCode of localeCodes) {
    await downloadAsset(new URL(`/_i18n/${i18nHash}/${localeCode}/messages.json`, sourceOrigin));
  }
  await downloadAsset(new URL(`/_nuxt/builds/meta/${buildManifestId}.json`, sourceOrigin));

  while (pageQueue.length > 0 && seenPages.size < maxPages) {
    const route = pageQueue.shift();
    try {
      await downloadPage(route);
    } catch (error) {
      console.warn(`Skipped page ${route}: ${error.message}`);
    }
  }

  console.log(`Mirrored ${seenPages.size} pages and ${seenAssets.size} assets into ${outputDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
