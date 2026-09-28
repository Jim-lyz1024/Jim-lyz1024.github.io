# jim-lyz1024.github.io

Personal homepage of Yuzhuo Li, served by GitHub Pages at <https://jim-lyz1024.github.io/>.

Plain HTML/CSS with a little JavaScript and no build step; `.nojekyll` makes GitHub Pages serve
the files as they are. The look follows the al-folio academic theme (light and dark schemes).

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
- **Paper:** copy a whole `<li>` in `publications/index.html` **and** in the Papers box of
  `index.html` (the two lists are kept in sync by hand). Give the Abs/Bib panel ids a new suffix;
  each `data-panel` button points at its panel's `id`.
- **Navigation:** the menu is repeated in every page's `<header class="navbar">`.

All links use root paths (`/assets/...`, `/cv/`), so preview through a local server rather than
opening the files directly:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.
