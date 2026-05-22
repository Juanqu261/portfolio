# Portfolio

Bilingual (EN / ES) Angular portfolio showcasing my GitHub projects, deployable to GitHub Pages.

## Stack

- Angular 18+ (standalone components)
- TypeScript (strict)
- SCSS, CSS Grid + Flexbox, mobile-first
- Runtime i18n via route prefix (`/en`, `/es`)

## Local development

```bash
npm install
npm start
```

Open <http://localhost:4200/> — it redirects to `/en`.

## Production build

```bash
npm run build
```

Output: `dist/portfolio/browser/`.

## Deploy to GitHub Pages

1. Create a GitHub repo named `portfolio` and push this code.
2. Run:

   ```bash
   npm run deploy
   ```

   This builds with `--base-href /portfolio/` and publishes `dist/portfolio/browser/` to the `gh-pages` branch via [`angular-cli-ghpages`](https://github.com/angular-schule/angular-cli-ghpages).

3. In the repo settings, enable GitHub Pages from the `gh-pages` branch.
4. Site will be live at `https://<your-user>.github.io/portfolio/`.

> `src/404.html` is published alongside `index.html` so that deep links (e.g. `/portfolio/en/projects/project-3`) survive a hard refresh.

## Structure

```
src/
  app/
    core/           # models + services (Portfolio, I18n, Theme)
    layout/         # header (lang + theme toggles), footer
    features/
      home/         # hero + about + projects grid
      about/        # CV / About-me section (edit i18n JSON)
      projects/     # list, card, detail
  assets/
    data/
      projects.json
      readmes/      # extracted project READMEs
    i18n/
      en.json
      es.json
  styles.scss       # CSS-var design tokens + light/dark
```

## Editing the About / CV section

Open `src/assets/i18n/en.json` and `src/assets/i18n/es.json` and edit the `about` block (education, experience, skills). Changes hot-reload.

## License

MIT
