# On-Ground.ai — Call Centre App (React)

React version of `OnGround_CallCentre_App_Mock.html` (Retail · Web · Advisor App v9).
The UI is identical to the original HTML: same markup, same CSS, same behaviour.

## Project structure

```
onground-app/
├── public/
│   └── legacy/
│       ├── onground-main.js     # original app logic (unchanged)
│       └── onground-staff.js    # original "staff" logic (unchanged)
└── src/
    ├── App.jsx                  # all markup converted to JSX + script loader
    ├── App.css                  # original CSS (unchanged) + Inter font import
    ├── tabler-icons.css         # self-hosted Tabler Icons 3.46.0 font (unchanged)
    └── main.jsx                 # Vite entry point
```

## Requirements

- Node.js 18 or newer
- npm
- Internet connection (Chart.js and the Inter font load from CDNs)

## Setup

```bash
# 1. Create a Vite + React project
npm create vite@latest onground-app -- --template react
cd onground-app
npm install
```

2. Copy the converted files into the project:
   - `src/App.jsx`, `src/App.css`, `src/tabler-icons.css` → replace/add in `src/`
   - `public/legacy/` folder → copy into `public/`

3. Open `src/main.jsx` and **remove** the line:

   ```js
   import './index.css'
   ```

   Vite's default `index.css` centers the body and will break the layout.
   `main.jsx` should look like this:

   ```jsx
   import { StrictMode } from 'react'
   import { createRoot } from 'react-dom/client'
   import App from './App.jsx'

   createRoot(document.getElementById('root')).render(
     <StrictMode>
       <App />
     </StrictMode>,
   )
   ```

## Run

```bash
cd onground-app
npm run dev
```

Open the URL printed in the terminal (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## How it works

- `App.jsx` renders the full original markup as JSX. Inline styles are style
  objects; inline handlers (`onclick="openX(this)"`) are React handlers wrapped
  by a small `on()` helper so `this` still points to the clicked element.
- After the markup is mounted, `App.jsx` loads, in order:
  1. Chart.js 4.4.0 (cdnjs)
  2. `/legacy/onground-main.js`
  3. `/legacy/onground-staff.js`

  It then fires `DOMContentLoaded` once, because the original scripts register
  startup code on that event.
- The original logic updates the page directly through the DOM (by element ID),
  so the component is intentionally static and does not re-render.
- A guard prevents the scripts from loading twice under React StrictMode.

## Troubleshooting

| Problem | Fix |
|---|---|
| `ENOENT ... package.json` | You are in the wrong folder. Run `cd onground-app` first. |
| Layout looks shifted or centered | Remove `import './index.css'` from `src/main.jsx`. |
| Icons missing | Check `src/tabler-icons.css` exists and is imported at the top of `App.jsx`. |
| Buttons do nothing | Open the browser console (F12). A 404 on `/legacy/onground-main.js` means `public/legacy/` is in the wrong place. |
| Charts missing | Chart.js loads from a CDN; check your internet connection. |
| `EBUSY` file watcher errors (Windows) | Usually harmless (sync or antivirus locking files). If they persist, move the project out of Desktop/OneDrive, e.g. `C:\dev\onground-app`. |

## Notes

- The scripts load from `/legacy/...`, so serve the app from the site root.
- To bundle Chart.js instead of using the CDN: `npm i chart.js`, then set
  `window.Chart` before loading the legacy scripts.
- Possible next step: convert screens one by one into real React components
  with state, replacing the matching DOM-based code in `public/legacy/`.
