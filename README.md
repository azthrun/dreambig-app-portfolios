## DreamBig Portfolio (Terry Chen)

Modern, accessible portfolio built with React, Vite, and Tailwind CSS. It showcases projects, experience, and education with smooth, keyboard-first navigation and dark mode.

### Features

- React 19 + Vite 7 + TypeScript
- Tailwind CSS v4 (class-based dark mode)
- Responsive layout and pagination
- Accessible navigation (skip link, focus-visible outlines, ARIA labels)
- Reduced motion support and proper section scroll offset
- SEO essentials: meta description, robots.txt, social tags

### Accessibility (A11y)

- Keyboard-first: skip link to main content, anchor-based section nav, clear focus styles
- Screen readers: landmarks, descriptive aria-labels, polite live region for pagination changes
- Reduced motion: animations disabled when prefers-reduced-motion is set

### Performance

- Third-party chat loaded on idle/first interaction to reduce unused JS and improve bfcache
- Inline SVG icons (no icon font)
- Long-term caching for static assets (Firebase Hosting headers)

### Getting started

1. Prerequisites: Node 18+ (LTS) and pnpm/npm/yarn
2. Install dependencies
   - npm install
3. Run dev server
   - npm run dev
4. Build for production
   - npm run build
5. Preview production build
   - npm run preview

### Scripts

- dev: start Vite dev server
- build: type-check and build
- preview: preview production build
- lint: run ESLint
- format / format:check: Prettier

### Deploy (Firebase Hosting)

This repo is configured for Firebase Hosting.

1. Build the app
   - npm run build
2. Deploy (requires Firebase CLI and project setup)
   - firebase deploy --only hosting

Headers in `firebase.json` set long-term caching for JS/CSS/images and no-cache for index.html.

### Project structure

- public/ — static assets (robots.txt, humans.txt)
- src/ — application code
  - components/ — UI components
  - context/ — Theme provider
  - data/ — portfolio content

### Customization

- Edit `src/data/portfolioData.ts` to update content
- Update meta tags in `index.html` (title/description/social)
- Adjust theme and styles in `src/index.css`

### License

This project is provided as-is for personal portfolio use.
