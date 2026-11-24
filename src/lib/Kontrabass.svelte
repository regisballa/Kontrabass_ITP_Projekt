<script>
	// Lädt das Blender-Modell (.glb) und setzt die gewählten Optionen um.
	import { asset } from '$app/paths';
	import { T, useTask } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import { Color, Group, Quaternion, Vector3 } from 'three';
	import { config, ui, pluckState } from './state.svelte.js';
	import { LACK, GARNITUR, SAITEN, MECHANIK, BOW, EXPLODE, EXPLODE_LIFT } from './data.js';
	import { getLevel } from './audio.js';

	const gltf = useGltf(asset('models/kontrabass.glb'));

	let morphMeshes = [];
	let mats = null;
	let bogen = $state.raw(null); // $state, damit der Schalter "Bogen" es merkt, sobald der Bogen geladen ist
	let bowDrop = 0; // kleine Animation, wenn der Bogen wieder erscheint

	// Der Bogen hängt an einem "Drehpunkt" in seiner Mitte.
	// So kann er zu den Saiten fliegen und dort hin und her streichen.
	const pivot = new Group();
	const restPos = new Vector3(...BOW.rest);
	const playPos = new Vector3(...BOW.play);
	const bowDir = new Vector3(...BOW.dir);
	const noTurn = new Quaternion();
	const playTurn = new Quaternion(...BOW.quat);
	let play = 0; // 0 = Ruheplatz, 1 = auf den Saiten
	let phase = 0; // Fortschritt der Strichbewegung
	let level = 0; // Lautstärke der Musik (geglättet)
	let strings = [];

	// Explosionsansicht: jedes Teil merkt sich seinen Platz (base) und seinen Weg (off)
	let parts = [];
	let explode = 0; // 0 = zusammen, 1 = auseinander
	let form = 0;
	let vib = { node: null, t: 0 };
	const tmp = new Color();

	// Einmal nach dem Laden: Meshes mit dem Morph Target "Gambenform" suchen
	$effect(() => {
		if (!$gltf) return;
		morphMeshes = [];
		$gltf.scene.traverse((o) => {
			if (o.isMesh) o.castShadow = true;
			if (o.isMesh && o.morphTargetDictionary && 'Gambenform' in o.morphTargetDictionary) {
				morphMeshes.push(o);
			}
		});
		mats = $gltf.materials;
		// Innen im Korpus soll es dunkel sein, dann sehen die f-Löcher wie echte Löcher aus
		if (mats.Innen) {
			mats.Innen.color.setRGB(0.003, 0.002, 0.0015);
			mats.Innen.envMapIntensity = 0;
		}
		// Goldteile spiegeln die Umgebung stärker, damit sie wie in Blender glänzen
		for (const name of ['Steg', 'Messing', 'Saiten']) {
			if (mats[name]) mats[name].envMapIntensity = 3;
		}
		if (mats.Steg) {
			mats.Steg.color.setRGB(0.85, 0.56, 0.2); // sattes Gold
			mats.Steg.metalness = 0.6; // etwas weniger Metall: das warme Bühnenlicht macht ihn golden
			mats.Steg.roughness = 0.35;
		}
		bogen = $gltf.nodes.Bogen;
		pivot.position.copy(restPos);
		bogen.position.copy(restPos).negate();
		pivot.add(bogen);
		$gltf.scene.add(pivot);
		strings = ['Saite_A', 'Saite_D'].map((n) => $gltf.nodes[n]);
		parts = Object.entries(EXPLODE).map(([name, off]) => {
			const node = $gltf.nodes[name];
			return { node, base: node.position.clone(), off };
		});
		ui.loaded = true;
	});

	// Bogen ein- und ausblenden
	$effect(() => {
		const zeigen = config.bogen; // zuerst lesen, dann reagiert der Effekt immer auf den Schalter
		if (!bogen) return;
		if (zeigen && !bogen.visible) bowDrop = 1;
		bogen.visible = zeigen;
	});

	// Saite zupfen -> Saite schwingt kurz
	$effect(() => {
		if (!pluckState.stamp || !$gltf) return;
		vib = { node: $gltf.nodes[pluckState.node], t: 0 };
	});

	// weiche Übergänge: jeden Frame ein Stück näher an den Zielwert
	function ease(mat, rgb, k) {
		if (mat) mat.color.lerp(tmp.setRGB(rgb[0], rgb[1], rgb[2]), k);
	}