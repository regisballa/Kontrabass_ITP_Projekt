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

// ---------------------------------------------------------------- Hotspots
// position = Punkt auf dem Modell, normal = Richtung nach aussen
// dist = Abstand der Kamera beim Heranzoomen
export const HOTSPOTS = [
	{
		id: 'schnecke',
		title: 'Die Schnecke',
		dist: 0.55,
		position: [0.0233, 2.0397, -0.0258],
		normal: [0.75, 0, 0.66],
		text: 'Die Schnecke ist das Markenzeichen jedes Streichinstruments. Sie dreht sich 2,3 Mal nach innen und ist aus einem Stück Holz geschnitzt. Für den Klang ist sie nicht wichtig. Sie zeigt das Können des Geigenbauers.',
		facts: ['Nussbaum', '2,3 Windungen']
	},
	{
		id: 'mechanik',
		title: 'Die Mechanik',
		dist: 0.6,
		position: [0.0535, 1.8746, 0.0374],
		normal: [1, 0, 0.2],
		text: 'Ein Kontrabass hat keine Holzwirbel, sondern eine Mechanik aus Metall. Ein kleines Zahnrad übersetzt jede Drehung am Flügel ganz fein. So bleiben die dicken Saiten gut gestimmt.',
		facts: ['4 Zahnräder', 'Schneckengetriebe']
	},
	{
		id: 'griffbrett',
		title: 'Griffbrett und Saiten',
		dist: 0.75,
		position: [0.0317, 1.1664, 0.2012],
		normal: [0.2778, 0.157, 0.9477],
		text: 'Das Griffbrett aus Ebenholz ist 86 cm lang und hat keine Bünde. Die vier Saiten sind E, A, D und G. Tippe auf eine Saite und hör sie dir an.',
		facts: ['Ebenholz', 'Mensur 105 cm'],
		strings: true
	},
	{
		id: 'steg',
		title: 'Der Steg',
		dist: 0.6,
		position: [0.0262, 0.825, 0.271],
		normal: [0.1987, 0, 0.9801],
		text: 'Der Steg trägt den Druck der Saiten und leitet ihre Schwingung in die Decke. Bei diesem Bass glänzt er golden. Mit den zwei Rädern stellt man die Höhe ein. Das Herz in der Mitte macht den Steg leichter.',
		facts: ['Goldfarben', '13,5 cm hoch']
	},
	{
		id: 'floch',
		title: 'Die f-Löcher',
		dist: 0.65,
		position: [-0.1652, 0.7505, 0.1261],
		normal: [-0.0303, 0.0765, 0.9966],
		text: 'Durch die zwei f-Löcher kommt der Klang aus dem Korpus. Die kleinen Kerben in der Mitte zeigen, wo der Steg stehen muss. Die Decke darum ist leicht gewölbt.',
		facts: ['Gewölbte Decke', '2,8 cm Wölbung']
	},
	{
		id: 'saitenhalter',
		title: 'Der Saitenhalter',
		dist: 0.7,
		position: [-0.0002, 0.487, 0.1608],
		normal: [-0.0326, -0.125, 0.9916],
		text: 'Der Saitenhalter hält die Saiten am unteren Ende. Er hängt an einem Seil, das um den Stachel läuft. Im Konfigurator kannst du das Holz auswählen.',
		facts: ['32 cm lang', 'Holz wählbar']
	},
	{
		id: 'stachel',
		title: 'Der Stachel',
		dist: 0.75,
		position: [0.0012, 0.16, 0.0109],
		normal: [0.1951, 0, 0.9808],
		text: 'Auf dem Stachel steht der ganze Bass. Man kann ihn herausziehen und so die Höhe an den Spieler anpassen. Die Gummispitze verhindert, dass er rutscht.',
		facts: ['Stahl', '29 cm']
	},
	{
		id: 'boden',
		title: 'Der Boden',
		dist: 1.2,
		position: [-0.12, 0.65, -0.1149],
		normal: [-0.002, -0, -1],
		text: 'Der Boden ist flach und oben schräg abgeknickt. Das ist typisch für den Kontrabass. Er ist aus poliertem Nussbaumholz, wie der ganze Korpus.',
		facts: ['Nussbaum', 'Flacher Boden']
	}
];

// Leere Saiten des Kontrabasses (Frequenz in Hz)
export const STRINGS = [
	{ name: 'E', node: 'Saite_E', freq: 41.2 },
	{ name: 'A', node: 'Saite_A', freq: 55.0 },
	{ name: 'D', node: 'Saite_D', freq: 73.42 },
	{ name: 'G', node: 'Saite_G', freq: 98.0 }
];

export const SPECS = [
	['Größe', '3/4 (Orchester-Standard)'],
	['Korpuslänge', '111 cm'],
	['Mensur', '105 cm'],
	['Gesamthöhe', 'ca. 2,1 m mit Stachel'],
	['Holz', 'Nussbaum, poliert'],
	['Griffbrett', 'Ebenholz, 86 cm'],
	['Steg', 'Goldfarben, mit Höhenverstellern'],
	['Mechanik', '4 Schneckengetriebe, Altgold'],
	['3D-Modell', 'ca. 93.000 Dreiecke']
];


// Bogen: Ruheplatz und Spielposition auf den Saiten (aus Blender berechnet)
// rest/play = Mittelpunkt des Bogens, quat = Drehung beim Spielen, dir = Richtung entlang des Bogens
export const BOW = {
	rest: [0.6, 1.02, 0.14],
	play: [0.0502, 0.9119, 0.2671],
	quat: [0.5717, 0.21963, -0.47483, 0.63203],
	dir: [0.9988, -0.0499, 0.0],
	stroke: 0.16, // halbe Strichlänge in Metern
	period: 3.1 // Sekunden für einmal Abstrich und Aufstrich
};

// Explosionsansicht: wohin jedes Teil fliegt (in Metern: x = rechts, y = oben, z = vorne)
export const EXPLODE = {
	Korpus: [0, 0, 0],
	Griffbrett: [0, 0.04, 0.28],
	Sattel: [0, 0.1, 0.3],
	Hals: [0, 0.12, -0.15],
	Wirbelkasten: [0, 0.22, -0.15],
	Schnecke: [0, 0.3, -0.15],
	Mechanik: [0.25, 0.22, -0.1],
	Steg: [0, 0, 0.38],
	Steg_Einsteller: [0, 0.04, 0.38],
	Saitenhalter: [0, -0.04, 0.5],
	Saitenhalterseil: [0, -0.1, 0.45],
	Untersattel: [0, -0.1, 0.3],
	Saite_E: [0, 0.02, 0.6],
	Saite_A: [0, 0.02, 0.6],
	Saite_D: [0, 0.02, 0.6],
	Saite_G: [0, 0.02, 0.6],
	Stachel: [0, -0.12, 0]
};
export const EXPLODE_LIFT = 0.12; // alles schwebt etwas nach oben, nur der Stachel bleibt am Boden
export const EXPLODE_VIEW = { position: [-1.87, 1.5, 3.18], target: [0.05, 1.25, 0.2] };

// ---------------------------------------------------------------- Renderings
// Bilder liegen in static/images (aus Blender, 1280 x 1600 Pixel)
export const RENDERINGS = [
	{
		file: 'render_vorne.jpg',
		title: 'Gesamtansicht von vorne',
		alt: 'Der Kontrabass von vorne vor dem roten Vorhang'
	},
	{
		file: 'render_buehne.jpg',
		title: 'Gesamtansicht auf der Bühne',
		alt: 'Der Kontrabass mit Bogen auf dem Parkett der Bühne'
	},
	{
		file: 'render_oben.jpg',
		title: 'Andere Perspektive: von oben',
		alt: 'Der Kontrabass schräg von oben gesehen'
	},
	{
		file: 'render_detail_steg.jpg',
		title: 'Detail: Steg und Saiten',
		alt: 'Nahaufnahme vom goldenen Steg, dem f-Loch und den Saiten'
	},
	{
		file: 'render_detail_saitenhalter.jpg',
		title: 'Detail: f-Loch und Saitenhalter',
		alt: 'Nahaufnahme vom unteren Korpus mit f-Loch und Saitenhalter'
	}
];