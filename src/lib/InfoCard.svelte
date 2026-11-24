<script>
	// Kleine Infokarte für den angeklickten Teil
	import { fly } from 'svelte/transition';
	import { HOTSPOTS, STRINGS } from './data.js';
	import { ui, showView, pluckState } from './state.svelte.js';
	import { pluck } from './audio.js';

	const h = $derived(HOTSPOTS.find((x) => x.id === ui.hotspot));

	function play(s) {
		pluck(s.freq);
		pluckState.node = s.node;
		pluckState.stamp++;
	}
</script>

{#if h}
	{#key h.id}
		<div
			class="absolute top-5 left-5 z-[100] w-[min(340px,calc(100%-2.5rem))] rounded-md bg-kreide-hell/95 p-5 shadow-[0_1px_0_rgb(0_0_0/0.06)] ring-1 ring-kreide-dunkel backdrop-blur sm:top-7 sm:left-7"
			in:fly={{ x: -16, duration: 350, delay: 300 }}
			out:fly={{ x: -8, duration: 150 }}
		>
			<div class="flex items-start justify-between gap-4">
				<h2 class="heading text-[34px]">{h.title}</h2>
				<button
					class="-mt-1 -mr-1 grid h-8 w-8 shrink-0 place-items-center rounded text-grau hover:bg-kreide hover:text-ebenholz"
					onclick={() => showView('gesamt')}
					aria-label="Schließen"
				>
					<svg
						viewBox="0 0 24 24"
						class="h-4 w-4"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
					>
						<path d="M6 6l12 12M18 6L6 18" />
					</svg>
				</button>
			</div>
			<p class="mt-3 text-[15px] leading-relaxed">{h.text}</p>
			<p class="mt-3 text-[13px] text-grau">{h.facts.join(', ')}</p>
			{#if h.strings}
				<div class="mt-4 grid grid-cols-4 gap-2">
					{#each STRINGS as s (s.name)}
						<button class="string-btn" onclick={() => play(s)} aria-label="Saite {s.name} anhören">
							{s.name}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	{/key}
{/if}