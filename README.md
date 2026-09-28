# jim-lyz1024.github.io

Personal homepage of Yuzhuo Li, served by GitHub Pages at <https://jim-lyz1024.github.io/>.

Plain HTML/CSS with a little JavaScript and no build step; `.nojekyll` makes GitHub Pages serve
the files as they are. Light and dark schemes; the accent colour is University of Auckland blue.

| Path | Page |
|------|------|
| `index.html` | About: bio, News, and the Papers box |
| `publications/index.html` | Full publication list, grouped by year |
| `services/index.html` | Academic service |
| `teaching/index.html` | Teaching (GTA) |
| `cv/index.html` | Education, experience, honours and awards |
| `assets/css/style.css` | All styles; colour variables for both themes are at the top |
| `assets/js/main.js` | Theme toggle, mobile menu, Abs/Bib panels, figure zoom |
| `assets/icons.svg` | Icon sprite (Bootstrap Icons, MIT; Simple Icons, CC0) |
| `assets/img/pubs/` | Paper figures: `<name>.webp` (zoom) and `<name>-thumb.webp` (list) |

## Updating

- **News:** add a `<tr>` at the top of the News table in `index.html`.
- **Paper:** copy a whole `<li class="pub">` block into `publications/index.html` (under its year)
  **and** into the Papers box of `index.html`; the two copies are identical. Give it a new `id`,
  and matching `abs-<id>` / `bib-<id>` panel ids (each `data-panel` button points at its panel).
  The figure is `assets/img/pubs/<name>.webp` (shown on click) plus `<name>-thumb.webp` (360 px wide).
- **Navigation:** the menu is repeated in every page's `<header class="navbar">`.
- **New page:** also add its URL to `sitemap.xml` (search engines read it via `robots.txt`).

All links use root paths (`/assets/...`, `/cv/`), so preview through a local server rather than
opening the files directly:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.
