// Alle Daten für den Konfigurator an einem Ort.
// Positionen sind in Metern (1 Einheit = 1 m), wie in Blender.
// Three.js hat Y nach oben: Blender (x, y, z) wird hier zu (x, z, -y).

// ---------------------------------------------------------------- Kameras
export const VIEWS = [
	{ id: 'gesamt', label: 'Gesamt', position: [-1.3, 1.3, 3.15], target: [0.1, 1.05, 0] },
	{ id: 'vorne', label: 'Vorne', position: [0.05, 1.12, 3.45], target: [0.08, 1.08, 0] },
	{ id: 'seite', label: 'Seite', position: [3.45, 1.15, 0.25], target: [0, 1.08, 0] },
	{ id: 'ruecken', label: 'Rücken', position: [-1.2, 1.3, -3.2], target: [0, 1.08, 0] },
	{ id: 'steg', label: 'Steg', position: [-0.55, 1.13, 1.08], target: [0.03, 0.84, 0.17] },
	{ id: 'schnecke', label: 'Schnecke', position: [0.63, 2.05, 0.45], target: [0.0, 1.97, 0.02] }
];

// ---------------------------------------------------------------- Optionen
// Lack und Saitenhalter haben eine Holztextur aus Blender.
// color = Faktor, mit dem die Textur multipliziert wird ([1, 1, 1] = genau wie in Blender).
// Saiten und Mechanik haben keine Textur: color = lineare RGB-Farbe.
// swatch = Farbe für den Knopf auf der Website
export const LACK = [
	{
		id: 'walnuss',
		name: 'Nussbaum',
		note: 'Poliert, wie in Blender',
		color: [1, 1, 1],
		swatch: '#43291a'
	},
	{
		id: 'rotbraun',
		name: 'Rotbraun',
		note: 'Klassisch, wie in Cremona',
		color: [1.93, 0.97, 0.64],
		swatch: '#73381f'
	},
	{ id: 'honig', name: 'Honig', note: 'Hell und warm', color: [4.4, 4.1, 2.1], swatch: '#a8733b' },
	{
		id: 'dunkelbraun',
		name: 'Antik',
		note: 'Dunkel, wie 200 Jahre alt',
		color: [0.82, 0.66, 0.52],
		swatch: '#4c2e1b'
	},
	{
		id: 'schwarz',
		name: 'Schwarz',
		note: 'Schwarzer Klavierlack',
		color: [0.12, 0.2, 0.36],
		swatch: '#1a1715'
	}
];

export const GARNITUR = [
	{ id: 'nussbaum', name: 'Nussbaum', color: [1, 1, 1], swatch: '#69462b' },
	{ id: 'palisander', name: 'Palisander', color: [0.67, 0.45, 0.39], swatch: '#6f4027' },
	{ id: 'ebenholz', name: 'Ebenholz', color: [0.05, 0.08, 0.17], swatch: '#1b1917' },
	{ id: 'buchsbaum', name: 'Buchsbaum', color: [1.85, 2.26, 1.71], swatch: '#b18c54' }
];

export const SAITEN = [
	{ id: 'gold', name: 'Gold', color: [0.9, 0.64, 0.28], metal: 1, rough: 0.22, swatch: '#f2d191' },
	{
		id: 'kupfer',
		name: 'Kupfer',
		color: [0.8, 0.42, 0.22],
		metal: 1,
		rough: 0.28,
		swatch: '#e7ad81'
	},
	{ id: 'stahl', name: 'Stahl', color: [0.8, 0.8, 0.82], metal: 1, rough: 0.25, swatch: '#e7e7ea' },
	{ id: 'darm', name: 'Darm', color: [0.72, 0.55, 0.32], metal: 0, rough: 0.45, swatch: '#ddc499' }
];

export const MECHANIK = [
	{ id: 'altgold', name: 'Altgold', color: [0.467, 0.298, 0.034], swatch: '#b5953a' },
	{ id: 'messing', name: 'Messing', color: [0.92, 0.68, 0.3], swatch: '#f6d795' },
	{ id: 'nickel', name: 'Nickel', color: [0.78, 0.78, 0.76], swatch: '#e5e5e2' },
	{ id: 'schwarz', name: 'Schwarz', color: [0.03, 0.03, 0.035], swatch: '#303035' }
];

// So sieht der Bass am Anfang aus (genau wie in Blender)
export const START = {
	form: 0,
	lack: 'walnuss',
	garnitur: 'nussbaum',
	saiten: 'gold',
	mechanik: 'altgold',
	bogen: true
};

// Umrisse für die zwei Korpusformen (aus dem Blender-Modell berechnet)
export const FORM_ICON = {
	violin:
		'M35.0 112.0 L39.1 111.8 L43.2 111.3 L47.3 110.3 L51.2 108.9 L54.9 107.1 L58.3 104.7 L61.4 102.0 L63.9 98.7 L65.9 95.1 L67.3 91.2 L67.9 87.1 L67.9 82.9 L67.5 78.7 L66.6 74.5 L65.5 70.4 L64.5 66.3 L62.3 64.4 L58.8 62.3 L56.2 59.0 L54.8 55.1 L54.6 50.9 L55.0 46.7 L56.0 42.7 L59.0 40.2 L60.4 37.2 L60.9 33.0 L61.1 28.8 L61.2 24.5 L60.8 20.4 L59.7 16.4 L57.8 12.8 L55.3 9.5 L52.3 6.8 L48.8 4.5 L45.1 2.8 L41.1 1.7 L37.1 1.1 L32.9 1.1 L28.9 1.7 L24.9 2.8 L21.2 4.5 L17.7 6.8 L14.7 9.5 L12.2 12.8 L10.3 16.4 L9.2 20.4 L8.8 24.5 L8.9 28.8 L9.1 33.0 L9.6 37.2 L11.0 40.2 L14.0 42.7 L15.0 46.7 L15.4 50.9 L15.2 55.1 L13.8 59.0 L11.2 62.3 L7.7 64.4 L5.5 66.3 L4.5 70.4 L3.4 74.5 L2.5 78.7 L2.1 82.9 L2.1 87.1 L2.7 91.2 L4.1 95.1 L6.1 98.7 L8.6 102.0 L11.7 104.7 L15.1 107.1 L18.8 108.9 L22.7 110.3 L26.8 111.3 L30.9 111.8 Z',
	gamba:
		'M35.0 112.0 L39.1 111.8 L43.2 111.3 L47.3 110.3 L51.2 108.9 L54.9 107.1 L58.3 104.7 L61.4 102.0 L63.9 98.7 L65.9 95.1 L67.3 91.2 L67.9 87.1 L68.0 83.0 L67.8 79.1 L67.4 75.1 L66.7 71.2 L65.7 67.4 L64.1 63.8 L61.7 60.8 L59.2 57.8 L57.4 54.4 L57.2 51.0 L57.4 48.1 L57.7 45.1 L58.3 42.2 L58.8 39.6 L59.1 37.1 L59.2 34.5 L59.0 32.0 L58.0 27.8 L56.5 23.7 L54.6 19.8 L52.5 16.0 L50.2 12.3 L47.5 8.9 L44.5 5.7 L41.1 3.0 L37.2 1.2 L32.8 1.2 L28.9 3.0 L25.5 5.7 L22.5 8.9 L19.8 12.3 L17.5 16.0 L15.4 19.8 L13.5 23.7 L12.0 27.8 L11.0 32.0 L10.8 34.5 L10.9 37.1 L11.2 39.6 L11.7 42.2 L12.3 45.1 L12.6 48.1 L12.8 51.0 L12.6 54.4 L10.8 57.8 L8.3 60.8 L5.9 63.8 L4.3 67.4 L3.3 71.2 L2.6 75.1 L2.2 79.1 L2.0 83.0 L2.1 87.1 L2.7 91.2 L4.1 95.1 L6.1 98.7 L8.6 102.0 L11.7 104.7 L15.1 107.1 L18.8 108.9 L22.7 110.3 L26.8 111.3 L30.9 111.8 Z'
};