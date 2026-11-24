<script>
	// Die Website. Sie benutzt die Komponente <Konfigurator />.
	import { asset } from '$app/paths';
	import Konfigurator from './lib/Konfigurator.svelte';
	import Zeichnung from './lib/Zeichnung.svelte';
	import { HOTSPOTS, SPECS, RENDERINGS } from './lib/data.js';
	import { ui, openHotspot } from './lib/state.svelte.js';
	import { setMusic, hasRecording } from './lib/audio.js';

	// true = Aufnahme gefunden, false = Ersatz-Version (Datei fehlt in static/audio)
	let echt = $state(true);

	function toggleMusic() {
		ui.music = !ui.music;
		setMusic(ui.music);
		echt = hasRecording();
	}

	// Bildstreifen der Renderings: mit den Pfeilen ein Stück weiter schieben
	let streifen;
	function blaettern(richtung) {
		streifen.scrollBy({ left: richtung * streifen.clientWidth * 0.6, behavior: 'smooth' });
	}

	function showPart(id) {
		document.getElementById('konfigurator').scrollIntoView({ behavior: 'smooth' });
		setTimeout(() => openHotspot(id), 450);
	}
</script>

<header
	class="sticky top-0 z-[200] flex h-16 items-center justify-between gap-6 border-b border-kreide-dunkel bg-kreide/90 px-5 backdrop-blur sm:px-8"
>
	<a href="#top" class="heading text-[28px]">Kontrabass</a>
	<nav class="hidden gap-7 text-[15px] md:flex">
		<a class="link" href="#konfigurator">Konfigurator</a>
		<a class="link" href="#teile">Teile</a>
		<a class="link" href="#renderings">Renderings</a>
		<a class="link" href="#masse">Maße</a>
	</nav>
	<button
		class="flex items-center gap-3 rounded-full px-4 py-2 text-[14px] transition-colors {ui.music
			? 'bg-ebenholz text-white'
			: 'bg-kreide-hell ring-1 ring-kreide-dunkel hover:ring-ebenholz'}"
		onclick={toggleMusic}
	>
		{#if ui.music}
			<span class="eq" aria-hidden="true"><i></i><i></i><i></i></span>
		{:else}
			<svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
				<path d="M7 4.5v15l12-7.5z" />
			</svg>
		{/if}
		<span>{ui.music ? 'Musik anhalten' : 'Musik abspielen'}</span>
		<span class="hidden opacity-60 lg:inline">
			{ui.music && !echt ? 'Ersatz, Datei fehlt' : 'Bach, Suite Nr. 1'}
		</span>
	</button>
</header>

<main id="top">
	<section id="konfigurator" class="scroll-mt-16">
		<Konfigurator />
	</section>

	<!-- Teile: ein Katalog mit einem Bild pro Teil -->
	<section id="teile" class="scroll-mt-16 px-5 py-20 sm:px-8 lg:py-28">
		<div class="flex flex-wrap items-end justify-between gap-6">
			<h2 class="heading text-[56px] lg:text-[88px]">Die Teile</h2>
			<p class="max-w-[44ch] text-grau">
				Acht Stellen am Modell haben einen roten Punkt. Klick auf ein Bild, dann fliegt die Kamera
				im 3D-Modell genau dorthin. Alle Bilder sind in Blender gerendert.
			</p>
		</div>
		<ul class="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
			{#each HOTSPOTS as h (h.id)}
				<li>
					<button
						class="group block w-full overflow-hidden rounded-md"
						onclick={() => showPart(h.id)}
						aria-label="{h.title} im Modell zeigen"
					>