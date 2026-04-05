# A. Lohit — Developer Portfolio

A modern, accessible, and performant portfolio site showcasing software engineering work, open-source contributions, and creative projects.

**Live:** [aarushlohit.dev](https://aarushlohit.dev) (deploy your own fork to Vercel)

## About

Focused on scalable applications, developer tools, and accessibility. This portfolio highlights:

- **Shipping real software**: PyPI packages, mobile apps on Amazon Appstore, accessibility-focused prototypes
- **Clear problem-solving**: Python, Flutter, full-stack JavaScript—picking the right tool for each problem
- **Accessibility-first design**: Inclusive UX and architecture baked in from day one, not added later

## Featured Work

- **AarushLohit Git** — Python CLI package for Git workflow automation (100+ PyPI downloads)
- **Zairok** — Flutter app for AI tool discovery, live on Amazon Appstore
- **Assistive Computing Interface** — Prototype exploring voice and drawn-to-action control surfaces

## Tech Stack

**Frontend:**
- React 19
- Vite (build tool)
- Tailwind CSS 4
- Framer Motion (animations, respects `prefers-reduced-motion`)
- TypeScript-ready architecture

**Development:**
- ESLint for code quality
- Responsive design (mobile-first)
- Dark mode with system preference detection
- Smooth scroll spy for section navigation

**Deployment:**
- Vercel-optimized
- SPA rewrite for direct route navigation
- Zero cold starts on serverless functions

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` with HMR enabled.

### Build for Production

```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/`, ready for Vercel or any static host.

### Preview Build Locally

```bash
cd frontend
npm run preview
```

### Lint Code

```bash
cd frontend
npm run lint
```

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components (Navbar, ProjectCard, Section, etc.)
│   ├── context/             # Theme provider and dark mode state
│   ├── data/
│   │   └── content.js       # Portfolio content (site info, projects, skills)
│   ├── hooks/               # useScrollSpy, useTheme
│   ├── assets/              # Images and icons
│   ├── App.jsx              # Main app component
│   ├── index.css            # Tailwind + custom styles
│   └── main.jsx             # React entry point
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── vercel.json              # Vercel deployment config
├── eslint.config.js
├── package.json
└── tailwind.config.js       (if present)
```

## Content Customization

Edit `frontend/src/data/content.js` to update:

- Site metadata (name, title, social links)
- Projects and featured work
- Skills and categories
- Achievements and milestones
- Navigation links

Example:

```javascript
export const site = {
  name: 'Your Name',
  title: 'Your Title',
  tagline: 'Your tagline here',
  githubProfile: 'https://github.com/yourusername',
  email: 'your.email@example.com',
}
```

## Deployment

### Deploy to Vercel

1. Push this repository to GitHub/GitLab/Bitbucket
2. Import the repository in [Vercel](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Set **Build Command** to `npm run build`
5. Set **Output Directory** to `dist`
6. Deploy

The `frontend/vercel.json` config handles SPA rewrites automatically.

### Deploy Elsewhere

**Netlify:**
```bash
netlify.toml in frontend/:
[build]
  command = "npm run build"
  publish = "dist"
```

**GitHub Pages:**
```bash
cd frontend
npm run build
# Push dist/ to gh-pages branch
```

## Performance Notes

- Lazy-loaded animations (respects motion preferences)
- Optimized images in public assets
- CSS-in-JS minimized by Vite
- Gzip-compressed bundle (~106 KB JS, ~8 KB CSS)

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation throughout
- Dark mode support with system detection
- Reduced motion support for animations

## Browser Support

| Browser | Version |
| ------- | ------- |
| Chrome  | 90+     |
| Firefox | 88+     |
| Safari  | 14+     |
| Edge    | 90+     |

## Contributing

This is a personal portfolio, but feel free to fork and customize for your own use.

## License

MIT — feel free to use this template as a starting point for your own portfolio.

## Contact

- **GitHub:** [@AarushLohit](https://github.com/AarushLohit)
- **LinkedIn:** [aarush-lohit](https://in.linkedin.com/in/aarush-lohit-273877380)
- **Email:** aarushlohit.developer@gmail.com
