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


// ---------------------------------------------------------------- Musik an/aus
export function setMusic(on) {
	setup();
	playing = on;
	clearTimeout(fadeTimer);
	const rec = recording;
	if (rec && !recConnected) {
		ctx.createMediaElementSource(rec).connect(recBus);
		recConnected = true;
	}
	const bus = rec ? recBus : synthBus;
	const t = ctx.currentTime;
	bus.gain.cancelScheduledValues(t);
	bus.gain.setValueAtTime(bus.gain.value, t);
	if (on) {
		if (rec) rec.play();
		else startSynth();
		bus.gain.linearRampToValueAtTime(1, t + 1.0);
	} else {
		bus.gain.linearRampToValueAtTime(0, t + 0.8);
		fadeTimer = setTimeout(() => {
			if (playing) return;
			if (rec) rec.pause();
			else stopSynth();
		}, 900);
	}
}

// Lautstärke der Musik von 0 bis 1
export function getLevel() {
	if (!analyser) return 0;
	analyser.getByteTimeDomainData(levelData);
	let sum = 0;
	for (let i = 0; i < levelData.length; i++) {
		const v = (levelData[i] - 128) / 128;
		sum += v * v;
	}
	return Math.min(1, Math.sqrt(sum / levelData.length) * 4);
}

export function hasRecording() {
	return !!recording;
}

// ---------------------------------------------------------------- Saiten zupfen
// Karplus-Strong: Rauschen in einer kurzen Schleife wird zu einem Saitenton
const pluckCache = new Map();
export function pluck(freq) {
	setup();
	let buf = pluckCache.get(freq);
	if (!buf) {
		const sr = ctx.sampleRate;
		const n = Math.floor(sr * 3.5);
		buf = ctx.createBuffer(1, n, sr);
		const out = buf.getChannelData(0);
		const N = Math.round(sr / freq);
		const line = new Float32Array(N);
		for (let i = 0; i < N; i++) line[i] = Math.random() * 2 - 1;
		let idx = 0;
		for (let i = 0; i < n; i++) {
			const a = line[idx];
			const b = line[(idx + 1) % N];
			line[idx] = (a + b) * 0.5 * 0.9988;
			out[i] = a;
			idx = (idx + 1) % N;
		}
		pluckCache.set(freq, buf);
	}
	const src = ctx.createBufferSource();
	src.buffer = buf;
	// Resonanz vom Holzkorpus
	const body = ctx.createBiquadFilter();
	body.type = 'peaking';
	body.frequency.value = 110;
	body.gain.value = 7;
	const soft = ctx.createBiquadFilter();
	soft.type = 'lowpass';
	soft.frequency.value = 1600;
	const g = ctx.createGain();
	g.gain.value = 0.6;
	src.connect(body).connect(soft).connect(g);
	g.connect(master);
	g.connect(reverb);
	src.start();
}