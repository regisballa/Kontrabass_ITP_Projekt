<script>
	// Die 3D-Szene: Kamera, Steuerung, Licht, Bühne, Modell und Hotspots.
	import { T, useTask, useThrelte } from '@threlte/core';
	import { OrbitControls } from '@threlte/extras';
	import { PMREMGenerator, Vector3, MathUtils, Color } from 'three';
	import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
	import { Tween } from 'svelte/motion';
	import { cubicInOut } from 'svelte/easing';
	import Kontrabass from './Kontrabass.svelte';
	import Hotspots from './Hotspots.svelte';
	import Candles from './Candles.svelte';
	import Buehne from './Buehne.svelte';
	import { ui, cam, viewPosition } from './state.svelte.js';
	import { setImageMaker } from './snapshot.js';
	import { VIEWS } from './data.js';

	const { scene, renderer, camera: activeCamera } = useThrelte();

	// Bild speichern: einmal neu zeichnen und das Bild vom Canvas holen
	setImageMaker(() => {
		renderer.render(scene, activeCamera.current);
		return renderer.domElement.toDataURL('image/png');
	});

	// Drehteller: nach 10 Sekunden ohne Maus dreht sich der Bass langsam
	let idle = 0;
	const wake = () => (idle = 0);
	$effect(() => {
		window.addEventListener('pointerdown', wake);
		window.addEventListener('wheel', wake);
		window.addEventListener('keydown', wake);
		return () => {
			window.removeEventListener('pointerdown', wake);
			window.removeEventListener('wheel', wake);
			window.removeEventListener('keydown', wake);
		};
	});

	// Umgebungslicht für schöne Reflexionen auf dem Lack
	const pmrem = new PMREMGenerator(renderer);
	scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
	scene.background = new Color('#2a0708'); // dunkles Vorhangrot, falls man zwischen die Falten sieht

	// Scheinwerfer zeigen auf einen Punkt (target)
	let keySpot = $state();
	let glowSpot = $state();
	$effect(() => {
		if (keySpot) {
			keySpot.target.position.set(0.05, 0.9, 0);
			keySpot.target.updateMatrixWorld();
		}
		if (glowSpot) {
			glowSpot.target.position.set(0.35, 2.3, -3.8);
			glowSpot.target.updateMatrixWorld();
		}
	});

	// 0 = Bühnenlicht, 1 = Kerzenlicht (weicher Übergang)
	const candle = new Tween(0, { duration: 1400, easing: cubicInOut });
	$effect(() => {
		candle.target = ui.light === 'kerze' ? 1 : 0;
	});
	const k = $derived(candle.current);

	let camera = $state();
	let controls = $state();

	// Kameraflug zu einer Ansicht oder einem Hotspot
	let fly = null;
	$effect(() => {
		cam.stamp;
		if (!camera || !controls || cam.stamp === 0) return;
		idle = 0;
		fly = {
			fromP: camera.position.clone(),
			toP: new Vector3(...cam.position),
			fromT: controls.target.clone(),
			toT: new Vector3(...cam.target),
			t: 0
		};
	});

	const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

	useTask((delta) => {
		idle += delta;
		if (controls) controls.autoRotate = idle > 10 && !fly && !ui.hotspot;
		scene.environmentIntensity = MathUtils.lerp(0.28, 0.06, k);
		renderer.toneMappingExposure = MathUtils.lerp(1.0, 1.15, k);
		if (fly && camera && controls) {
			fly.t = Math.min(1, fly.t + delta / 1.5);
			const e = easeInOut(fly.t);
			camera.position.lerpVectors(fly.fromP, fly.toP, e);
			controls.target.lerpVectors(fly.fromT, fly.toT, e);
			controls.update();
			if (fly.t >= 1) fly = null;
		}
	});

	// Wenn der Nutzer selbst dreht, wird der Kameraflug abgebrochen
	function userStart() {
		fly = null;
	}
</script>

<T.PerspectiveCamera
	makeDefault
	position={viewPosition(VIEWS[0])}
	fov={42}
	near={0.03}
	far={60}
	bind:ref={camera}
>
	<OrbitControls
		bind:ref={controls}
		target={VIEWS[0].target}
		enableDamping
		dampingFactor={0.08}
		minDistance={0.3}
		maxDistance={3.6}
		maxPolarAngle={Math.PI * 0.56}
		zoomSpeed={0.8}
		autoRotateSpeed={0.6}
		onstart={userStart}
	/>
</T.PerspectiveCamera>

<!-- Bühnenlicht: ein Scheinwerfer auf den Bass (mit Schatten) und einer auf den Vorhang -->
<T.SpotLight
	bind:ref={keySpot}
	position={[-2.2, 4.8, 3.2]}
	angle={0.34}
	penumbra={0.6}
	decay={2}
	intensity={150 * (1 - k)}
	color="#fff0dc"
	castShadow
	shadow.mapSize={[2048, 2048]}
	shadow.bias={-0.0004}
	shadow.normalBias={0.02}
/>
<T.SpotLight
	bind:ref={glowSpot}
	position={[0.6, 4.6, 0.6]}
	angle={0.42}
	penumbra={1}
	decay={2}
	intensity={80 * (1 - k)}
	color="#ffc98f"
/>
<T.HemisphereLight color="#ffe9d0" groundColor="#3a1410" intensity={0.2 * (1 - k)} />

<!-- Kerzenlicht: kühles Licht von hinten als Kontrast -->
<T.DirectionalLight position={[2, 3.5, -3]} intensity={0.5 * k} color="#7d93d6" />
<T.AmbientLight intensity={0.04 + 0.03 * k} color="#ffe2c0" />
<Candles {k} />

<Buehne />
<Kontrabass />
{#if ui.loaded && ui.stageLoaded}
	<Hotspots />
{/if}