<script>
	// Die Konfigurator-Komponente: 3D-Viewer + Optionen.
	// Benutzung: <Konfigurator />
	import { Canvas } from '@threlte/core';
	import { ACESFilmicToneMapping, PCFShadowMap } from 'three';
	import Scene from './Scene.svelte';
	import Loader from './Loader.svelte';
	import InfoCard from './InfoCard.svelte';
	import OptionsPanel from './OptionsPanel.svelte';
	import { VIEWS, EXPLODE } from './data.js';
	import { ui, showView, toggleExplode } from './state.svelte.js';
	import { saveImage } from './snapshot.js';

	const night = $derived(ui.light === 'kerze');
</script>

<div>
	<!-- 3D-Viewer: die Bühne aus Blender, über die ganze Breite -->
	<div
		class="night relative isolate h-[72vh] min-h-[480px] overflow-hidden bg-nacht xl:h-[calc(100svh-64px-112px)] xl:min-h-[560px]"
	>
		<!-- Titel wie auf einem Konzertplakat, direkt auf dem Vorhang -->
		<div
			class="pointer-events-none absolute top-8 left-8 z-[90] transition-opacity duration-300 max-sm:sr-only"
			class:opacity-0={ui.hotspot}
		>
			<h1 class="display text-[96px] text-white xl:text-[136px]">Kontrabass</h1>
			<p class="mt-4 max-w-[30ch] text-[15px] text-white/80">
				Ein 3/4-Bass aus Blender. Dreh ihn mit der Maus, klick auf die roten Punkte und stell ihn
				unten zusammen.
			</p>
		</div>

		<Canvas toneMapping={ACESFilmicToneMapping} shadows={PCFShadowMap} dpr={[1, 2]}>
			<Scene />
		</Canvas>

		<Loader />
		<InfoCard />

		<!-- Teile zeigen und Bild speichern (oben rechts) -->
		<div class="absolute top-5 right-5 z-[100] flex flex-col items-end gap-2 sm:top-7 sm:right-7">
			<div class="flex gap-2">
				<button class="pill" class:pill-on={ui.explode} onclick={toggleExplode}>
					{ui.explode ? 'Zusammensetzen' : 'Teile zeigen'}
				</button>
				<button class="pill" onclick={() => saveImage('kontrabass.png')}>Bild speichern</button>
			</div>
			{#if ui.explode}
				<p class="text-[13px] text-white/75">
					{Object.keys(EXPLODE).length} Teile, alle einzeln in Blender gebaut
				</p>
			{/if}
		</div>

		<!-- Ansichten (links) und Licht (rechts) -->
		<div
			class="absolute inset-x-0 bottom-0 z-[100] flex flex-wrap items-end justify-between gap-x-8 gap-y-2 bg-nacht/70 px-5 pt-3 pb-4 backdrop-blur-md sm:px-7"
		>
			<nav class="flex flex-wrap gap-x-5 gap-y-1" aria-label="Ansicht">
				{#each VIEWS as v (v.id)}
					<button class="tab" class:tab-on={ui.view === v.id} onclick={() => showView(v.id)}>
						{v.label}
					</button>
				{/each}
			</nav>
			<div class="flex flex-wrap items-center gap-x-5 gap-y-1">
				<button class="tab" class:tab-on={!night} onclick={() => (ui.light = 'tag')}>
					Bühnenlicht
				</button>
				<button class="tab" class:tab-on={night} onclick={() => (ui.light = 'kerze')}>
					Kerzenlicht
				</button>
				<button class="tab" onclick={() => (ui.pins = !ui.pins)}>
					{ui.pins ? 'Markierungen aus' : 'Markierungen an'}
				</button>
			</div>
		</div>
	</div>

	<!-- Optionen als Pult unter der Bühne -->
	<OptionsPanel />
</div>