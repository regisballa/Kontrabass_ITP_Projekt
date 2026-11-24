<script>
	// Rahmen für jede Seite: Schrift, Stil, Titel und Symbol im Browser-Tab
	import '@fontsource-variable/archivo/wdth.css';
	import '../app.css';
	import favicon from '#lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Kontrabass: 3D-Konfigurator</title>
	<meta
		name="description"
		content="Interaktiver 3D-Konfigurator für einen Kontrabass. ITP-Projekt mit Blender, Three.js, Threlte und SvelteKit."
	/>
	<meta name="theme-color" content="#e0dad2" />
</svelte:head>

{@render children()}