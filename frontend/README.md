# Microsoft Portfolio

Portfolio site built with React + Vite and optimized for deployment on Vercel.

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - create production build in `dist/`
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint

## Vercel-Friendly Structure

```text
.
|-- public/
|   |-- favicon.svg
|   `-- icons.svg
|-- src/
|   |-- assets/
|   |-- components/
|   |-- context/
|   |-- data/
|   |   `-- content.js
|   |-- hooks/
|   |-- App.jsx
|   |-- index.css
|   `-- main.jsx
|-- index.html
|-- vercel.json
|-- vite.config.js
`-- package.json
```

## Vercel Deployment Notes

- Framework: `Vite`
- Build command: `npm run build`
- Output directory: `dist`
- SPA rewrite is configured in `vercel.json` so direct route refreshes resolve to `index.html`

Deploy by importing the repository in Vercel. The included `vercel.json` is already configured for this project.
