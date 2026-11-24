<script>
	// Rote Markierungen am Modell. Ein Klick fliegt die Kamera heran und öffnet die Infokarte.
	import { useTask, useThrelte } from '@threlte/core';
	import { HTML } from '@threlte/extras';
	import { HOTSPOTS } from './data.js';
	import { ui, openHotspot } from './state.svelte.js';

	const { camera } = useThrelte();

	// Ein Pin ist nur sichtbar, wenn seine Seite zur Kamera zeigt
	let visible = $state(HOTSPOTS.map(() => true));

	useTask(() => {
		const c = camera.current.position;
		HOTSPOTS.forEach((h, i) => {
			const [px, py, pz] = h.position;
			const [nx, ny, nz] = h.normal;
			const dot = nx * (c.x - px) + ny * (c.y - py) + nz * (c.z - pz);
			const v = dot > -0.05;
			if (v !== visible[i]) visible[i] = v;
		});
	});

	// Die Orbit-Steuerung soll den Klick auf einen Pin nicht "schlucken"
	function noOrbit(node) {
		const stop = (e) => e.stopPropagation();
		node.addEventListener('pointerdown', stop);
		return { destroy: () => node.removeEventListener('pointerdown', stop) };
	}

	function open(id) {
		openHotspot(id);
	}
</script>

{#each HOTSPOTS as h, i (h.id)}
	<HTML position={h.position} center zIndexRange={[40, 10]}>
		<button
			use:noOrbit
			class="pin"
			class:pin-hidden={!ui.pins || !visible[i] || ui.explode}
			class:pin-active={ui.hotspot === h.id}
			onclick={() => open(h.id)}
			aria-label={h.title}
		>
			<span class="pin-label">{h.title}</span>
		</button>
	</HTML>
{/each}