(() => {
  const business = {
    name: "13vetura",
    logoUrl: "https://13vetura.com/assets/logo-EwEQIT7A.png",
    phonePrimary: "+38348181116",
    phoneSecondary: "+38346181117",
    phoneTertiary: "+38345105588",
    phoneDisplay: "+383 48 181 116",
    phoneFullDisplay: "+383 48 181 116 / +383 46 181 117 / +383 45 105 588",
    emailPrimary: "info@13vetura.com",
    emailSales: "sales@13vetura.com",
    whatsapp: "https://wa.me/38348181116",
    addressPrimary: "Rruga Ilaz Kodra nr. 70, Prishtinë (te KEK-u)",
    addressSecondary: "Rruga Përroi i Njelmët 158",
    addressFull: "Rruga Ilaz Kodra nr. 70, Prishtinë (te KEK-u) / Rruga Përroi i Njelmët 158",
    hours: "E Hënë - E Shtunë: 09:00 - 19:00 (UTC+1)",
    mapLink: "https://maps.google.com/?q=rruga+ilaz+kodra+nr+70+prishtine"
  };

  let usdToEur = 0.86;
	  let pending = false;
	  let carLinkNavigationInstalled = false;
	  let vehicleDetailRouteKey = "";
	  let vehicleDetailRecord = null;
	  let vehicleDetailRequest = null;
	  let imageErrorRepairInstalled = false;
	  const sourceDefaultsApplied = new Set();
	  const sourceDefaultAttempts = new Map();
	  const themeStorageKey = "13vetura:black-white-theme";

  const exactText = new Map([
    ["ImportAuto", business.name],
    ["Find a car", "Gjej veturë"],
    ["CALL", "TELEFON"],
    ["Call", "Telefono"],
    ["Cars from USA", "Vetura nga SHBA"],
    ["Cars from South Korea", "Vetura nga Koreja e Jugut"],
    ["Search vehicle", "Kërko veturë"],
    ["Search vehicles", "Kërko vetura"],
    ["Shipping", "Transporti"],
    ["How it works", "Si funksionon"],
	    ["Blog", "Blog"],
	    ["Auction", "Nga Koreja te garazhi juaj"],
    ["Contacts", "Kontakt"],
    ["Contact", "Kontakt"],
    ["Contact us", "Na kontaktoni"],
    ["Pick the fastest channel and our team will reply quickly.", "Zgjidhni kanalin më të shpejtë dhe ekipi ynë do t'ju përgjigjet shpejt."],
    ["Need help?", "Keni nevojë për ndihmë?"],
    ["Home", "Ballina"],
    ["Search", "Kërko"],
    ["Favorites", "Të preferuarat"],
    ["Favorite cars", "Veturat e preferuara"],
    ["Saved inventory", "Lista e ruajtur"],
    ["Browse cars", "Shfleto veturat"],
    ["Cars from USA and South Korea", "Vetura nga Koreja e Jugut dhe SHBA"],
    ["Vehicles from USA and South Korea", "Vetura nga Koreja e Jugut dhe SHBA"],
    ["Vetura nga SHBA dhe Koreja e Jugut", "Vetura nga Koreja e Jugut dhe SHBA"],
    ["Filters", "Filtrat"],
    ["Clear all", "Pastro të gjitha"],
    ["Clear selected", "Pastro zgjedhjen"],
    ["Estimated price", "Çmimi i vlerësuar"],
    ["Make", "Marka"],
    ["Model", "Modeli"],
    ["Search make", "Kërko markë"],
    ["Search model", "Kërko model"],
    ["Select a make first", "Zgjidh fillimisht markën"],
    ["Pick at least one make to load matching models.", "Zgjidh së paku një markë për të shfaqur modelet."],
    ["Year", "Viti"],
    ["Odometer", "Kilometrazhi"],
    ["Drive type", "Lloji i tërheqjes"],
    ["Transmission", "Transmisioni"],
    ["Body style", "Karroceria"],
    ["Fuel type", "Karburanti"],
    ["Auction", "Ankandi"],
    ["Auction date", "Data e ankandit"],
    ["Condition", "Gjendja"],
    ["Exterior color", "Ngjyra e jashtme"],
    ["Cylinders", "Cilindrat"],
    ["Sale status", "Statusi i shitjes"],
    ["Damage", "Dëmtimi"],
    ["All", "Të gjitha"],
    ["Next 24 hours", "24 orët e ardhshme"],
    ["Buy now", "Bli tani"],
    ["See more", "Shfaq më shumë"],
    ["Show more", "Shfaq më shumë"],
    ["Show less", "Shfaq më pak"],
    ["Current bid", "Oferta aktuale"],
    ["Final bid", "Oferta finale"],
    ["Final price", "Çmimi final"],
    ["Auction price", "Çmimi i ankandit"],
    ["Price", "Çmimi"],
    ["Retail value", "Vlera e tregut"],
    ["Location", "Lokacioni"],
    ["Seller", "Shitësi"],
    ["Key included", "Çelësi i përfshirë"],
    ["Engine", "Motori"],
    ["Gearbox", "Transmisioni"],
    ["Fuel", "Karburanti"],
    ["Document", "Dokumenti"],
    ["Details", "Detajet"],
    ["Mileage", "Kilometrazhi"],
    ["Power", "Fuqia"],
    ["Engine volume", "Vëllimi i motorit"],
    ["Color", "Ngjyra"],
    ["Keys", "Çelësat"],
    ["Drive", "Tërheqja"],
    ["Sale", "Shitje"],
    ["Sold", "Shitur"],
    ["Not sold", "Nuk u shit"],
    ["On approval", "Në miratim"],
    ["Coming soon", "Së shpejti"],
    ["TBA", "Në pritje"],
    ["Run and drives", "Ndez dhe ecën"],
    ["Engine starts", "Motori ndizet"],
    ["Engine Starts", "Motori ndizet"],
    ["Automatic", "Automatik"],
    ["Manual", "Manual"],
    ["Gasoline", "Benzinë"],
    ["Diesel", "Naftë"],
    ["Hybrid", "Hibrid"],
    ["Electric", "Elektrik"],
    ["Front end", "Pjesa e përparme"],
    ["Rear end", "Pjesa e pasme"],
    ["Side", "Anësore"],
    ["Mechanical", "Mekanike"],
    ["Normal wear", "Konsum normal"],
    ["Minor dent scratches", "Gërvishtje të vogla"],
    ["Hail", "Breshër"],
    ["Water flood", "Dëmtim nga uji"],
    ["Burn", "Djegie"],
    ["Theft", "Vjedhje"],
    ["Repossession", "Rimarrje"],
    ["Open favorite vehicles", "Hap veturat e preferuara"],
    ["Open menu", "Hap menynë"],
    ["Close menu", "Mbyll menynë"],
    ["Enter Brand / Model / VIN / Lot", "Shkruaj markën / modelin / VIN / lotin"],
    ["Request consultation", "Kërko konsultim"],
    ["Send request", "Dërgo kërkesën"],
    ["Request a car search", "Kërko veturë"],
    ["Your name", "Emri juaj"],
    ["Phone", "Telefoni"],
    ["Phone number", "Numri i telefonit"],
    ["Name", "Emri"],
    ["Notes", "Shënime"],
    ["Additional details", "Detaje shtesë"],
    ["Destination", "Destinacioni"],
    ["Country / city", "Shteti / qyteti"],
    ["Explore", "Eksploro"],
    ["Markets", "Tregjet"],
    ["Address", "Adresa"],
    ["Working hours", "Orari i punës"],
    ["Working Hours", "Orari i punës"],
    ["POPULAR MAKES", "MARKAT E NJOHURA"],
    ["ADDRESS", "ADRESA"],
    ["WORKING HOURS", "ORARI I PUNËS"],
    ["Privacy policy", "Politika e privatësisë"],
    ["Terms of Use", "Kushtet e përdorimit"],
    ["Monday - Friday, 10:00 - 18:00", business.hours],
    ["Mon - Fri, 10:00 - 18:00", business.hours],
    ["Prishtinë, Kosovë", business.addressFull],
    ["13vetura buyer support", "Mbështetja e blerësve 13vetura"],
    ["Write to us", "Na shkruani"],
    ["Fastest way to contact 13vetura", "Mënyra më e shpejtë për të kontaktuar 13vetura"],
    ["Write 13vetura on Telegram", "Shkruani 13vetura në Telegram"],
    ["13vetura support inbox", "Emaili i mbështetjes 13vetura"],
    ["13vetura office", "Zyra e 13vetura"],
    ["13vetura support hours", "Orari i mbështetjes 13vetura"],
    ["Estimate import costs", "Llogarit kostot e importit"],
    ["USA", "SHBA"],
    ["South Korea", "Koreja e Jugut"],
    ["Canada", "Kanada"],
    ["Ready-to-buy offers", "Oferta gati për blerje"],
    ["FAQ", "Pyetje të shpeshta"],
    ["Frequently Asked Questions", "Pyetje të shpeshta"],
    ["Back to catalog", "Kthehu te katalogu"],
    ["No vehicles found", "Nuk u gjet asnjë veturë"],
    ["No favorite vehicles yet", "Ende nuk ka vetura të preferuara"],
    ["Page not found", "Faqja nuk u gjet"],
    ["Homepage", "Ballina"],
    ["Catalog", "Katalogu"],
    ["Previous", "Prapa"],
    ["Next", "Para"],
    ["Loading...", "Duke u ngarkuar..."],
    ["Copy", "Kopjo"],
    ["Copied", "U kopjua"],
    ["Yes", "Po"],
    ["No", "Jo"],
    ["Unknown", "E panjohur"],
    ["Not provided", "Nuk është dhënë"],
    ["EN", "SQ"]
  ]);

  const phraseText = [
    ["ImportAuto", business.name],
    ["+1 212 555 0174", business.phoneDisplay],
    ["+1 212 555 0199", business.phoneDisplay],
    ["+383 48 181 116", business.phoneDisplay],
    ["+12125550174", business.phonePrimary],
    ["+12125550199", business.phonePrimary],
    ["+38348181116", business.phonePrimary],
    ["tel:+12125550174", `tel:${business.phonePrimary}`],
    ["tel:+12125550199", `tel:${business.phonePrimary}`],
    ["tel:+38348181116", `tel:${business.phonePrimary}`],
    ["wa.me/12125550174", `wa.me/${business.phonePrimary.replace("+", "")}`],
    ["wa.me/12125550199", `wa.me/${business.phonePrimary.replace("+", "")}`],
    ["info@importauto.com", business.emailPrimary],
    ["sales@importauto.com", business.emailSales],
    ["shipping.test@importauto.com", business.emailPrimary],
    ["importauto.com", "13vetura.com"],
    ["Cars from USA and South Korea", "Vetura nga Koreja e Jugut dhe SHBA"],
    ["cars from USA and South Korea", "vetura nga Koreja e Jugut dhe SHBA"],
    ["Vehicles from USA and South Korea", "Vetura nga Koreja e Jugut dhe SHBA"],
    ["vehicles from USA and South Korea", "vetura nga Koreja e Jugut dhe SHBA"],
	    ["from USA and South Korea", "nga Koreja e Jugut dhe SHBA"],
	    ["USA and South Korea", "Koreja e Jugut dhe SHBA"],
	    ["SHBA dhe Koreja e Jugut", "Koreja e Jugut dhe SHBA"],
	    ["Nga ankandi deri te garazhi juaj", "Nga Koreja te garazhi juaj"],
	    ["Gjeni veturën e ardhshme në ankand", "Gjeni veturën e ardhshme në Kore"],
	    ["USA → Klaipeda", "SHBA → Kosovë"],
	    ["Lithuania", "Kosovë"],
	    ["Klaipeda", "Kosovë"],
    ["Klaipeda, LT", business.addressFull],
    ["Klaipeda port", business.addressFull],
    ["Prishtinë, Kosovë", business.addressFull],
    ["Contact us", "Na kontaktoni"],
    ["Pick the fastest channel and our team will reply quickly.", "Zgjidhni kanalin më të shpejtë dhe ekipi ynë do t'ju përgjigjet shpejt."],
    ["Need help?", "Keni nevojë për ndihmë?"],
    ["Address", "Adresa"],
    ["Working hours", "Orari i punës"],
    ["Working Hours", "Orari i punës"],
    ["13vetura buyer support", "Mbështetja e blerësve 13vetura"],
    ["Write to us", "Na shkruani"],
    ["Fastest way to contact 13vetura", "Mënyra më e shpejtë për të kontaktuar 13vetura"],
    ["Write 13vetura on Telegram", "Shkruani 13vetura në Telegram"],
    ["13vetura support inbox", "Emaili i mbështetjes 13vetura"],
    ["13vetura office", "Zyra e 13vetura"],
    ["13vetura support hours", "Orari i mbështetjes 13vetura"],
    ["Estimate import costs", "Llogarit kostot e importit"],
    ["Monday - Friday, 10:00 - 18:00", business.hours],
    ["All rights reserved.", "Të gjitha të drejtat e rezervuara."],
    ["Search vehicles", "Kërko vetura"],
    ["Search vehicle", "Kërko veturë"],
    ["Search by VIN or lot number", "Kërko me VIN ose numër loti"],
    ["Enter Brand / Model / VIN / Lot", "Shkruaj markën / modelin / VIN / lotin"],
    ["Current bid", "Oferta aktuale"],
    ["Buy now", "Bli tani"],
    ["Run and drives", "Ndez dhe ecën"],
    ["Engine starts", "Motori ndizet"],
    ["Engine Starts", "Motori ndizet"],
    ["Front end", "Pjesa e përparme"],
    ["Rear end", "Pjesa e pasme"],
    ["Minor dent scratches", "Gërvishtje të vogla"],
    ["Normal wear", "Konsum normal"],
    ["Not on sale", "Jo në shitje"],
	    ["Not sold", "Nuk u shit"],
	    ["On approval", "Në miratim"],
	    ["From auction to your garage", "Nga Koreja te garazhi juaj"],
	    ["From the auction to your garage", "Nga Koreja te garazhi juaj"],
	    ["From auction selection to delivery", "Nga Koreja te garazhi juaj"],
	    ["From the auction to the garage", "Nga Koreja te garazhi juaj"],
	    ["From auction to garage", "Nga Koreja te garazhi juaj"],
	    ["Klaipeda", "Kosovë"],
	    ["Lithuania", "Kosovë"]
	  ].sort((a, b) => b[0].length - a[0].length);

  const attributes = ["alt", "aria-label", "title", "placeholder", "content", "href"];
	  const translatableAttributeSelector = attributes.map((attribute) => `[${attribute}]`).join(",");
  const brandPriority = new Map(
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

	  const formatEuro = (amount) => {
    const rounded = Math.round(amount);
    const value = new Intl.NumberFormat("sq-AL", {
      maximumFractionDigits: 0
    }).format(Math.abs(rounded));
    return rounded < 0 ? `-€${value}` : `€${value}`;
	  };

	  const isBlackWhiteThemeEnabled = () => {
	    try {
	      return window.localStorage.getItem(themeStorageKey) === "1";
	    } catch {
	      return false;
	    }
	  };

	  const setBlackWhiteThemeEnabled = (enabled) => {
	    try {
	      window.localStorage.setItem(themeStorageKey, enabled ? "1" : "0");
	    } catch {}
	    document.documentElement.classList.toggle("thirteen-vetura-theme", enabled);
	    const toggle = document.getElementById("thirteen-vetura-theme-toggle");
	    if (toggle) {
	      toggle.setAttribute("aria-pressed", String(enabled));
	      toggle.setAttribute("title", enabled ? "Kthe temën normale" : "Aktivizo temën bardh e zi");
	    }
	  };

  const convertMoney = (text) =>
    text.replace(/\$[\s\u00a0]*-?[\d,.]+/g, (match) => {
      const numeric = Number(match.replace(/[^0-9.-]/g, ""));
      return Number.isFinite(numeric) ? formatEuro(numeric * usdToEur) : match.replace("$", "€");
    });

  const translate = (value) => {
    if (!value || typeof value !== "string") return value;

    let next = convertMoney(value).replace(/\$/g, "€");
    const trimmed = next.trim();
    if (exactText.has(trimmed)) {
      next = next.replace(trimmed, exactText.get(trimmed));
    }

    for (const [from, to] of phraseText) {
      next = next.split(from).join(to);
    }

    return next;
  };

  const shouldSkip = (node) => {
    const parent = node.parentElement;
    if (!parent) return true;
    return ["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"].includes(parent.tagName);
  };

  const translateTextNodes = (root = document.body) => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => (shouldSkip(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    for (const node of nodes) {
      const next = translate(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    }
  };

	  const applyPageSpecificText = () => {
	    if (!document.body || location.pathname !== "/about") return;
	
	    const replacements = new Map([
	      ["Ankandi", "Koreja"],
	      ["Nga ankandi deri te garazhi juaj", "Nga Koreja te garazhi juaj"],
	      ["Gjeni veturën e ardhshme në ankand", "Gjeni veturën e ardhshme në Kore"]
	    ]);
	    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
	      acceptNode: (node) => (shouldSkip(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
	    });
	    const nodes = [];
	    while (walker.nextNode()) nodes.push(walker.currentNode);
	
	    for (const node of nodes) {
	      const value = node.nodeValue || "";
	      const trimmed = value.trim();
	      if (!replacements.has(trimmed)) continue;
	      node.nodeValue = value.replace(trimmed, replacements.get(trimmed));
	    }
	  };

  const translateAttributes = (root = document) => {
    for (const element of root.querySelectorAll(translatableAttributeSelector)) {
      for (const attribute of attributes) {
        if (!element.hasAttribute(attribute)) continue;
        const current = element.getAttribute(attribute);
        const next = translate(current);
        if (next !== current) element.setAttribute(attribute, next);
      }
    }
  };

  const applyBusinessLinks = () => {
    for (const link of document.querySelectorAll('a[href^="tel:"], a[href^="https://wa.me/"], a[href^="mailto:"]')) {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("tel:")) link.setAttribute("href", `tel:${business.phonePrimary}`);
      if (href.includes("wa.me/")) link.setAttribute("href", business.whatsapp);
      if (href.startsWith("mailto:")) link.setAttribute("href", `mailto:${business.emailPrimary}`);
    }

    for (const link of document.querySelectorAll('a[href*="maps.google"]')) {
      link.setAttribute("href", business.mapLink);
    }
  };

	  const applyLogo = () => {
	    for (const img of document.images) {
	      const src = img.getAttribute("src") || "";
	      const alt = img.getAttribute("alt") || "";
	      if (src.includes("/brand/site-logo.svg") || src.includes("site-logo") || alt.toLowerCase().includes("importauto")) {
	        img.setAttribute("src", business.logoUrl);
	        img.setAttribute("alt", `${business.name} logo`);
	        img.setAttribute("loading", "eager");
	        img.style.objectFit = "contain";
	        const link = img.closest("a");
	        if (link) {
	          link.setAttribute("href", "/");
	          link.removeAttribute("target");
	        }
	      }
	    }
	  };

	  const installHomeNavigation = () => {
	    document.addEventListener(
	      "click",
	      (event) => {
	        const link = event.target?.closest?.("a[href]");
	        if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
	          return;
	        }
	
	        const href = link.getAttribute("href") || "";
	        const url = new URL(href, window.location.origin);
	        const text = (link.textContent || "").trim().toLowerCase();
	        const hasLogo = Boolean(link.querySelector('img[src*="13vetura.com/assets/logo"], img[alt*="13vetura"]'));
	        if (url.origin !== window.location.origin || (url.pathname !== "/" && text !== "ballina" && !hasLogo)) return;
	
	        event.preventDefault();
	        event.stopPropagation();
	        window.location.assign("/");
	      },
	      true
	    );
	  };

  const applyMeta = () => {
    document.documentElement.lang = "sq";
    document.title = translate(document.title || "13vetura");
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:title"]',
      'meta[property="og:description"]',
      'meta[name="twitter:title"]',
      'meta[name="twitter:description"]'
    ]) {
      const meta = document.querySelector(selector);
      if (meta) meta.setAttribute("content", translate(meta.getAttribute("content") || ""));
    }
  };

  const installStyle = () => {
    if (document.getElementById("thirteen-vetura-brand-style")) return;
    const style = document.createElement("style");
    style.id = "thirteen-vetura-brand-style";
    style.textContent = `
	      html.thirteen-vetura-theme {
	        color-scheme: dark;
	        --vetura-bg: #080808;
        --vetura-surface: #101010;
        --vetura-card: #161616;
        --vetura-elevated: #1f1f1f;
        --vetura-border: #2b2b2b;
        --vetura-text: #f5f5f5;
        --vetura-muted: #a3a3a3;
        --vetura-soft: #d4d4d4;
        --vetura-primary: #ffffff;
      }
      html.thirteen-vetura-theme,
      html.thirteen-vetura-theme body,
      html.thirteen-vetura-theme #__nuxt {
        background: var(--vetura-bg) !important;
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme body {
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      html.thirteen-vetura-theme header,
      html.thirteen-vetura-theme nav,
      html.thirteen-vetura-theme footer,
      html.thirteen-vetura-theme [class*="bg-white"],
      html.thirteen-vetura-theme [class*="bg-slate-50"],
      html.thirteen-vetura-theme [class*="bg-slate-100"],
      html.thirteen-vetura-theme [class*="bg-[#F"],
      html.thirteen-vetura-theme [class*="bg-[#f"],
      html.thirteen-vetura-theme [class*="bg-[linear-gradient"] {
        background: var(--vetura-surface) !important;
        background-image: none !important;
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme [class*="bg-slate-200"],
      html.thirteen-vetura-theme [class*="bg-slate-300"],
      html.thirteen-vetura-theme [class*="bg-[#EEF"],
      html.thirteen-vetura-theme [class*="bg-[#F5"] {
        background: var(--vetura-elevated) !important;
      }
      html.thirteen-vetura-theme article,
      html.thirteen-vetura-theme section,
      html.thirteen-vetura-theme aside,
      html.thirteen-vetura-theme [class*="rounded-2xl"],
      html.thirteen-vetura-theme [class*="rounded-[10px]"],
      html.thirteen-vetura-theme [class*="rounded-xl"] {
        border-color: var(--vetura-border) !important;
      }
      html.thirteen-vetura-theme [class*="border-slate"],
      html.thirteen-vetura-theme [class*="border-white"],
      html.thirteen-vetura-theme [class*="border-[#"],
      html.thirteen-vetura-theme [class*="ring-slate"],
      html.thirteen-vetura-theme [class*="ring-white"] {
        border-color: var(--vetura-border) !important;
        --tw-ring-color: var(--vetura-border) !important;
        box-shadow: 0 0 0 1px var(--vetura-border) !important;
      }
      html.thirteen-vetura-theme input,
      html.thirteen-vetura-theme select,
      html.thirteen-vetura-theme textarea {
        background: var(--vetura-card) !important;
        border-color: var(--vetura-border) !important;
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme input::placeholder,
      html.thirteen-vetura-theme textarea::placeholder {
        color: var(--vetura-muted) !important;
      }
      html.thirteen-vetura-theme [class*="text-slate-950"],
      html.thirteen-vetura-theme [class*="text-slate-900"],
      html.thirteen-vetura-theme [class*="text-zinc-950"],
      html.thirteen-vetura-theme [class*="text-zinc-900"],
      html.thirteen-vetura-theme [class*="text-neutral-950"],
      html.thirteen-vetura-theme [class*="text-neutral-900"],
      html.thirteen-vetura-theme [class*="text-black"],
      html.thirteen-vetura-theme [class*="text-[#0F172A]"],
      html.thirteen-vetura-theme [class*="text-[#0f172a]"],
      html.thirteen-vetura-theme [class*="text-[#071624]"],
      html.thirteen-vetura-theme [class*="text-[#071624]"],
      html.thirteen-vetura-theme [class*="text-[#0A2540]"],
      html.thirteen-vetura-theme [class*="text-[#0a2540]"],
      html.thirteen-vetura-theme h1,
      html.thirteen-vetura-theme h2,
      html.thirteen-vetura-theme h3 {
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme [class*="text-slate-800"],
      html.thirteen-vetura-theme [class*="text-slate-700"],
      html.thirteen-vetura-theme [class*="text-slate-600"],
      html.thirteen-vetura-theme [class*="text-gray-800"],
      html.thirteen-vetura-theme [class*="text-gray-700"],
      html.thirteen-vetura-theme [class*="text-gray-600"],
      html.thirteen-vetura-theme [class*="text-zinc-800"],
      html.thirteen-vetura-theme [class*="text-zinc-700"],
      html.thirteen-vetura-theme [class*="text-zinc-600"],
      html.thirteen-vetura-theme [class*="text-neutral-800"],
      html.thirteen-vetura-theme [class*="text-neutral-700"],
      html.thirteen-vetura-theme [class*="text-neutral-600"],
      html.thirteen-vetura-theme [class*="text-[#253346]"],
      html.thirteen-vetura-theme [class*="text-[#334155]"],
      html.thirteen-vetura-theme [class*="text-[#475569]"],
      html.thirteen-vetura-theme [class*="text-[#355375]"],
      html.thirteen-vetura-theme [class*="text-[#60728A]"],
      html.thirteen-vetura-theme [class*="text-[#60728a]"],
      html.thirteen-vetura-theme [class*="text-[#6B7E95]"],
      html.thirteen-vetura-theme [class*="text-[#6b7e95]"],
      html.thirteen-vetura-theme [class*="text-[#6B7F97]"],
      html.thirteen-vetura-theme [class*="text-[#6b7f97]"] {
        color: var(--vetura-soft) !important;
      }
      html.thirteen-vetura-theme [class*="text-slate-500"],
      html.thirteen-vetura-theme [class*="text-slate-400"],
      html.thirteen-vetura-theme [class*="text-gray-500"],
      html.thirteen-vetura-theme [class*="text-gray-400"],
      html.thirteen-vetura-theme [class*="text-zinc-500"],
      html.thirteen-vetura-theme [class*="text-zinc-400"],
      html.thirteen-vetura-theme [class*="text-neutral-500"],
      html.thirteen-vetura-theme [class*="text-neutral-400"],
      html.thirteen-vetura-theme [class*="text-[#64748B]"],
      html.thirteen-vetura-theme [class*="text-[#64748b]"],
      html.thirteen-vetura-theme [class*="text-[#667085]"],
      html.thirteen-vetura-theme [class*="text-[#77869a]"],
      html.thirteen-vetura-theme [class*="text-[#8DA0B8]"] {
        color: var(--vetura-muted) !important;
      }
      html.thirteen-vetura-theme input,
      html.thirteen-vetura-theme input[class],
      html.thirteen-vetura-theme [class*="bg-[#fff"],
      html.thirteen-vetura-theme [class*="bg-[#FFF"],
      html.thirteen-vetura-theme [class*="bg-[#ffffff"],
      html.thirteen-vetura-theme [class*="bg-[#FFFFFF]"] {
        background: var(--vetura-card) !important;
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme [class*="text-blue"],
      html.thirteen-vetura-theme [class*="text-[#007BFF]"],
      html.thirteen-vetura-theme [class*="text-[#007bff]"],
      html.thirteen-vetura-theme [class*="text-indigo"],
      html.thirteen-vetura-theme [class*="hover:text-blue"]:hover {
        color: var(--vetura-primary) !important;
      }
      html.thirteen-vetura-theme [class*="bg-blue"],
      html.thirteen-vetura-theme [class*="from-blue"],
      html.thirteen-vetura-theme [class*="to-blue"],
      html.thirteen-vetura-theme [class*="bg-[#007BFF]"],
      html.thirteen-vetura-theme [class*="bg-[linear-gradient(135deg,#147fff"] {
        background: var(--vetura-primary) !important;
        background-image: none !important;
        border-color: var(--vetura-primary) !important;
        color: #080808 !important;
      }
      html.thirteen-vetura-theme [class*="border-blue"] {
        border-color: var(--vetura-primary) !important;
      }
      html.thirteen-vetura-theme .dropdown-pop-panel,
      html.thirteen-vetura-theme .quick-filters-panel,
      html.thirteen-vetura-theme .quick-filters-content,
      html.thirteen-vetura-theme .quick-filters-heading,
      html.thirteen-vetura-theme .header-language-menu,
      html.thirteen-vetura-theme .iti__dropdown-content,
      html.thirteen-vetura-theme [role="listbox"],
      html.thirteen-vetura-theme [role="menu"],
      html.thirteen-vetura-theme [class*="dropdown"],
      html.thirteen-vetura-theme [class*="menu"][class*="bg-white"] {
        background: var(--vetura-card) !important;
        background-image: none !important;
        border-color: var(--vetura-border) !important;
        color: var(--vetura-text) !important;
        box-shadow: 0 18px 44px rgba(0, 0, 0, 0.42) !important;
      }
      html.thirteen-vetura-theme .quick-filters-tab,
      html.thirteen-vetura-theme .quick-filters-heading h3,
      html.thirteen-vetura-theme .quick-filters-section-label,
      html.thirteen-vetura-theme .quick-filters-option,
      html.thirteen-vetura-theme .quick-filters-option-count,
      html.thirteen-vetura-theme .header-language-item,
      html.thirteen-vetura-theme .iti__country,
      html.thirteen-vetura-theme .iti__country-name,
      html.thirteen-vetura-theme .iti__dial-code,
      html.thirteen-vetura-theme .iti__search-input,
      html.thirteen-vetura-theme [role="option"],
      html.thirteen-vetura-theme [role="menuitem"] {
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme .quick-filters-tab:hover,
      html.thirteen-vetura-theme .quick-filters-tab.is-active,
      html.thirteen-vetura-theme .quick-filters-option:hover,
      html.thirteen-vetura-theme .header-language-item:hover,
      html.thirteen-vetura-theme .header-language-item.is-active,
      html.thirteen-vetura-theme .iti__country.iti__highlight,
      html.thirteen-vetura-theme [role="option"]:hover,
      html.thirteen-vetura-theme [role="menuitem"]:hover {
        background: var(--vetura-elevated) !important;
        color: var(--vetura-primary) !important;
      }
      html.thirteen-vetura-theme input[type="checkbox"],
      html.thirteen-vetura-theme input[type="radio"] {
        accent-color: var(--vetura-primary);
      }
      html.thirteen-vetura-theme .catalog-filter-panel,
      html.thirteen-vetura-theme .catalog-filter-item,
      html.thirteen-vetura-theme .catalog-filter-heading,
      html.thirteen-vetura-theme .catalog-filter-heading-title,
      html.thirteen-vetura-theme .catalog-filter-title,
      html.thirteen-vetura-theme .catalog-filter-title *,
      html.thirteen-vetura-theme .catalog-filter-body,
      html.thirteen-vetura-theme .catalog-filter-body-inner,
      html.thirteen-vetura-theme .catalog-filter-panel [class*="text-[#"],
      html.thirteen-vetura-theme .catalog-filter-panel [class*="text-slate"],
      html.thirteen-vetura-theme .catalog-filter-panel [class*="text-gray"] {
        color: var(--vetura-soft) !important;
      }
      html.thirteen-vetura-theme .catalog-checkbox-option,
      html.thirteen-vetura-theme .catalog-checkbox-option * {
        color: var(--vetura-soft) !important;
      }
      html.thirteen-vetura-theme .catalog-checkbox-option:hover,
      html.thirteen-vetura-theme .catalog-checkbox-option:hover * {
        color: var(--vetura-primary) !important;
      }
      html.thirteen-vetura-theme .catalog-filter-panel input:not([type="checkbox"]):not([type="radio"]) {
        background: #f5f5f5 !important;
        border-color: #d4d4d4 !important;
        color: #080808 !important;
      }
      html.thirteen-vetura-theme [class*="shadow-"],
      html.thirteen-vetura-theme [class*="shadow["] {
        box-shadow: 0 18px 44px rgba(0, 0, 0, 0.28) !important;
      }
      html.thirteen-vetura-theme a {
        color: inherit;
      }
      html.thirteen-vetura-theme a:hover {
        color: var(--vetura-primary) !important;
      }
      html.thirteen-vetura-theme .catalog-source-text-badge,
      html.thirteen-vetura-theme [class*="catalog-source-text-badge"] {
        background: var(--vetura-elevated) !important;
        border-color: var(--vetura-border) !important;
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme .catalog-card-image-spinner {
        border-color: var(--vetura-border) !important;
        border-top-color: var(--vetura-primary) !important;
      }
      html.thirteen-vetura-theme .price-summary-panel,
      html.thirteen-vetura-theme .encar-price-summary,
      html.thirteen-vetura-theme .vehicle-action-sidebar section {
        background: var(--vetura-card) !important;
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme .vehicle-action-sidebar button,
      html.thirteen-vetura-theme .vehicle-action-sidebar a[class*="bg-blue"] {
        background: var(--vetura-primary) !important;
        background-image: none !important;
        color: #080808 !important;
      }
      img[src*="13vetura.com/assets/logo"] {
        object-fit: contain !important;
        max-height: 54px;
        width: auto;
      }
	      .thirteen-vetura-business-note {
	        font-size: 0.875rem;
	        color: inherit;
	      }
	      .thirteen-vetura-theme-toggle {
	        align-items: center;
	        border: 1px solid rgba(15, 23, 42, 0.12);
	        border-radius: 999px;
	        background: #ffffff;
	        color: #0f172a;
	        cursor: pointer;
	        display: inline-flex;
	        flex: 0 0 auto;
	        font-size: 12px;
	        font-weight: 800;
	        height: 44px;
	        justify-content: center;
	        letter-spacing: 0;
	        min-width: 44px;
	        padding: 0 12px;
	        transition: background-color .16s ease, color .16s ease, border-color .16s ease;
	      }
	      .thirteen-vetura-theme-toggle[aria-pressed="true"] {
	        background: #080808;
	        border-color: #080808;
	        color: #ffffff;
	      }
	      html.thirteen-vetura-theme .thirteen-vetura-theme-toggle {
	        background: #ffffff !important;
	        border-color: #ffffff !important;
	        color: #080808 !important;
	      }
	      .header-language-menu,
	      .mobile-language-switcher,
	      [aria-label="Select language"],
	      [aria-label="Zgjidh gjuhën"] {
	        display: none !important;
	      }
	      .encar-price-summary__main,
	      .price-summary-panel [class*="text-blue"],
	      .vehicle-action-sidebar [class*="text-blue"],
	      [class*="price-summary"] [class*="text-blue"] {
	        color: #ffffff !important;
	      }
	      .home-hero-section img[src*="/images/home/her-top"],
	      .home-hero-section .home-hero-bg-overlay,
	      .home-hero-section .home-hero-bg-glow {
	        display: none !important;
	      }
	      .home-hero-section {
	        background: #f3f6fa !important;
	      }
	      .home-hero-title {
	        background: none !important;
	        color: #0f172a !important;
	        -webkit-text-fill-color: currentColor !important;
	      }
	      html.thirteen-vetura-theme .home-hero-section {
	        background: #080808 !important;
	      }
	      html.thirteen-vetura-theme .home-hero-title {
	        color: #ffffff !important;
	      }
	      .dropdown-pop-panel,
	      .quick-filters-panel,
	      .catalog-filter-body,
	      .catalog-filter-body-inner,
	      .catalog-mobile-filters,
	      .catalog-mobile-filters > * {
	        transition-duration: 90ms !important;
	        transition-timing-function: cubic-bezier(.2,.9,.22,1) !important;
	        will-change: transform, opacity;
	      }
	      .dropdown-pop-enter-from .dropdown-pop-panel,
	      .dropdown-pop-enter-from.dropdown-pop-panel,
	      .dropdown-pop-enter-from > .dropdown-pop-panel {
	        transform: translate3d(0,-4px,0) scale(.992) !important;
	        filter: none !important;
	      }
	      html.thirteen-vetura-detail-loading main {
	        opacity: 0 !important;
	      }
	      html.thirteen-vetura-detail-ready main {
	        opacity: 1 !important;
	        transition: opacity 90ms ease-out;
	      }
	    `;
    document.head.appendChild(style);
  };

	  const installThemeToggle = () => {
	    if (document.getElementById("thirteen-vetura-theme-toggle")) {
	      setBlackWhiteThemeEnabled(isBlackWhiteThemeEnabled());
	      return;
	    }
	
	    const headerRow =
	      document.querySelector("header [class*='items-center'][class*='gap']") ||
	      document.querySelector("header nav") ||
	      document.querySelector("header");
	    if (!headerRow) return;
	
	    const button = document.createElement("button");
	    button.id = "thirteen-vetura-theme-toggle";
	    button.type = "button";
	    button.className = "thirteen-vetura-theme-toggle";
	    button.textContent = "B/W";
	    button.setAttribute("aria-label", "Ndrysho temën bardh e zi");
	    button.addEventListener("click", () => {
	      setBlackWhiteThemeEnabled(!isBlackWhiteThemeEnabled());
	    });
	
	    const phoneLink = headerRow.querySelector('a[href^="tel:"]');
	    const phoneContainer = phoneLink ? [...headerRow.children].find((child) => child.contains(phoneLink)) : null;
	    headerRow.insertBefore(button, phoneContainer || null);
	    setBlackWhiteThemeEnabled(isBlackWhiteThemeEnabled());
	  };
	
	  const removeLanguageControls = () => {
	    const selectors = [
	      ".header-language-menu",
	      ".mobile-language-switcher",
	      '[aria-label="Select language"]',
	      '[aria-label="Zgjidh gjuhën"]',
	      '[aria-haspopup="menu"]'
	    ];
	
	    for (const element of document.querySelectorAll(selectors.join(","))) {
	      const text = (element.textContent || "").trim();
	      const label = element.getAttribute("aria-label") || "";
	      if (!/language|gjuh/i.test(label) && !/(^|\s)(EN|SQ)(\s|$)/.test(text) && !/[🇬🇧🇦🇱]/u.test(text)) continue;
	      const container = element.closest(".mobile-language-switcher, .relative") || element;
	      container.remove();
	    }
	  };
	
	  const removeBlogLinks = () => {
	    for (const link of document.querySelectorAll('a[href*="/blog"], a[href="/blog"]')) {
	      link.remove();
	    }
	
	    for (const element of document.querySelectorAll("a, button")) {
	      if ((element.textContent || "").trim().toLowerCase() === "blog") {
	        element.remove();
	      }
	    }
	  };
	
	  const applyDefaultAuctionSources = () => {
	    const key = `${location.pathname}?${location.search}`;
	    if (sourceDefaultsApplied.has(key)) return;
	
	    const params = new URLSearchParams(location.search);
	    const hasExplicitSource = params.has("source") || params.has("sources") || params.has("domain_id");
	    const requestedSources = [
	      params.get("source"),
	      params.get("sources"),
	      params.get("domain_id")
	    ].filter(Boolean).join(",").toLowerCase();
	    if (hasExplicitSource && !/(^|,|\s)encar($|,|\s)/.test(requestedSources)) return;
	
	    const buttons = [...document.querySelectorAll("button")].filter((button) =>
	      /^(copart|iaai|encar)$/i.test((button.textContent || "").trim())
	    );
	    if (!buttons.length) return;
	
	    const getSourceName = (button) => (button.textContent || "").trim().toLowerCase();
	    const isButtonActive = (button) =>
	      button.classList.contains("is-active") || button.getAttribute("aria-pressed") === "true";
	    const hasDesiredState = buttons.every((button) => {
	      const name = getSourceName(button);
	      const active = isButtonActive(button);
	      if (name === "encar") return active;
	      if (name === "copart" || name === "iaai") return !active;
	      return true;
	    });
	
	    if (hasDesiredState) {
	      sourceDefaultsApplied.add(key);
	      sourceDefaultAttempts.delete(key);
	      return;
	    }
	
	    const attempts = (sourceDefaultAttempts.get(key) || 0) + 1;
	    sourceDefaultAttempts.set(key, attempts);
	    for (const button of buttons) {
	      const name = getSourceName(button);
	      const isActive = isButtonActive(button);
	      const shouldClick = ((name === "copart" || name === "iaai") && isActive) || (name === "encar" && !isActive);
	      if (!shouldClick) continue;
	      button.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
	    }
	
	    if (attempts < 10) {
	      window.setTimeout(applyDefaultAuctionSources, attempts < 4 ? 90 : 240);
	      return;
	    }
	
	    for (const button of buttons) {
	      const name = getSourceName(button);
	      if (name === "copart" || name === "iaai") {
	        button.classList.remove("is-active");
	        button.setAttribute("aria-pressed", "false");
	      }
	      if (name === "encar") {
	        button.classList.add("is-active");
	        button.setAttribute("aria-pressed", "true");
	      }
	    }
	    sourceDefaultsApplied.add(key);
	    sourceDefaultAttempts.delete(key);
	  };

  const normalizeCarLinks = (root = document) => {
    for (const link of root.querySelectorAll?.('a[href^="/cars/"], a[href^="' + location.origin + '/cars/"]') || []) {
      link.removeAttribute("target");
      link.setAttribute("rel", "noopener noreferrer");
    }
  };

	  const installCatalogCardNavigation = () => {
	    document.addEventListener(
	      "click",
	      (event) => {
	        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
	        if (event.target?.closest?.("a,button,input,select,textarea,label")) return;
	        const card = event.target?.closest?.("article");
	        const link = card?.querySelector?.('a[href^="/cars/"], a[href^="' + location.origin + '/cars/"]');
	        if (!link) return;
	        event.preventDefault();
	        event.stopPropagation();
	        window.location.assign(new URL(link.getAttribute("href"), window.location.origin).href);
	      },
	      true
	    );
	  };

  const normalizeSearchLinks = (root = document) => {
    for (const link of root.querySelectorAll?.('a[href^="/search"], a[href^="' + location.origin + '/search"]') || []) {
      const href = link.getAttribute("href") || "";
      const url = new URL(href, window.location.origin);
      if (url.pathname !== "/search" || url.searchParams.has("source") || url.searchParams.has("sources")) continue;
      url.searchParams.set("source", "encar");
      link.setAttribute("href", `${url.pathname}${url.search}${url.hash}`);
    }
  };

  const reorderKoreaBeforeUsa = () => {
    const containers = document.querySelectorAll("nav, header, footer, ul, ol, div");
    for (const container of containers) {
      if (container.children.length < 2 || container.children.length > 24) continue;
      const children = [...container.children];
      const korea = children.find((child) => /koreja/i.test(child.textContent || ""));
      const usa = children.find((child) => /\b(shba|usa)\b/i.test(child.textContent || "") && !/koreja/i.test(child.textContent || ""));
      if (!korea || !usa) continue;
      if (children.indexOf(korea) > children.indexOf(usa)) {
        container.insertBefore(korea, usa);
      }
    }
  };

  const getBrandPriority = (text) => {
    const normalized = String(text || "")
      .trim()
      .toLowerCase()
      .replace(/\s+/g, " ");
    return brandPriority.has(normalized) ? brandPriority.get(normalized) : Number.POSITIVE_INFINITY;
  };

  const reorderBrandOptions = () => {
    const containers = document.querySelectorAll(".catalog-checkbox-list, [role='listbox']");
    for (const container of containers) {
      const children = [...container.children];
      if (children.length < 2) continue;

      const options = children.map((child, index) => ({
        child,
        index,
        priority: getBrandPriority(child.textContent)
      }));
      if (options.filter((option) => Number.isFinite(option.priority)).length < 2) continue;

      options.sort((left, right) => {
        if (left.priority !== right.priority) return left.priority - right.priority;
        return left.index - right.index;
      });

      for (const option of options) {
        container.appendChild(option.child);
      }
    }
  };

  const installCarLinkNavigation = () => {
    if (carLinkNavigationInstalled) return;
    carLinkNavigationInstalled = true;
    document.addEventListener(
      "click",
      (event) => {
        const link = event.target?.closest?.('a[href^="/cars/"], a[href^="' + location.origin + '/cars/"]');
        if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return;
        }

        const href = link.getAttribute("href");
        if (!href) return;
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(new URL(href, window.location.origin).href);
      },
      true
    );
  };

  const parseVehicleRoute = () => {
    const parts = window.location.pathname.split("/").filter(Boolean);
    if (parts[0] !== "cars" || !parts[1]) return null;

    const routeId = parts[1];
    const [domain, ...lotParts] = routeId.split("-");
    const lot = lotParts.join("-");
    const slug = parts.slice(2).join("-");
    const vin =
      (slug.match(/[A-HJ-NPR-Z0-9]{17}/i) || [])[0]?.toUpperCase() ||
      (slug.match(/ENCAR\d{5,}/i) || [])[0]?.toUpperCase() ||
      "";
    const query = new URLSearchParams();
    if (lot) query.set("lot", lot);
    if (vin) query.set("vin", vin);
    if (domain && lot) query.set("domain", domain);

    return {
      routeId,
      domain,
      lot,
      vin,
      apiUrl: `/api/catalog/cars/${encodeURIComponent(routeId)}${query.toString() ? `?${query}` : ""}`,
      isEncar: domain === "12" || routeId.toLowerCase().includes("encar")
    };
  };

	  const uniqueValues = (values) => Array.from(new Set(values.filter((value) => typeof value === "string" && value.trim())));

	  const sourceFlag = (value) => {
	    const normalized = String(value || "").trim().toLowerCase();
	    if (normalized.includes("encar")) return { flag: "🇰🇷", label: "Encar Korea" };
	    if (normalized.includes("copart") || normalized.includes("iaai")) return { flag: "🇺🇸", label: "USA auction" };
	    return null;
	  };

	  const applySourceFlags = (root = document) => {
	    for (const element of root.querySelectorAll?.(".catalog-card-source, .catalog-source-text-badge, [class*='source'][class*='badge'], a, span") || []) {
	      if (element.matches?.("button, .source-switch, .catalog-source-switch") || element.closest?.("button, .source-switch, .catalog-source-switch")) continue;
	      const text = (element.textContent || "").trim();
	      if (!/^(ENCAR|Encar|Copart|COPART|IAAI)$/i.test(text)) continue;
	      const flag = sourceFlag(text);
	      if (!flag) continue;
	      element.textContent = flag.flag;
	      element.setAttribute("aria-label", flag.label);
	      element.setAttribute("title", flag.label);
	      element.classList.add("thirteen-vetura-source-flag");
	    }
	  };
	
	  const setText = (element, value) => {
	    const next = String(value || "").trim();
	    if (!element || !next || element.textContent === next) return;
	    element.textContent = next;
	  };
	
	  const replaceTextPattern = (root, pattern, value, limit = 20) => {
	    const next = String(value || "").trim();
	    if (!root || !next) return;
	
	    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
	      acceptNode: (node) => (shouldSkip(node) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT)
	    });
	    let count = 0;
	    while (walker.nextNode() && count < limit) {
	      const node = walker.currentNode;
	      const current = node.nodeValue || "";
	      if (!pattern.test(current)) continue;
	      pattern.lastIndex = 0;
	      node.nodeValue = current.replace(pattern, next);
	      count += 1;
	    }
	  };

	  const applyVehicleDetailData = (car) => {
	    if (!car || typeof car !== "object") return;
	    document.documentElement.classList.add("thirteen-vetura-detail-ready");
	    document.documentElement.classList.remove("thirteen-vetura-detail-loading");
	    document.getElementById("thirteen-vetura-detail-hide-style")?.remove();
	    const detailRoot = document.querySelector("main") || document.body;
	    const titleText = String(car.title || [car.year, car.manufacturer, car.model].filter(Boolean).join(" ")).trim();
	    if (titleText) {
	      document.title = `${titleText} | ${business.name}`;
	      const heading = detailRoot.querySelector("h1");
	      setText(heading, titleText);
	      for (const element of detailRoot.querySelectorAll('[class*="vehicle"][class*="title"], [class*="Vehicle"][class*="Title"]')) {
	        setText(element, titleText);
	      }
	    }
	
	    const images = uniqueValues([car.image, ...(Array.isArray(car.images) ? car.images : [])]).filter(
	      (image) => !/\/\/cars2?\.import-motor\.com\//i.test(image)
	    );
	    const galleryTrigger = document.querySelector(".vehicle-gallery-open-trigger");
    const gallerySection = galleryTrigger?.closest("section");
    if (gallerySection && images.length) {
      const galleryImages = [...gallerySection.querySelectorAll("img")];
      const galleryLinks = [...gallerySection.querySelectorAll("a[href]")].filter((link) =>
        /\.(?:webp|png|jpe?g)(?:[?#].*)?$/i.test(link.getAttribute("href") || "")
      );
      const title = [car.title, car.vin ? `VIN ${car.vin}` : ""].filter(Boolean).join(" ");
      galleryImages.forEach((image, index) => {
        const src = images[index % images.length];
        if (!src) return;
        if (image.getAttribute("src") !== src) image.setAttribute("src", src);
        if (image.getAttribute("alt") !== title) image.setAttribute("alt", title);
      });
      galleryLinks.forEach((link, index) => {
        const href = images[index % images.length];
        if (!href) return;
        if (link.getAttribute("href") !== href) link.setAttribute("href", href);
        link.setAttribute("data-fancybox", `vehicle-${car.id || car.lot || "detail"}`);
	      });
	    }
	
	    if (car.vin) {
	      replaceTextPattern(detailRoot, /\b[A-HJ-NPR-Z0-9]{17}\b/g, String(car.vin).toUpperCase(), 12);
	    }
	
	    if (car.lot) {
	      const route = parseVehicleRoute();
	      const routeLot = route?.routeId?.split("-").slice(1).join("-");
	      if (routeLot) {
	        replaceTextPattern(detailRoot, new RegExp(`\\b${routeLot.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "g"), String(car.lot), 12);
	      }
	    }

	    if (car.originalUrl) {
	      for (const link of detailRoot.querySelectorAll("a[href]")) {
	        const text = (link.textContent || "").trim();
	        if (link.matches(".vehicle-gallery-open-trigger, [data-fancybox]")) continue;
	        if (/^(encar|copart|iaai|🇰🇷|🇺🇸)$/i.test(text) || link.classList.contains("thirteen-vetura-source-flag")) {
	          link.setAttribute("href", car.originalUrl);
	          link.setAttribute("target", "_blank");
	          link.setAttribute("rel", "noopener noreferrer");
	        }
	      }
	    }
	
	    const detailPairs = [
	      ["Motori", car.engine],
	      ["Kilometrazhi", car.odometerFull || car.odometer],
	      ["Lokacioni", car.location],
	      ["Transmisioni", car.transmission],
	      ["Karburanti", car.fuel],
	      ["Dëmtimi", car.damage],
	      ["Gjendja", car.condition],
	      ["Ngjyra", car.color],
	      ["Viti", car.year]
	    ];
	    for (const [label, value] of detailPairs) {
	      if (!value) continue;
	      const labelNode = [...detailRoot.querySelectorAll("span, dt, div, p")]
	        .find((node) => (node.textContent || "").trim().replace(/:$/, "") === label);
	      const valueNode = labelNode?.nextElementSibling;
	      if (valueNode && valueNode.children.length === 0) {
	        setText(valueNode, value);
	      }
	    }
	
	    const source = String(car.source || car.sourceLabel || "").toLowerCase();
    const totalPrice = String(car.price || car.buyNowPrice || "").trim();
    if (source.includes("encar") && totalPrice.includes("€")) {
      for (const node of document.querySelectorAll(".encar-price-summary__main")) {
        if (node.textContent !== totalPrice) node.textContent = totalPrice;
        if (node.getAttribute("title") !== totalPrice) node.setAttribute("title", totalPrice);
      }
    }
	    applySourceFlags(detailRoot);
  };

	  const routeMatchesCar = (route, car) => {
	    if (!route || !car || typeof car !== "object") return false;
	    if (route.lot && String(car.lot || "") !== String(route.lot)) return false;
	    if (route.vin && !route.vin.startsWith("ENCAR") && car.vin && String(car.vin).toUpperCase() !== route.vin) return false;
	    return true;
	  };

	  const fetchVehicleByRouteSearch = async (route) => {
	    if (!route?.lot) return null;
	    const query = new URLSearchParams({ source: "encar", search: route.lot, limit: "12" });
	    const response = await fetch(`/api/catalog/cars?${query}`, { cache: "no-store" });
	    if (!response.ok) return null;
	    const payload = await response.json();
	    const cars = Array.isArray(payload?.data) ? payload.data : Array.isArray(payload?.cars) ? payload.cars : [];
	    return cars.find((car) => String(car?.lot || "") === String(route.lot)) || cars[0] || null;
	  };

	  const installImageErrorRepair = () => {
	    if (imageErrorRepairInstalled) return;
	    imageErrorRepairInstalled = true;
	    document.addEventListener(
	      "error",
	      (event) => {
	        const image = event.target;
	        if (!(image instanceof HTMLImageElement)) return;
	        const src = image.currentSrc || image.src || "";
	        if (!/\/\/cars2?\.import-motor\.com\//i.test(src) || !vehicleDetailRecord) return;
	        const replacement = uniqueValues([vehicleDetailRecord.image, ...(Array.isArray(vehicleDetailRecord.images) ? vehicleDetailRecord.images : [])]).find(
	          (candidate) => candidate !== src && !/\/\/cars2?\.import-motor\.com\//i.test(candidate)
	        );
	        if (replacement) image.src = replacement;
	      },
	      true
	    );
	  };

  const patchVehicleDetailFromApi = () => {
    const route = parseVehicleRoute();
    if (!route) {
      vehicleDetailRouteKey = "";
      vehicleDetailRecord = null;
      return;
    }

    if (vehicleDetailRecord && vehicleDetailRouteKey === window.location.pathname) {
      applyVehicleDetailData(vehicleDetailRecord);
      return;
    }

    if (vehicleDetailRequest === route.apiUrl) return;
    vehicleDetailRequest = route.apiUrl;
    fetch(route.apiUrl, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then(async (payload) => {
        let car = payload?.car || payload?.data || payload;
	        if (!routeMatchesCar(route, car)) {
	          car = await fetchVehicleByRouteSearch(route);
	        }
        if (!car || typeof car !== "object") return;
        vehicleDetailRouteKey = window.location.pathname;
        vehicleDetailRecord = car;
        applyVehicleDetailData(car);
      })
	      .catch(() => {})
	      .finally(() => {
	        if (vehicleDetailRequest === route.apiUrl) vehicleDetailRequest = null;
	        window.setTimeout(() => {
	          document.documentElement.classList.add("thirteen-vetura-detail-ready");
	          document.documentElement.classList.remove("thirteen-vetura-detail-loading");
	          document.getElementById("thirteen-vetura-detail-hide-style")?.remove();
	        }, 1000);
	      });
	  };

	  const applyAll = () => {
	    pending = false;
	    installStyle();
	    setBlackWhiteThemeEnabled(isBlackWhiteThemeEnabled());
	    installThemeToggle();
	    removeLanguageControls();
	    removeBlogLinks();
	    applyMeta();
	    applyLogo();
	    applyBusinessLinks();
    normalizeCarLinks();
	    normalizeSearchLinks();
	    reorderKoreaBeforeUsa();
	    reorderBrandOptions();
	    applyDefaultAuctionSources();
	    patchVehicleDetailFromApi();
	    installImageErrorRepair();
	    translateAttributes();
	    translateTextNodes();
	    applyPageSpecificText();
	    applySourceFlags();
  };

  const schedule = () => {
    if (pending) return;
    pending = true;
    window.requestAnimationFrame(applyAll);
  };

  const loadRate = async () => {
    try {
      const response = await fetch("/api/exchange-rates", { cache: "no-store" });
      const payload = await response.json();
      const rate = Number(payload?.usdToEur || payload?.rates?.EUR);
      if (Number.isFinite(rate) && rate > 0) {
        usdToEur = rate;
        schedule();
      }
    } catch {
      schedule();
    }
  };

  const start = () => {
	    installStyle();
	    setBlackWhiteThemeEnabled(isBlackWhiteThemeEnabled());
	    installHomeNavigation();
    installCarLinkNavigation();
	    installCatalogCardNavigation();
	    const startDomPatches = () => {
	      applyAll();
	      void loadRate();
	      new MutationObserver(schedule).observe(document.documentElement, {
	        childList: true,
	        subtree: true
	      });
	    };
	
	    if (document.readyState === "complete") {
	      window.setTimeout(startDomPatches, 700);
	    } else {
	      window.addEventListener("load", () => window.setTimeout(startDomPatches, 700), { once: true });
	    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
