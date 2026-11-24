<script>
	// Die Konfigurations-Optionen: ein Pult unter der Bühne, alle Gruppen nebeneinander
	import { LACK, GARNITUR, SAITEN, MECHANIK, FORM_ICON } from './data.js';
	import { config, resetConfig } from './state.svelte.js';

	const groups = [
		{ key: 'lack', label: 'Lack', options: LACK },
		{ key: 'garnitur', label: 'Saitenhalter', options: GARNITUR },
		{ key: 'saiten', label: 'Saiten', options: SAITEN },
		{ key: 'mechanik', label: 'Mechanik', options: MECHANIK }
	];

	const forms = [
		{ v: 0, name: 'Violinform', icon: FORM_ICON.violin },
		{ v: 1, name: 'Gambenform', icon: FORM_ICON.gamba }
	];

	const nameOf = (list, id) => list.find((o) => o.id === id).name;
</script>

<div class="border-t border-kreide-dunkel bg-kreide-hell px-5 py-5 sm:px-8">
	<div
		class="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 md:grid-cols-3 xl:flex xl:items-start xl:gap-0"
	>
		<section class="xl:pr-6">
			<h2 class="opt-title">
				Form <span class="ml-1 font-normal text-grau">{forms[config.form].name}</span>
			</h2>
			<div class="mt-2 flex gap-2">
				{#each forms as f (f.v)}
					<button
						class="shape"
						class:shape-on={config.form === f.v}
						onclick={() => (config.form = f.v)}
						aria-label={f.name}
						aria-pressed={config.form === f.v}
						title={f.name}
					>
						<svg viewBox="-2 -2 74 116" class="h-7 w-5" aria-hidden="true">
							<path d={f.icon} fill="none" stroke="currentColor" stroke-width="5" />
						</svg>
					</button>
				{/each}
			</div>
		</section>

		{#each groups as g (g.key)}
			<section class="xl:border-l xl:border-kreide-dunkel xl:px-6">
				<h2 class="opt-title whitespace-nowrap">
					{g.label}
					<span class="ml-1 font-normal text-grau">{nameOf(g.options, config[g.key])}</span>
				</h2>
				<div class="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
					{#each g.options as o (o.id)}
						<button
							class="swatch"
							class:swatch-on={config[g.key] === o.id}
							style="--c: {o.swatch}"
							onclick={() => (config[g.key] = o.id)}
							aria-label={o.name}
							aria-pressed={config[g.key] === o.id}
							title={o.name}
						></button>
					{/each}
				</div>
			</section>
		{/each}

		<section class="xl:border-l xl:border-kreide-dunkel xl:px-6">
			<label class="flex cursor-pointer items-center gap-3">
				<span class="opt-title">Bogen</span>
				<input type="checkbox" class="switch" bind:checked={config.bogen} />
			</label>
			<p class="mt-2 text-[13px] text-grau">Spielt zur Musik</p>
		</section>

		<button
			class="link self-end justify-self-start text-[14px] text-grau xl:ml-auto xl:self-center"
			onclick={resetConfig}
		>
			Zurücksetzen
		</button>
	</div>
</div>