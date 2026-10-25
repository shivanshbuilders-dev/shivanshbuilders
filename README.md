# ShivAnsh Builders & Developers — Official Website

Official production website repository for **ShivAnsh Builders & Developers**, engineered for static deployment on Netlify.

## Overview
- **Brand**: ShivAnsh Builders & Developers
- **Office Address**: A 232, Balaji Bhavan, Plot No. 42A, Sector 11, CBD Belapur, Navi Mumbai - 400614
- **Phone**: +91 9082451849
- **Email**: shivanshbuilders.dev@gmail.com
- **Deployment Platform**: Netlify (Static Hosting)

---

## Website Structure
The production website is self-contained in the `website/` directory:
- `index.html` — Homepage with dynamic hero slider, company overview, services showcase, interactive testimonial slider, and marquee
- `about-us.html` — Company history, engineering philosophy, and values
- `our-team.html` — Leadership and engineering teams
- `services.html` — Turnkey construction, architectural planning, and structural engineering services
- `portfolio.html` — Projects showcase with direct navigation
- 9 Individual Project Detail Pages:
  - `luxury-garden-estate.html`
  - `urban-office-complex.html`
  - `the-core-center.html`
  - `workspace-redefined.html`
  - `urban-family-home.html`
  - `the-innovation-hub.html`
  - `luxury-on-the-lake.html`
  - `hub-development.html`
  - `smart-energy-office.html`
- `faqs.html` — Interactive collapsible accordion answering client inquiries
- `contacts.html` — Direct inquiry form with WhatsApp redirection and interactive Belapur office map
- `404.html` — Custom 404 error page returning true HTTP 404 status
- `offline.html` — Dedicated offline/no-internet page with automatic reconnection and retry mechanism
- `sw.js` — Service worker providing offline page fallback
- `_redirects` — Netlify routing rules (`/* /404.html 404`)

---

## Netlify Deployment
The project is pre-configured for instant Netlify static deployment via `netlify.toml`:
```toml
[build]
  publish = "website"

[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

---

## Maintenance & Audit Scripts
Reusable scripts reside in `scripts/`:
- `node scripts/audit.mjs` — Audits internal navigation links, removes demo URLs, validates navbar and widgets
- `node scripts/capture.mjs [page] [out.png] [width] [height]` — Headless browser screenshot capture via CDP
- `node migrate-to-website.mjs` — Master production build generator
