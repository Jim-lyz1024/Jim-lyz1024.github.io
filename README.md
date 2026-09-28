# jim-lyz1024.github.io

Personal homepage of Yuzhuo Li, served by GitHub Pages at <https://jim-lyz1024.github.io/>.

Plain HTML and CSS with no build step. `.nojekyll` tells GitHub Pages to serve the files as they are.

| File | What it holds |
|------|---------------|
| `index.html` | All page content: bio, news, publications, CV |
| `assets/css/style.css` | Layout, typography and colours (colour variables at the top) |
| `assets/js/main.js` | Email link, BibTeX show/copy |
| `assets/img/` | Portrait, favicon, touch icon |

## Updating

- **News:** copy one `<li class="entry">` at the top of the News list and edit the date and text. Newest first.
- **Publication:** copy a whole `<li class="entry pub">` block. Give it a new `id` and update the matching
  `aria-controls` / `id` pair used by the BibTeX button and panel.
- **Last updated:** edit the date in the footer.

## Preview locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>.
