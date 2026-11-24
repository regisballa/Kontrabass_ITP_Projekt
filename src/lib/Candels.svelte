<script>
	// Kerzen für das Kerzenlicht. k = 0 (Tag) bis 1 (Kerze).
	import { T, useTask } from '@threlte/core';

	let { k = 0 } = $props();

	// [x, z, Höhe der Kerze]
	const candles = [
		[-0.56, 0.5, 0.3],
		[-0.45, 0.58, 0.22],
		[-0.5, 0.38, 0.17],
		[0.56, 0.42, 0.26],
		[0.66, 0.3, 0.19]
	];

	let lightA = $state();
	let lightB = $state();
	let flames = [];
	let time = 0;

	// Flackern: mehrere Sinuswellen übereinander
	useTask((delta) => {
		time += delta;
		const f1 =
			1 +
			0.09 * Math.sin(time * 13.1) +
			0.06 * Math.sin(time * 7.7 + 1.3) +
			0.04 * Math.sin(time * 23.0);
		const f2 =
			1 +
			0.08 * Math.sin(time * 11.3 + 2.0) +
			0.06 * Math.sin(time * 6.1) +
			0.04 * Math.sin(time * 19.0 + 0.7);
		if (lightA) lightA.intensity = 2.6 * k * f1;
		if (lightB) lightB.intensity = 1.7 * k * f2;
		flames.forEach((m, i) => {
			if (!m) return;
			const s = 1 + 0.12 * Math.sin(time * (14 + i * 1.7) + i);
			m.scale.set(1, s, 1);
		});
	});
</script>

<T.Group visible={k > 0.01}>
	{#each candles as [x, z, h], i (i)}
		<!-- Wachs -->
		<T.Mesh position={[x, h / 2, z]}>
			<T.CylinderGeometry args={[0.022, 0.024, h, 20]} />
			<T.MeshStandardMaterial
				color="#f3e9d2"
				roughness={0.6}
				emissive="#ffb066"
				emissiveIntensity={0.08 * k}
			/>
		</T.Mesh>
		<!-- Docht -->
		<T.Mesh position={[x, h + 0.006, z]}>
			<T.CylinderGeometry args={[0.0015, 0.0015, 0.014, 6]} />
			<T.MeshBasicMaterial color="#2a1a10" />
		</T.Mesh>
		<!-- Flamme -->
		<T.Mesh position={[x, h + 0.026, z]} bind:ref={flames[i]}>
			<T.SphereGeometry args={[0.009, 12, 10]} />
			<T.MeshBasicMaterial color="#ffd08a" toneMapped={false} transparent opacity={k} />
		</T.Mesh>
	{/each}
	<!-- goldene Schalen -->
	<T.Mesh position={[-0.5, 0.006, 0.48]}>
		<T.CylinderGeometry args={[0.15, 0.16, 0.012, 40]} />
		<T.MeshStandardMaterial color="#a68a5b" metalness={1} roughness={0.35} />
	</T.Mesh>
	<T.Mesh position={[0.61, 0.006, 0.36]}>
		<T.CylinderGeometry args={[0.11, 0.12, 0.012, 40]} />
		<T.MeshStandardMaterial color="#a68a5b" metalness={1} roughness={0.35} />
	</T.Mesh>
</T.Group>

<T.PointLight
	bind:ref={lightA}
	position={[-0.5, 0.36, 0.48]}
	color="#ff9b45"
	distance={6}
	decay={2}
/>
<T.PointLight
	bind:ref={lightB}
	position={[0.61, 0.31, 0.36]}
	color="#ff9440"
	distance={6}
	decay={2}
/>