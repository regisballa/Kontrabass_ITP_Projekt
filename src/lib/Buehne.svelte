<script>
	// Die Bühne aus Blender: Parkettboden und roter Vorhang.
	// Der Vorhang wird ein zweites Mal gedreht vorne aufgestellt, genau am Ende vom Parkett.
	// So ist der Raum rundherum geschlossen und man kann den Bass von allen Seiten ansehen.
	import { asset } from '$app/paths';
	import { T } from '@threlte/core';
	import { useGltf } from '@threlte/extras';
	import { DoubleSide } from 'three';
	import { ui } from './state.svelte.js';

	const SCALE = 1.25; // etwas größer als in Blender, damit die Kamera mehr Platz hat

	const gltf = useGltf(asset('models/buehne.glb'));
	let frontCurtain = $state(null);

	$effect(() => {
		if (!$gltf) return;
		const curtain = $gltf.nodes.Vorhang;
		const floor = $gltf.nodes.Boden_Parkett;
		curtain.traverse((o) => {
			if (o.isMesh) {
				o.receiveShadow = true;
				o.material.side = DoubleSide;
			}
		});
		floor.traverse((o) => {
			if (o.isMesh) o.receiveShadow = true;
		});
		frontCurtain = curtain.clone();
		ui.stageLoaded = true;
	});
</script>

{#if $gltf}
	<T.Group scale={SCALE}>
		<T is={$gltf.scene} />
		{#if frontCurtain}
			<T
				is={frontCurtain}
				rotation.y={Math.PI}
				position={[
					-frontCurtain.position.x,
					frontCurtain.position.y,
					-frontCurtain.position.z + 2.28
				]}
			/>
		{/if}
	</T.Group>
{/if}