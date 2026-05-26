# 13vetura Static Mirror

This project mirrors the public Nuxt site from `https://cars.auctionsapi.com/` into `public/`, customizes it for 13vetura, and serves it locally with a small Node server.

## Commands

```sh
npm run mirror
npm run customize
npm run dev
```

`npm run mirror` refreshes the generated files in `public/` and then reapplies the 13vetura customization.

`npm run customize` reapplies only the 13vetura customization to the existing `public/` files.

`npm run dev` serves the mirrored site at `http://localhost:4173`.

The local server proxies `/api/` requests to `https://cars.auctionsapi.com` so the search page and vehicle cards load live catalog data from the original API. The proxy also converts supported catalog prices from USD to EUR using the live USD/EUR rate from Frankfurter and translates common catalog labels into Albanian. To use a different catalog API host, run:

```sh
API_ORIGIN=https://example.com npm run dev
```

## Notes

- The mirror includes the public homepage, content pages, blog posts, search page, first visible vehicle detail pages, Nuxt bundles, i18n payloads, build manifest, brand icons, and page images.
- The 13vetura logo is loaded from `https://13vetura.com/assets/logo-EwEQIT7A.png`.
- The visible site is rebranded to 13vetura, localized to Albanian, and updated with the phone, email, address, WhatsApp, map, and office hours from `13vetura.com`.
- Live vehicle photos and catalog data still depend on external source/CDN/API URLs from the original site.
- Only reuse this mirror where you have the rights or permission to copy and publish the source site's content and assets.
