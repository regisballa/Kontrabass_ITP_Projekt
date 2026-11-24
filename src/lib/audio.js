// Töne für die Website (Web Audio API).
//
// 1. Musik: J. S. Bach, Cellosuite Nr. 1 G-Dur, BWV 1007, Prélude.
//    Die Website spielt die Aufnahme aus dem Ordner static/audio/.
//    Fehlt die Datei, spielt der Browser eine selbst erzeugte Version (Takt 1 bis 4).
// 2. Saiten E, A, D, G: gezupfter Ton, live im Browser erzeugt.

import { asset } from '$app/paths';

const AUDIO_FILES = ['audio/bach-prelude.mp3', 'audio/bach-prelude.ogg'];

let ctx = null;
let master, analyser, recBus, synthBus, reverb;
let recording = null; // <audio>-Element mit der Aufnahme
let playing = false;
let fadeTimer = null;
const levelData = new Uint8Array(1024);

function setup() {
	if (ctx) {
		if (ctx.state === 'suspended') ctx.resume();
		return;
	}
	ctx = new AudioContext();
	master = ctx.createGain();
	// Kompressor: macht leise Töne lauter, ohne dass es kratzt
	const comp = ctx.createDynamicsCompressor();
	comp.threshold.value = -20;
	comp.ratio.value = 4;
	master.connect(comp).connect(ctx.destination);

	// misst die Lautstärke der Musik (für die Bogen-Bewegung)
	analyser = ctx.createAnalyser();
	analyser.fftSize = 1024;

	// kleiner Konzertsaal-Hall für die erzeugten Töne
	reverb = ctx.createConvolver();
	const len = ctx.sampleRate * 2.4;
	const ir = ctx.createBuffer(2, len, ctx.sampleRate);
	for (let ch = 0; ch < 2; ch++) {
		const d = ir.getChannelData(ch);
		for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
	}
	reverb.buffer = ir;
	const wet = ctx.createGain();
	wet.gain.value = 0.3;
	reverb.connect(wet).connect(master);

	recBus = ctx.createGain();
	recBus.gain.value = 0;
	recBus.connect(master);
	recBus.connect(analyser);

	synthBus = ctx.createGain();
	synthBus.gain.value = 0;
	synthBus.connect(master);
	synthBus.connect(reverb);
	synthBus.connect(analyser);
}

// ---------------------------------------------------------------- Aufnahme laden
// Gleich beim Start schauen, ob die Datei da ist (ohne Ton abzuspielen)
function tryLoad(url) {
	return new Promise((resolve) => {
		const el = new Audio();
		el.preload = 'auto';
		el.loop = true;
		el.addEventListener('loadedmetadata', () => resolve(el), { once: true });
		el.addEventListener('error', () => resolve(null), { once: true });
		el.src = asset(url);
	});
}

(async () => {
	for (const f of AUDIO_FILES) {
		const el = await tryLoad(f);
		if (el) {
			recording = el;
			return;
		}
	}
})();

let recConnected = false;