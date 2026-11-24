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

	useTask((delta) => {
		if (!mats) return;
		const k = 1 - Math.exp(-delta * 6);

		form += (config.form - form) * k;
		for (const m of morphMeshes) m.morphTargetInfluences[m.morphTargetDictionary.Gambenform] = form;

		ease(mats.Lack, LACK.find((o) => o.id === config.lack).color, k);
		ease(mats.Garnitur, GARNITUR.find((o) => o.id === config.garnitur).color, k);
		ease(mats.Messing, MECHANIK.find((o) => o.id === config.mechanik).color, k);
		const s = SAITEN.find((o) => o.id === config.saiten);
		ease(mats.Saiten, s.color, k);
		if (mats.Saiten) {
			mats.Saiten.metalness += (s.metal - mats.Saiten.metalness) * k;
			mats.Saiten.roughness += (s.rough - mats.Saiten.roughness) * k;
		}

		// Explosionsansicht: Teile langsam auseinander oder zusammen bewegen
		explode += ((ui.explode ? 1 : 0) - explode) * (1 - Math.exp(-delta * 2.5));
		const ex = explode * explode * (3 - 2 * explode); // weich starten und bremsen
		for (const p of parts) {
			p.node.position.set(
				p.base.x + p.off[0] * ex,
				p.base.y + (p.off[1] + EXPLODE_LIFT) * ex,
				p.base.z + p.off[2] * ex
			);
		}

		// Bogen: zu den Saiten fliegen, wenn Musik spielt, und streichen
		if (bogen) {
			bowDrop += (0 - bowDrop) * (1 - Math.exp(-delta * 4));
			const goal = ui.music ? 1 : 0;
			play += Math.sign(goal - play) * Math.min(Math.abs(goal - play), delta / 1.6);
			const e = play < 0.5 ? 4 * play ** 3 : 1 - (-2 * play + 2) ** 3 / 2; // weich starten und bremsen

			level += (getLevel() - level) * (1 - Math.exp(-delta * 5));
			phase += (delta / BOW.period) * (0.7 + 0.8 * level);
			// Dreieckswelle: gleichmäßiger Strich, kurze Umkehr (Abstrich, Aufstrich)
			const tri = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * phase));
			const stroke = BOW.stroke * tri * e;

			pivot.position.lerpVectors(restPos, playPos, e);
			pivot.position.z += 0.3 * Math.sin(Math.PI * e); // Bogen fliegt vorne herum, nicht durch den Bass
			pivot.position.addScaledVector(bowDir, stroke);
			pivot.position.y += bowDrop * 0.25;
			pivot.quaternion.slerpQuaternions(noTurn, playTurn, e);

			// die gestrichenen Saiten schwingen leicht mit
			strings.forEach((sNode, i) => {
				if (sNode && sNode !== vib.node)
					sNode.position.x = 0.0006 * e * (0.4 + level) * Math.sin(performance.now() * 0.19 + i);
			});
		}

		if (vib.node) {
			vib.t += delta;
			const amp = 0.0018 * Math.exp(-vib.t * 2.5);
			vib.node.position.x = amp * Math.sin(vib.t * 2 * Math.PI * 24);
			if (vib.t > 2.5) {
				vib.node.position.x = 0;
				vib.node = null;
			}
		}
	});
</script>

{#if $gltf}
	<T is={$gltf.scene} />
{/if}