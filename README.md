# Personal Portfolio Website

A fast, lightweight, single-page personal portfolio website built with **React**, **TypeScript**, and **Tailwind CSS**.

## ✨ Design & Architecture Highlights
- **Palette**: Clean white background (`#FFFFFF`), dark slate text (`#0F172A`), subtle light-gray borders (`#E2E8F0`), and a blue accent (`#2563EB`).
- **Layout**: Single-column centered container (`max-width: 900px`), optimized for mobile and desktop readability.
- **Zero Heavy Dependencies**: Uses standard CSS transitions and crisp inline SVGs. No heavy icon or animation libraries.
- **Easily Configurable**: All personal details, projects, and skills are stored in a single, well-documented file: [`src/data.ts`](file:///c:/Users/acer/Documents/faheem%20soban/src/data.ts).

## 📁 File Structure
```text
faheem soban/
├── src/
│   ├── App.tsx          # Single-page portfolio application
│   ├── data.ts         # Profile details, projects, skills, and links
│   ├── index.css        # Tailwind directives and base typography
│   └── main.tsx         # React root mounting
├── index.html           # HTML entry point with Inter font & meta tags
├── tailwind.config.js   # Tailwind theme customizations (colors & container)
├── tsconfig.json        # TypeScript configuration
├── package.json         # Scripts and dependencies
└── vite.config.ts       # Vite bundler configuration
```

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Build for Production
```bash
npm run build
```
This produces an ultra-fast, optimized production build in the `dist/` directory.

### 3. Customize Your Information
Open [`src/data.ts`](file:///c:/Users/acer/Documents/faheem%20soban/src/data.ts) to update:
- Your name, role, location, headline, bio, and email
- Project titles, descriptions, tags, and links
- About paragraph and categorized skills
- GitHub, LinkedIn, and social media links
