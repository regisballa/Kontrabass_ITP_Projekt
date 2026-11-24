// 3D, Musik und Kamera laufen nur im Browser, darum kein Server-Rendering.
// prerender: beim Bauen entsteht eine fertige index.html für GitHub Pages.
export const ssr = false;
export const prerender = true;