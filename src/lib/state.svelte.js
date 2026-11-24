// Gemeinsamer Zustand für die ganze Website (Svelte 5 Runes).
// Jede Komponente kann diese Werte lesen und ändern.
import { HOTSPOTS, VIEWS, EXPLODE_VIEW, START } from './data.js';

// Was der Kunde ausgewählt hat
export const config = $state({ ...START });

// Zustand der Oberfläche
export const ui = $state({
	loaded: false, // Bass geladen
	stageLoaded: false, // Bühne geladen
	view: 'gesamt',
	light: 'tag', // 'tag' oder 'kerze'
	hotspot: null, // id des offenen Hotspots
	pins: true,
	music: false,
	explode: false // Explosionsansicht an/aus
});

// Kamera-Ziel. Die Szene fliegt dorthin, sobald sich "stamp" ändert.
export const cam = $state({ position: VIEWS[0].position, target: VIEWS[0].target, stamp: 0 });

// Gezupfte Saite (für die kleine Schwing-Animation)
export const pluckState = $state({ node: null, stamp: 0 });

export function flyTo(position, target) {
	cam.position = position;
	cam.target = target;
	cam.stamp++;
}

// Auf schmalen Bildschirmen (Handy) geht die Kamera etwas weiter zurück
export function viewPosition(v) {
	const narrow = typeof window !== 'undefined' && window.innerWidth < 640;
	if (!narrow || v.id === 'steg' || v.id === 'schnecke') return v.position;
	return v.position.map((p, i) => v.target[i] + (p - v.target[i]) * 1.12);
}

export function showView(id) {
	const v = VIEWS.find((v) => v.id === id);
	ui.view = id;
	ui.hotspot = null;
	flyTo(viewPosition(v), v.target);
}

// Kamera für einen Hotspot berechnen: vor dem Punkt, etwas von oben und von der Seite
export function openHotspot(id) {
	const h = HOTSPOTS.find((h) => h.id === id);
	const [px, py, pz] = h.position;
	let [nx, ny, nz] = h.normal;
	const len = Math.hypot(nx, ny, nz);
	nx /= len;
	ny /= len;
	nz /= len;
	// Seitenrichtung = Kreuzprodukt aus "oben" und Normale
	const sx = nz,
		sz = -nx;
	const d = h.dist;
	const position = [px + nx * d - sx * d * 0.3, py + ny * d + d * 0.18, pz + nz * d - sz * d * 0.3];
	// Ziel leicht nach links verschieben, damit die Infokarte nichts verdeckt
	const target = [px - sx * d * 0.12, py, pz - sz * d * 0.12];
	ui.hotspot = id;
	ui.view = null;
	flyTo(position, target);
}

// Explosionsansicht an/aus. Die Kamera fliegt so weit weg, dass man alle Teile sieht.
export function toggleExplode() {
	ui.explode = !ui.explode;
	ui.hotspot = null;
	if (ui.explode) {
		ui.view = null;
		flyTo(EXPLODE_VIEW.position, EXPLODE_VIEW.target);
	} else {
		showView('gesamt');
	}
}

export function resetConfig() {
	Object.assign(config, START);
}