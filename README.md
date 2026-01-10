# Sweet Dream Bakery for EverShop

This repository contains the Sweet Dream Bakery theme for [EverShop](https://evershop.io). It ships both the theme package (`themes/sweetdreambakery`) and a companion extension (`extensions/sweetdreambakery`).

## Prerequisites

- Node.js 18+ and npm
- EverShop CLI (installed via `npm install -g @evershop/evershop` or available through project scripts)
- An existing EverShop project where you will copy this theme and extension

## Quick Start

1) Install dependencies
```
npm install
```

2) Ensure workspaces are enabled (already set in this repo)
```
"workspaces": ["extensions/*", "themes/*"]
```

3) Copy assets into your project
- Copy `public/logo.png` and `public/our-story.jpg` into your target EverShop project `public/` directory.

4) Configure EverShop (`config/[env].json` in your project)
- Add the extension to `system.extensions`:
```
{
  "name": "sweetdreambakery_theme",
  "resolve": "extensions/sweetdreambakery",
  "enabled": true,
  "priority": 10
}
```
- Set the active theme:
```
"system": {
  "theme": "sweetdreambakery"
}
```
- Update `themeConfig.logo`:
```
"themeConfig": {
  "logo": {
    "alt": "Sweet Dream Bakery",
    "src": "/logo.png",
    "width": 182,
    "height": 48
  }
}
```

5) Install and seed EverShop (run in your project root)
```
npm run setup
npm run seed
```

6) Run the site
```
npm run dev
# or
npm run start
```

## Production Build

- Before starting in production, build the theme assets:
```
cd themes/sweetdreambakery
npm run build
```
- Then start EverShop in production mode from the project root.

## Admin Configuration

In the EverShop Admin UI, go to **Widget > Main menu** and set **Area** to `headerMiddleCenter` so the header navigation appears in the intended position.

## Notes

- The repo already declares the required npm scripts (`dev`, `start`, `build`, `setup`, `seed`) in `package.json`.
- Keep extension and theme paths unchanged to match the configuration examples above.
