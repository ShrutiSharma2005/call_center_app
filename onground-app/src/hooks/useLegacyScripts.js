import { useEffect } from 'react';

/**
 * Boots the original app logic once the React markup is mounted.
 *
 * The page logic (public/legacy/*.js) is plain DOM code that finds elements by
 * id and edits them directly. It must run AFTER the markup exists, in the same
 * order as the original HTML:
 *   1. Chart.js (CDN)   2. onground-main.js   3. onground-staff.js
 * Then DOMContentLoaded is fired once, because the legacy scripts register
 * their startup code on that event.
 */
const CHART_JS = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js';

const loadScript = (src) =>
  new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = false;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Failed to load ' + src));
    document.body.appendChild(s);
  });

let booted = false; // guards React StrictMode's double effect run

export default function useLegacyScripts() {
  useEffect(() => {
    // original <body class="desktop" style="margin:0;background:#f5f5f5">
    document.body.classList.add('desktop');
    document.body.style.margin = '0';
    document.body.style.background = '#f5f5f5';

    if (booted) return;
    booted = true;

    (async () => {
      if (!window.Chart) await loadScript(CHART_JS);
      await loadScript('/legacy/onground-main.js');
      await loadScript('/legacy/onground-staff.js');
      document.dispatchEvent(new Event('DOMContentLoaded', { bubbles: true }));
    })().catch(console.error);
  }, []);
}
