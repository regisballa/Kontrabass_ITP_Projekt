<script>
	// Ladeanzeige, solange das 3D-Modell geladen wird
	import { useProgress } from '@threlte/extras';
	import { fade } from 'svelte/transition';
	import { ui } from './state.svelte.js';

	const { progress } = useProgress();
	const pct = $derived(Math.round(($progress || 0) * 100));
</script>

{#if !ui.loaded || !ui.stageLoaded}
	<div class="absolute inset-0 z-[110] bg-kreide" out:fade={{ duration: 600 }} role="status">
		<div class="absolute inset-x-5 bottom-24 sm:inset-x-7">
			<p class="text-[15px]">Das Modell wird geladen, {pct} %</p>
			<div class="mt-3 h-[2px] w-full bg-kreide-dunkel">
				<div class="h-full bg-lack transition-[width] duration-300" style="width: {pct}%"></div>
			</div>
		</div>
	</div>
{/if}