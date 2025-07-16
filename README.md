
# Company List Demo

## 🧭 Project Overview

A modern, mobile-responsive company showcase platform, built using a **frontend-backend split architecture** powered by **Next.js 15.4.1 (App Router)**, **TypeScript**, **Chakra UI**, and **Tailwind CSS**.


---

## 📁 Project Structure

```
frontend/
  app/                # Next.js App Router directory: pages, layouts, API routes
  components/         # Reusable UI components (cards, tables, header, etc.)
  lib/                # API utilities and data helpers
  public/             # Static assets (logos, SVGs, scripts)
  styles/             # Global styles and theme config
  ...
```

---

## 🚀 Key Features

* **Mock API Integration**: All company data is served from a local API (`app/api/companies/route.ts`) for clean separation of concerns.
* **Fully Responsive**: Mobile-first design, works beautifully across phone, tablet, and desktop.
* **Dark Mode Support**: Users can toggle between light and dark modes with Chakra UI’s useColorMode, preserving theme preference.
* **Logo Preloading + Fallbacks**: Company logos support preload and auto-fallback if load fails.
* **Animated Buttons**: A snappy `AnimatedButton` component with elastic hover/tap effects.
* **Custom Cursor**: Adds an interactive `cursor-dot` for a playful touch.
* **Frosted Glass Header**: Sticky glassmorphism top nav enhances clarity and polish.
* **Modal via URL**: Open a company detail modal directly via query param (`/?company=openai`), useful for sharing.
* **Filtering**: Filter companies by focus areas (e.g. AI, Fintech) with smooth UI.
* **Card + Table Views**: Toggle between card grid and data table with a single click.
* **SSR for First Render**: Homepage is server-rendered for speed and SEO.
* **Lazy Image Loading**: All images are lazy-loaded, with fallbacks on failure.
* **Accessibility (a11y)**: Full keyboard navigation, semantic ARIA tags, alt text for all images.
* **Vercel Ready**: One-click deployment with automatic builds and previews.

---

## 🔧 Technical Highlights

* Next.js 13 App Router with hybrid SSR + CSR rendering
* Full TypeScript setup with strict types
* Chakra UI + Tailwind CSS combo for flexibility + beauty
* Smooth animations with Framer Motion & Chakra transitions
* Mobile-first responsive layouts
* Clean folder structure, scalable architecture

---

## ⚙️ Getting Started

```bash
# Install dependencies
npm install

# Start local development
npm run dev

# Build for production
npm run build
npm start
```

---

## ☁️ Deploy to Vercel


```bash
npm i -g vercel
vercel --prod
```

---

## ♿ Accessibility & Interaction

* **Keyboard Friendly**: Tab/Enter/Space support for all interactive elements
* **Semantic ARIA Labels**: All buttons, modals, and links are labeled for screen readers
* **Descriptive Links**: Clear link text to improve readability
* **Images**: All images include `alt` tags and handle fallback scenarios gracefully

---

## 🧩 Main Pages & Components

* `app/page.tsx`: Homepage with SSR, view toggle, filtering, modal sync
* `components/CompanyCard.tsx`: Responsive card with animation and a11y
* `components/CompanyTable.tsx`: Table view with keyboard support
* `components/CompanyDetail.tsx`: Modal with synced URL routing
* `components/FilterPanel.tsx`: Focus area filters
* `components/AnimatedButton.tsx`: Custom button with feedback
* `components/SiteHeader.tsx`: Frosted sticky header
* `public/cursor-dot.js`: Custom cursor effect

---

## 📌 Additional Notes

* Multi-language support is easily extendable
* Prettier configured for consistent code style
* Built with best practices in DX (Developer Experience) and UX

---

## ✅ Potential Improvements & Suggestions

Here are a few ways you can take this even further:

| Area                          | Suggestion                                                                      |
| ----------------------------- | ------------------------------------------------------------------------------- |
| **Pagination / Virtual List** | For large datasets, use virtualization (e.g. `react-virtual`)                   |
| **Search Function**           | Add fuzzy search with debounce (e.g. `fuse.js`)                                 |
| **Animations**                | Add entry animations with `framer-motion` for modals and cards                  |
| **Unit Testing**              | Add basic component tests using `Jest` + `Testing Library`                      |
| **CMS Integration**           | Simulate dynamic company data from e.g. `Notion`, `Sanity`, or mock JSON server |
| **Company Comparison View**   | Allow multi-card selection and side-by-side comparison                          |
| **Analytics Event Log**       | Log modal views or filters applied to simulate real-world usage insights        |
| **Performance Tweak**         | Use `next/image` for automatic image optimization and CDN caching               |

---

> If I had more time, I would integrate this with a real backend or CMS and add animations to onboarding flows to simulate a full SaaS experience.
