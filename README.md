# 🌐 Personal Portfolio — moinulhasan.pro.bd

My personal portfolio website — a single-page React app showcasing my projects, skills, timeline, and contact info.

**Live:** [moinulhasan.pro.bd](https://moinulhasan.pro.bd) · Mirrors: GitHub Pages + Netlify

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

---

## ✨ Sections

One route (`/`), composed of:

- Navbar + Hero + Stats bar
- About, Services, Skills
- Projects, Timeline, Achievements, Blog
- Contact + 404 fallback (`NotFound`)

SEO-ready: canonical URL, Open Graph / Twitter cards, JSON-LD person schema, sitemap-friendly static output. Old domains (`mdmoinulhasan.pro.bd`, `moinulhasan.github.io`) redirect to the canonical domain via `index.html` / `404.html` scripts.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 · TypeScript 5 · Vite 5 |
| UI | Tailwind CSS 3 · shadcn/ui (Radix) · Framer Motion · Lucide Icons |
| Data/Forms | TanStack Query · React Hook Form + Zod · React Router 6 |
| Config | GitHub Pages (`CNAME`) + Netlify (`netlify.toml` SPA redirect) |

---

## ⚡ Getting Started

Prerequisites: Node.js 18+, npm.

```bash
git clone https://github.com/hellomoinul/hellomoinul.github.io.git
cd hellomoinul.github.io

npm install
npm run dev
```

Open http://localhost:5173.

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build → `dist/` |
| `npm run lint` | Run ESLint |
| `npm run preview` | Preview production build |

---

## 🚀 Deployment

- **GitHub Pages:** `CNAME` points to `moinulhasan.pro.bd`; any push to `main` serves `dist/` via Pages.
- **Netlify:** `netlify.toml` builds with `npm run build`, publishes `dist`, with `/* → /index.html` SPA redirect.

---

## 📁 Project Structure

```
src/
├── components/   # Navbar, HeroSection, SkillsSection, ProjectsSection, ...
├── pages/        # Index (home), NotFound
├── hooks/ lib/  # Helpers & utilities
├── assets/       # Images & static assets
index.html        # SEO head, redirects, root mount
CNAME             # Custom domain (GitHub Pages)
netlify.toml      # Netlify build + SPA redirects
404.html          # Domain redirect + SPA fallback
```

---

## 📄 License

Personal project — all rights reserved.
