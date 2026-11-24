# Facteur de bonheur — landing page

Version statique de la page d'accueil de l'application (`frontend/src/app/page.tsx`), état
« inscriptions fermées » (boutons « Bientôt disponible »).

- `index.html` : la page (HTML rendu par l'application).
- `assets/styles.css` : Tailwind compilé (versionné, aucun build nécessaire au déploiement).
- `assets/site.js` : carrousel des cartes et flèches des occasions.
- `src/input.css` : source Tailwind (tokens repris de `globals.css`).

## Déployer sur Vercel

Importer le dossier (ou `npx vercel`) : `vercel.json` désactive l'installation et le build,
les fichiers sont servis tels quels.

## Modifier les styles

```bash
npm install
npm run build:css
```

## Voir en local

```bash
npm run dev
```
