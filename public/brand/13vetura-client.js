(() => {
  const business = {
    name: "13vetura",
    logoUrl: "/brand/korauto-logo.jpg",
    iconUrl: "/brand/korauto-icon.jpg",
    logoAlt: "KORAUTO logo",
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
	  let sortControlInstalled = false;
	  let lastAppliedAt = 0;
	  let deferredSchedule = 0;
	  const sourceDefaultsApplied = new Set();
	  const sourceDefaultAttempts = new Map();
	  const themeStorageKey = "13vetura:dark-theme-default-v2";
	  const catalogSortStorageKey = "13vetura:catalog-sort";
	  try {
	    if (window.localStorage.getItem(themeStorageKey) !== "0") {
	      document.documentElement.classList.add("thirteen-vetura-theme");
	    }
	  } catch {
	    document.documentElement.classList.add("thirteen-vetura-theme");
	  }

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
    ["Free car sourcing - pay only if we win", "Gjetje veture falas - paguani vetëm nëse fitojmë"],
    ["Calculate delivery", "Llogarit transportin"],
    ["Automobile", "Automobil"],
    ["Motorcycle", "Motoçikletë"],
    ["More", "Më shumë"],
    ["All makes", "Të gjitha markat"],
    ["All models", "Të gjitha modelet"],
    ["All generations", "Të gjitha gjeneratat"],
    ["From year", "Nga viti"],
    ["To year", "Deri në vit"],
    ["From", "Nga"],
    ["To", "Deri"],
    ["OR", "OSE"],
    ["Show", "Shfaq"],
    ["Show Vetura", "Shfaq veturat"],
    ["Show cars", "Shfaq veturat"],
    ["By submitting this form, you agree to the kushtet and rregullat.", "Duke dërguar këtë formular, pranoni kushtet dhe rregullat."],
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
    ["Highlights", "Pikat kryesore"],
    ["HIGHLIGHTS", "PIKAT KRYESORE"],
    ["Source", "Burimi"],
    ["SOURCE", "BURIMI"],
    ["Vehicle specs", "Specifikat e veturës"],
    ["VEHICLE SPECS", "SPECIFIKAT E VETURËS"],
    ["Generation", "Gjenerata"],
    ["Trim", "Paketa"],
    ["Sale type", "Lloji i shitjes"],
    ["Engine power (HP)", "Fuqia e motorit (HP)"],
    ["Drive wheel", "Rrotat aktive"],
    ["Vehicle type", "Lloji i automjetit"],
    ["View photos", "Shiko fotot"],
    ["Save", "Ruaj"],
    ["Saved", "E ruajtur"],
    ["Sales history", "Historiku i shitjeve"],
    ["Encar condition, incidents and options", "Gjendja, incidentet dhe opsionet Encar"],
    ["Consolidated data from Encar inspection, exterior markers, and mechanical checks.", "Të dhëna të përmbledhura nga inspektimi Encar, shenjat e jashtme dhe kontrollet mekanike."],
    ["Installed options", "Opsionet e instaluara"],
    ["Body incident map", "Harta e incidenteve në karroceri"],
    ["Exterior body", "Karroceria e jashtme"],
    ["Inner structure", "Struktura e brendshme"],
    ["Replaced", "Zëvendësuar"],
    ["Repaired", "Riparuar"],
    ["Corrosion", "Korrozion"],
    ["Scratched", "Gërvishtur"],
    ["Other issue", "Problem tjetër"],
    ["Damaged", "Dëmtuar"],
    ["See all", "Shiko të gjitha"],
    ["No damage", "Pa dëmtime"],
    ["Accidents", "Aksidente"],
    ["Accidents free", "Pa aksidente"],
    ["Present", "Prezent"],
    ["General", "Të përgjithshme"],
    ["Similar vehicles", "Vetura të ngjashme"],
    ["Interested in this vehicle?", "Jeni të interesuar për këtë veturë?"],
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
    ["Upcoming", "Në pritje"],
    ["UPCOMING", "NË PRITJE"],
    ["Enhanced", "E përmirësuar"],
    ["Green", "E gjelbër"],
    ["Hydrogen", "Hidrogjen"],
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
    ["Cheapest", "Më të lirat"],
    ["Most expensive", "Më të shtrenjtat"],
    ["Newest", "Më të rejat"],
    ["Lowest mileage", "Kilometrazhi më i ulët"],
    ["Sort", "Rendit"],
    ["Sort by", "Rendit sipas"],
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
    ["Cars from the USA and South Korea", "Vetura nga Koreja e Jugut dhe SHBA"],
    ["Cars from the South Korea and USA", "Vetura nga Koreja e Jugut dhe SHBA"],
    ["Cars from the Koreja e Jugut dhe SHBA", "Vetura nga Koreja e Jugut dhe SHBA"],
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
    ["Engine:", "Motori:"],
    ["Odometer:", "Kilometrazhi:"],
    ["Location:", "Lokacioni:"],
    ["Condition:", "Gjendja:"],
    ["Seller:", "Shitësi:"],
    ["Key included:", "Çelësi i përfshirë:"],
    ["Damage:", "Dëmtimi:"],
    ["Gearbox:", "Transmisioni:"],
    ["Fuel:", "Karburanti:"],
    ["Spin", "Rrotullo"],
    ["Current bid", "Oferta aktuale"],
    ["View 20 photos", "Shiko 20 foto"],
    ["View 19 photos", "Shiko 19 foto"],
    ["View 18 photos", "Shiko 18 foto"],
    ["View 17 photos", "Shiko 17 foto"],
    ["View 16 photos", "Shiko 16 foto"],
    ["View 15 photos", "Shiko 15 foto"],
    ["View photos", "Shiko fotot"],
    ["No damage", "Pa dëmtime"],
    ["Accidents free", "Pa aksidente"],
    ["Interested in this vehicle?", "Jeni të interesuar për këtë veturë?"],
    ["We can help with purchasing and shipping this vehicle.", "Mund t'ju ndihmojmë me blerjen dhe transportin e kësaj veture."],
    ["Installed options", "Opsionet e instaluara"],
    ["Body incident map", "Harta e incidenteve në karroceri"],
    ["Exterior body", "Karroceria e jashtme"],
    ["Inner structure", "Struktura e brendshme"],
    ["Other issue", "Problem tjetër"],
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
	      return window.localStorage.getItem(themeStorageKey) !== "0";
	    } catch {
	      return true;
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

	  const logoPattern = /(?:site-logo|logo-EwEQIT7A|13vetura\.com\/assets\/logo|\/brand\/korauto-|importauto|13vetura|korauto)/i;
	
	  const isSiteLogo = (image) => {
	    const src = image.getAttribute("src") || "";
	    const alt = image.getAttribute("alt") || "";
	    if (src.includes("/images/brands/") || src.includes("/cars/") || src.includes("option_images")) return false;
	    if (logoPattern.test(src) || logoPattern.test(alt)) return true;
	    return Boolean(image.closest("header, footer") && /logo/i.test(`${src} ${alt}`));
	  };
	
	  const applyLogo = () => {
	    for (const img of document.images) {
	      if (isSiteLogo(img)) {
	        img.setAttribute("src", business.logoUrl);
	        img.setAttribute("alt", business.logoAlt);
	        img.setAttribute("loading", "eager");
	        img.setAttribute("decoding", "async");
	        img.setAttribute("fetchpriority", "high");
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
	        const hasLogo = Boolean(link.querySelector('img[src*="/brand/korauto-"], img[src*="13vetura.com/assets/logo"], img[alt*="13vetura"], img[alt*="KORAUTO"]'));
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
	    document.documentElement.classList.toggle("thirteen-vetura-ios", /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
	    const metaValues = [
	      ["theme-color", "#080808"],
	      ["apple-mobile-web-app-capable", "yes"],
	      ["apple-mobile-web-app-status-bar-style", "black-translucent"],
	      ["apple-mobile-web-app-title", business.name],
	      ["format-detection", "telephone=yes"]
	    ];
	    for (const [name, content] of metaValues) {
	      let meta = document.querySelector(`meta[name="${name}"]`);
	      if (!meta) {
	        meta = document.createElement("meta");
	        meta.setAttribute("name", name);
	        document.head.appendChild(meta);
	      }
	      meta.setAttribute("content", content);
	    }
	    const upsertLink = (rel, href, type = "image/jpeg") => {
	      let link = document.querySelector(`link[rel="${rel}"]`);
	      if (!link) {
	        link = document.createElement("link");
	        link.setAttribute("rel", rel);
	        document.head.appendChild(link);
	      }
	      link.setAttribute("href", href);
	      if (type) link.setAttribute("type", type);
	      return link;
	    };
	    upsertLink("apple-touch-icon", business.iconUrl);
	    upsertLink("icon", business.iconUrl);
	    upsertLink("shortcut icon", business.iconUrl);
	    for (const href of ["https://ci.encar.com", "https://cs.copart.com", "https://vis.iaai.com", "https://13vetura.com"]) {
	      if (document.querySelector(`link[rel="preconnect"][href="${href}"]`)) continue;
	      const link = document.createElement("link");
	      link.setAttribute("rel", "preconnect");
	      link.setAttribute("href", href);
	      link.setAttribute("crossorigin", "");
	      document.head.appendChild(link);
	    }
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
	    for (const [property, content] of [
	      ["og:image", business.iconUrl],
	      ["twitter:image", business.iconUrl]
	    ]) {
	      let meta = document.querySelector(`meta[property="${property}"], meta[name="${property}"]`);
	      if (!meta) {
	        meta = document.createElement("meta");
	        meta.setAttribute(property.startsWith("og:") ? "property" : "name", property);
	        document.head.appendChild(meta);
	      }
	      meta.setAttribute("content", new URL(content, window.location.origin).href);
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
        --vetura-surface: #0f0f10;
        --vetura-card: #171717;
        --vetura-elevated: #232323;
        --vetura-border: #343434;
        --vetura-text: #ffffff;
        --vetura-muted: #d0d0d0;
        --vetura-soft: #eeeeee;
        --vetura-primary: #ffffff;
        --vetura-price: #ffffff;
        --vetura-success: #22c55e;
      }
      html.thirteen-vetura-theme,
      html.thirteen-vetura-theme body,
      html.thirteen-vetura-theme #__nuxt {
        background: var(--vetura-bg) !important;
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme body {
        font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
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
      html.thirteen-vetura-theme [class*="text-sky"],
      html.thirteen-vetura-theme [class*="text-cyan"],
      html.thirteen-vetura-theme [class*="text-[#007BFF]"],
      html.thirteen-vetura-theme [class*="text-[#007bff]"],
      html.thirteen-vetura-theme [class*="text-[#2563EB]"],
      html.thirteen-vetura-theme [class*="text-[#2563eb]"],
      html.thirteen-vetura-theme [class*="text-[#1D4ED8]"],
      html.thirteen-vetura-theme [class*="text-[#1d4ed8]"],
      html.thirteen-vetura-theme [class*="text-[#0A2540]"],
      html.thirteen-vetura-theme [class*="text-[#0a2540]"],
      html.thirteen-vetura-theme [class*="text-[#123454]"],
      html.thirteen-vetura-theme [class*="text-[#1f3854]"],
      html.thirteen-vetura-theme [class*="text-[#4f6b8b]"],
      html.thirteen-vetura-theme [class*="text-indigo"],
      html.thirteen-vetura-theme [class*="hover:text-blue"]:hover {
        color: var(--vetura-primary) !important;
      }
      html.thirteen-vetura-theme [style*="color:#0a2540"],
      html.thirteen-vetura-theme [style*="color: #0a2540"],
      html.thirteen-vetura-theme [style*="color:#071624"],
      html.thirteen-vetura-theme [style*="color: #071624"],
      html.thirteen-vetura-theme [style*="color:#007bff"],
      html.thirteen-vetura-theme [style*="color: #007bff"],
      html.thirteen-vetura-theme [style*="color: rgb(10, 37, 64)"],
      html.thirteen-vetura-theme [style*="color: rgb(0, 123, 255)"] {
        color: var(--vetura-text) !important;
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
      html.thirteen-vetura-theme .vehicle-type-option,
      html.thirteen-vetura-theme .vehicle-type-option *,
      html.thirteen-vetura-theme .source-switch,
      html.thirteen-vetura-theme .source-switch *,
      html.thirteen-vetura-theme .source-switch-label {
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme .vehicle-type-option:not(.is-active),
      html.thirteen-vetura-theme .vehicle-type-option:not(.is-active) *,
      html.thirteen-vetura-theme .source-switch:not(.is-active),
      html.thirteen-vetura-theme .source-switch:not(.is-active) * {
        color: var(--vetura-soft) !important;
      }
      html.thirteen-vetura-theme .search-select,
      html.thirteen-vetura-theme .search-select-trigger,
      html.thirteen-vetura-theme button.search-select-trigger {
        background: var(--vetura-card) !important;
        border-color: var(--vetura-border) !important;
        color: var(--vetura-text) !important;
        box-shadow: none !important;
      }
      html.thirteen-vetura-theme .search-select *,
      html.thirteen-vetura-theme .search-select-trigger * {
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme .price-summary-panel,
      html.thirteen-vetura-theme .encar-price-summary,
      html.thirteen-vetura-theme .vehicle-action-sidebar section {
        background: var(--vetura-card) !important;
        color: var(--vetura-text) !important;
      }
      html.thirteen-vetura-theme [class*="price"],
      html.thirteen-vetura-theme [class*="Price"],
      html.thirteen-vetura-theme [class*="bid"],
      html.thirteen-vetura-theme [class*="Bid"],
      html.thirteen-vetura-theme [class*="value"],
      html.thirteen-vetura-theme [class*="Value"],
      html.thirteen-vetura-theme .catalog-range-field-prefix,
      html.thirteen-vetura-theme .encar-price-summary__main,
      html.thirteen-vetura-theme .price-summary-panel [class],
      html.thirteen-vetura-theme .vehicle-action-sidebar [class*="text-blue"] {
        color: var(--vetura-price) !important;
      }
      html.thirteen-vetura-theme .vehicle-action-sidebar button,
      html.thirteen-vetura-theme .vehicle-action-sidebar a[class*="bg-blue"] {
        background: var(--vetura-primary) !important;
        background-image: none !important;
        color: #080808 !important;
      }
      img[src*="/brand/korauto-logo"],
      img[src*="/brand/korauto-icon"],
      img[src*="13vetura.com/assets/logo"] {
        object-fit: contain !important;
        background: #000000 !important;
        border-radius: 8px !important;
        display: inline-block !important;
        max-height: 54px;
        min-width: 118px;
        padding: 0 !important;
        width: auto;
      }
	      header img[src*="/brand/korauto-logo"],
	      footer img[src*="/brand/korauto-logo"],
	      header img[src*="13vetura.com/assets/logo"],
	      footer img[src*="13vetura.com/assets/logo"] {
	        width: clamp(132px, 15vw, 196px) !important;
	        height: auto !important;
	        max-height: 46px !important;
	      }
	      html.thirteen-vetura-theme img[src*="/brand/korauto-logo"],
	      html.thirteen-vetura-theme img[src*="/brand/korauto-icon"],
	      html.thirteen-vetura-theme img[src*="13vetura.com/assets/logo"] {
	        background: #000000 !important;
	        border-radius: 8px !important;
	        box-shadow: none !important;
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
	      html.thirteen-vetura-theme .thirteen-vetura-positive,
	      html.thirteen-vetura-positive {
	        color: var(--vetura-success, #22c55e) !important;
	        font-weight: 800 !important;
	      }
	      .thirteen-vetura-sort-control {
	        align-items: center;
	        display: inline-flex;
	        gap: 8px;
	        margin: 0 0 14px auto;
	        max-width: 100%;
	      }
	      .thirteen-vetura-sort-control label {
	        color: inherit;
	        font-size: 13px;
	        font-weight: 800;
	        white-space: nowrap;
	      }
	      .thirteen-vetura-sort-control select {
	        min-height: 42px;
	        border-radius: 10px;
	        border: 1px solid rgba(255,255,255,.18);
	        background: #111111;
	        color: #ffffff;
	        font-size: 14px;
	        font-weight: 800;
	        padding: 0 36px 0 12px;
	      }
	      html {
	        -webkit-text-size-adjust: 100%;
	        text-size-adjust: 100%;
	        scroll-behavior: smooth;
	      }
	      body {
	        overscroll-behavior-y: none;
	        text-rendering: optimizeLegibility;
	      }
	      img {
	        content-visibility: auto;
	      }
	      article {
	        contain: layout paint style;
	      }
	      button,
	      a,
	      input,
	      select {
	        touch-action: manipulation;
	      }
	      @media (max-width: 820px) {
	        html,
	        body,
	        #__nuxt {
	          max-width: 100%;
	          overflow-x: hidden !important;
	        }
	        body {
	          padding-bottom: env(safe-area-inset-bottom);
	        }
	        header {
	          position: sticky !important;
	          top: 0 !important;
	          z-index: 60 !important;
	          -webkit-backdrop-filter: blur(16px) saturate(150%) !important;
	          backdrop-filter: blur(16px) saturate(150%) !important;
	          border-bottom: 1px solid rgba(255,255,255,.10) !important;
	        }
	        header > *,
	        header nav,
	        header [class*="container"],
	        header [class*="items-center"] {
	          min-width: 0 !important;
	        }
	        header img[src*="/brand/korauto-logo"],
	        header img[src*="13vetura.com/assets/logo"] {
	          width: min(148px, 42vw) !important;
	          max-height: 38px !important;
	        }
	        header nav,
	        header [class*="navigation"] {
	          -webkit-overflow-scrolling: touch;
	          overflow-x: auto !important;
	          scrollbar-width: none;
	        }
	        header nav::-webkit-scrollbar {
	          display: none;
	        }
	        main {
	          min-width: 0 !important;
	          padding-left: max(10px, env(safe-area-inset-left)) !important;
	          padding-right: max(10px, env(safe-area-inset-right)) !important;
	        }
	        section,
	        article,
	        aside,
	        [class*="grid"],
	        [class*="flex"] {
	          min-width: 0 !important;
	        }
	        article {
	          border-radius: 14px !important;
	          margin-inline: 0 !important;
	          overflow: hidden !important;
	          transform: translateZ(0);
	        }
	        article h2,
	        article h3,
	        article a,
	        article p,
	        article span {
	          overflow-wrap: anywhere;
	        }
	        article img {
	          height: auto !important;
	          max-height: 230px !important;
	          object-fit: cover !important;
	        }
	        .catalog-filter-panel,
	        .catalog-mobile-filters,
	        aside[class*="filter"],
	        [class*="filter"][class*="panel"] {
	          max-height: calc(100dvh - 74px) !important;
	          overflow-y: auto !important;
	          -webkit-overflow-scrolling: touch;
	        }
	        .dropdown-pop-panel,
	        .quick-filters-panel,
	        [role="listbox"],
	        [role="menu"] {
	          border-radius: 16px !important;
	          max-height: min(76dvh, 560px) !important;
	          max-width: calc(100vw - 16px) !important;
	          overflow: auto !important;
	          -webkit-overflow-scrolling: touch;
	          transform: translateZ(0);
	        }
	        .quick-filters-panel {
	          height: min(76dvh, 560px) !important;
	          width: calc(100vw - 16px) !important;
	        }
	        .quick-filters-sidebar {
	          gap: 6px !important;
	          padding: 8px !important;
	        }
	        .quick-filters-tab {
	          border-radius: 10px !important;
	          font-size: 13px !important;
	          min-height: 38px !important;
	          padding: 8px 9px !important;
	        }
	        .quick-filters-heading {
	          min-height: 42px !important;
	          padding: 0 10px !important;
	        }
	        .quick-filters-heading h3 {
	          font-size: 16px !important;
	        }
	        .quick-filters-options {
	          gap: 6px !important;
	          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
	          padding: 8px !important;
	        }
	        .quick-filters-option {
	          border-radius: 10px !important;
	          gap: 6px !important;
	          min-height: 38px !important;
	          padding: 6px 7px !important;
	        }
	        .quick-filters-option-label {
	          font-size: 13.5px !important;
	        }
	        input,
	        select,
	        textarea,
	        button,
	        a[role="button"] {
	          font-size: 16px !important;
	          min-height: 44px;
	        }
	        .thirteen-vetura-theme-toggle {
	          height: 40px;
	          min-width: 42px;
	          padding: 0 10px;
	        }
	        .thirteen-vetura-sort-control {
	          display: grid;
	          grid-template-columns: 1fr;
	          margin: 0 0 12px 0;
	          width: 100%;
	        }
	        .thirteen-vetura-sort-control select {
	          width: 100%;
	        }
	        .home-hero-section {
	          min-height: auto !important;
	          padding-block: 26px !important;
	        }
	        .home-hero-content-shell {
	          background-image: none !important;
	          padding: 22px 12px 28px !important;
	        }
	        .home-hero-title,
	        h1 {
	          font-size: clamp(27px, 8.2vw, 36px) !important;
	          line-height: 1.08 !important;
	        }
	        [class*="vehicle-gallery"],
	        [class*="VehicleGallery"],
	        [class*="price-summary"],
	        .vehicle-action-sidebar,
	        .price-summary-panel {
	          max-width: 100% !important;
	          min-width: 0 !important;
	        }
	      }
	      @media (max-width: 520px) {
	        header img[src*="/brand/korauto-logo"],
	        header img[src*="13vetura.com/assets/logo"] {
	          width: min(136px, 45vw) !important;
	          max-height: 34px !important;
	        }
	        header a,
	        header button {
	          min-height: 38px !important;
	        }
	        .thirteen-vetura-theme-toggle {
	          font-size: 11px !important;
	          height: 38px !important;
	          min-width: 38px !important;
	          padding-inline: 8px !important;
	        }
	        .quick-filters-panel {
	          grid-template-columns: minmax(88px, 32%) minmax(0, 1fr) !important;
	          height: min(78dvh, 590px) !important;
	        }
	        .quick-filters-options {
	          grid-template-columns: 1fr !important;
	        }
	        .quick-filters-option-logo {
	          height: 22px !important;
	          width: 22px !important;
	        }
	        article img {
	          max-height: 205px !important;
	        }
	        article [class*="border-[#"]:not(button):not(a):not(input):not(select),
	        article [class*="ring-"]:not(button):not(a):not(input):not(select) {
	          box-shadow: none !important;
	        }
	        article [class*="tracking-"],
	        article [class*="uppercase"] {
	          color: var(--vetura-soft) !important;
	        }
	      }
	      @media (prefers-reduced-motion: reduce) {
	        *,
	        *::before,
	        *::after {
	          animation-duration: .01ms !important;
	          animation-iteration-count: 1 !important;
	          scroll-behavior: auto !important;
	          transition-duration: .01ms !important;
	        }
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

	  const installSortControl = () => {
	    if (sortControlInstalled || location.pathname !== "/search") return;
	    const main = document.querySelector("main main") || document.querySelector("main");
	    if (!main) return;
	
	    const host =
	      [...main.children].find((element) => element.querySelector?.("article")) ||
	      [...main.querySelectorAll("div, section")].find((element) => element.querySelector?.("article"));
	    if (!host || document.getElementById("thirteen-vetura-sort")) return;
	
	    const params = new URLSearchParams(location.search);
	    const wrap = document.createElement("div");
	    wrap.className = "thirteen-vetura-sort-control";
	    const label = document.createElement("label");
	    label.setAttribute("for", "thirteen-vetura-sort");
	    label.textContent = "Rendit";
	    const select = document.createElement("select");
	    select.id = "thirteen-vetura-sort";
	    select.innerHTML = `
	      <option value="">Të rekomanduara</option>
	      <option value="price_asc">Më të lirat</option>
	      <option value="price_desc">Më të shtrenjtat</option>
	      <option value="year_desc">Më të rejat</option>
	      <option value="mileage_asc">Kilometrazhi më i ulët</option>
	    `;
	    let savedSort = "";
	    try {
	      savedSort = window.sessionStorage.getItem(catalogSortStorageKey) || "";
	    } catch {}
	    select.value = params.get("sort") || savedSort || "";
	    select.addEventListener("change", () => {
	      try {
	        if (select.value) window.sessionStorage.setItem(catalogSortStorageKey, select.value);
	        else window.sessionStorage.removeItem(catalogSortStorageKey);
	      } catch {}
	      applyCatalogSort();
	    });
	    wrap.append(label, select);
	    host.parentElement?.insertBefore(wrap, host);
	    sortControlInstalled = true;
	    applyCatalogSort();
	  };

	  const numberFromText = (value) => {
	    const numeric = Number(String(value || "").replace(/[\s\u00a0]/g, "").replace(/[^0-9.-]/g, ""));
	    return Number.isFinite(numeric) ? numeric : null;
	  };

	  const getArticleMetric = (article, sortValue) => {
	    const text = article.innerText || "";
	    if (sortValue === "price_asc" || sortValue === "price_desc") {
	      return numberFromText(text.match(/€[\d\s\u00a0]+/)?.[0]) ?? (sortValue === "price_asc" ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY);
	    }
	    if (sortValue === "year_desc") {
	      return numberFromText(text.match(/\b(19|20)\d{2}\b/)?.[0]) ?? 0;
	    }
	    if (sortValue === "mileage_asc") {
	      return numberFromText(text.match(/≈\s*[\d,\s\u00a0]+\s*km/i)?.[0] || text.match(/[\d,\s\u00a0]+\s*km/i)?.[0]) ?? Number.POSITIVE_INFINITY;
	    }
	    return 0;
	  };

	  const applyCatalogSort = () => {
	    if (location.pathname !== "/search") return;
	    const select = document.getElementById("thirteen-vetura-sort");
	    const sortValue = select?.value || "";
	    if (!sortValue) return;
	    const articles = [...document.querySelectorAll("article")].filter((article) => article.closest("main"));
	    if (articles.length < 2) return;
	    const container = articles[0].parentElement;
	    if (!container || !articles.every((article) => article.parentElement === container)) return;
	    const sorted = articles
	      .map((article, index) => ({ article, index, value: getArticleMetric(article, sortValue) }))
	      .sort((left, right) => {
	        if (left.value !== right.value) {
	          return sortValue === "price_desc" || sortValue === "year_desc" ? right.value - left.value : left.value - right.value;
	        }
	        return left.index - right.index;
	      });
	    for (const item of sorted) {
	      container.appendChild(item.article);
	    }
	  };

	  const markPositiveValues = () => {
	    const nodes = [...document.querySelectorAll("span, div, p, dd, strong")].filter((node) => {
	      if (node.children.length > 0) return false;
	      return /^(po|yes|prezent|ndez dhe ecën)$/i.test((node.textContent || "").trim());
	    });
	    for (const node of nodes) {
	      node.classList.add("thirteen-vetura-positive");
	    }
	  };

	  const optimizeMedia = () => {
	    let eagerCount = 0;
	    for (const image of document.images) {
	      if (isSiteLogo(image) || image.src.includes("/brand/korauto-") || image.src.includes("13vetura.com/assets/logo")) {
	        if (image.getAttribute("src") !== business.logoUrl && !image.src.includes("/brand/korauto-icon")) {
	          image.setAttribute("src", business.logoUrl);
	        }
	        image.setAttribute("loading", "eager");
	        image.setAttribute("fetchpriority", "high");
	        image.setAttribute("decoding", "async");
	        continue;
	      }
	      image.setAttribute("decoding", "async");
	      if (eagerCount < 2 && image.closest("main")) {
	        image.setAttribute("loading", "eager");
	        image.setAttribute("fetchpriority", "high");
	        eagerCount += 1;
	      } else {
	        image.setAttribute("loading", "lazy");
	        image.setAttribute("fetchpriority", "low");
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
	    lastAppliedAt = performance.now();
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
	    installSortControl();
	    applyCatalogSort();
	    applyDefaultAuctionSources();
	    patchVehicleDetailFromApi();
	    installImageErrorRepair();
	    translateAttributes();
	    translateTextNodes();
	    applyPageSpecificText();
	    applySourceFlags();
	    markPositiveValues();
	    optimizeMedia();
  };

	  const schedule = () => {
	    if (pending) return;
	    const now = performance.now();
	    const run = () => {
	      pending = true;
	      window.requestAnimationFrame(applyAll);
	    };
	    if (now - lastAppliedAt < 90) {
	      window.clearTimeout(deferredSchedule);
	      deferredSchedule = window.setTimeout(run, 90);
	      return;
	    }
	    run();
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
	    let domPatchesStarted = false;
	    const startDomPatches = () => {
	      if (domPatchesStarted) return;
	      domPatchesStarted = true;
	      applyAll();
	      void loadRate();
	      new MutationObserver(schedule).observe(document.documentElement, {
	        childList: true,
	        subtree: true
	      });
	      window.setTimeout(schedule, 250);
	    };
	
	    if (document.readyState === "loading") {
	      document.addEventListener("DOMContentLoaded", startDomPatches, { once: true });
	    } else {
	      startDomPatches();
	    }
	    window.addEventListener("load", schedule, { once: true });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
