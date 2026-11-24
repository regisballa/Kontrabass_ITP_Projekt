<script>
	// Technische Zeichnung vom Kontrabass mit den wichtigsten Maßen.
	// 1 Einheit = 1 cm. Der Korpus ist die gleiche Form wie im Konfigurator (Violin- oder Gambenform).
	import { FORM_ICON } from './data.js';
	import { config } from './state.svelte.js';

	const korpus = $derived(config.form > 0.5 ? FORM_ICON.gamba : FORM_ICON.violin);
</script>

<svg
	viewBox="-34 -80 156 232"
	class="mx-auto h-auto max-h-[78vh] w-full max-w-[460px]"
	role="img"
	aria-label="Zeichnung vom Kontrabass mit Maßen"
>
	<g fill="none" stroke="currentColor" stroke-width="0.6" stroke-linejoin="round">
		<!-- Schnecke und Wirbelkasten -->
		<circle cx="35" cy="-64" r="4.5" />
		<circle cx="35" cy="-64" r="2" />
		<rect x="31" y="-59.5" width="8" height="14.5" rx="1" />
		<circle cx="27" cy="-55" r="1.6" />
		<circle cx="27" cy="-49.5" r="1.6" />
		<circle cx="43" cy="-55" r="1.6" />
		<circle cx="43" cy="-49.5" r="1.6" />
		<!-- Korpus -->
		<path d={korpus} />
		<!-- Griffbrett -->
		<path d="M32 -45 L38 -45 L40.5 35 L29.5 35 Z" />
		<!-- f-Löcher -->
		<path d="M23 48 C 19 55, 26 63, 22 72" />
		<path d="M47 48 C 51 55, 44 63, 48 72" />
		<!-- Steg und Saitenhalter -->
		<path d="M27 60 L43 60" stroke-width="1.4" />
		<path d="M31 72 L39 72 L37.5 101 L32.5 101 Z" />
		<!-- Stachel -->
		<path d="M35 112 L35 139" stroke-width="1" />
	</g>
	<!-- Saiten -->
	<g stroke="currentColor" stroke-width="0.25" opacity="0.7">
		<path d="M33.2 -45 L32.4 72" />
		<path d="M34.4 -45 L34.2 72" />
		<path d="M35.6 -45 L35.8 72" />
		<path d="M36.8 -45 L37.6 72" />
	</g>

	<!-- Maßlinien -->
	<g
		class="text-lack"
		stroke="currentColor"
		stroke-width="0.4"
		fill="currentColor"