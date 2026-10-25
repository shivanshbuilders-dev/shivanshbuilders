# Offline site cloning — setup

Two global tools, both driving your installed **Microsoft Edge** (Chromium):

| Tool | Command | Use for |
|---|---|---|
| `single-file-cli` | `snap.cmd <url> <out.html>` | One page, pixel-perfect, JS fully rendered, everything inlined into a single file |
| `website-scraper` | `node scrape.mjs <url> <outdir>` | Whole site, many pages, assets kept as separate files in a folder |

## Capture one page (best fidelity)

```powershell
.\snap.cmd "https://example.com" ".\out\home.html"
```

You get one `.html` file with CSS, JS, images and fonts embedded. Open it with no internet — it just works.
Good for SPAs, dashboards, logged-in pages, anything where the DOM is built by JavaScript.

Speed: add a third argument to skip the 60s network-idle wait:

```powershell
.\snap.cmd "https://example.com" ".\out\home.html" load
```

## Mirror a whole site (many pages)

```powershell
node scrape.mjs https://example.com ./sites/example
node scrape.mjs https://docs.example.com ./sites/docs --depth 4
node scrape.mjs https://example.com ./sites/full --depth 3 --external
```

| Flag | Meaning |
|---|---|
| `--depth N` | How many links to follow (default `2`) |
| `--external` | Also follow links to other domains (default: same origin only) |
| `--js` | Render JS before saving; needs `npm i -g website-scraper-puppeteer` |

The output folder **must not already exist** — the tool creates it. Pick a new name per run.

Result:

```
sites/example/
├── index.html
├── js/s.js
├── css/main.css
└── images/...
```

Relative paths are rewritten, so it opens offline from disk.

## Which should I use for your site?

- Static / docs / blog / marketing site → `scrape.mjs`, it walks the links for you.
- React/Vue/Next app, login wall, or infinite scroll → `snap.cmd` per page. Scrapers only see raw HTML; they will miss content rendered by JS.
- Best hybrid: `snap.cmd` on the handful of pages you actually care about.

## Verification

```powershell
single-file --version
node -e "import('file:///C:/Users/kunal/AppData/Roaming/npm/node_modules/website-scraper/index.mjs').then(m=>console.log('website-scraper OK'))"
```

## Known quirks

- `networkidle0` warning after 60s is harmless — it captures at interactive time and exits 0.
- Edge is hardcoded in `snap.cmd`. If you install Chrome and prefer it, edit the `EDGE=` line.
- `--js` is not installed by default; it needs a Puppeteer download (~150 MB).

## Note on the `websnap` README

The spec that was shared (daemon, `Session`/`Rewriter`/`Differ`, ARIA state-tree BFS) does not exist on npm.
`websnap` is a 2014 PhantomJS screenshot script with no such features. It was removed. This setup replaces it with
tools that actually do the offline-clone job.
