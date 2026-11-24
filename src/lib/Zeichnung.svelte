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
		font-size="4.4"
		font-family="inherit"
	>
		<!-- Gesamthöhe -->
		<path d="M-14 -68.5 L-14 139 M-17 -68.5 L-11 -68.5 M-17 139 L-11 139" />
		<path d="M-14 -68.5 L-20 -68.5 M-14 139 L-20 139" stroke-dasharray="1 1" opacity="0.5" />
		<text x="-17" y="35" transform="rotate(-90 -17 35)" text-anchor="middle" stroke="none">
			ca. 210 cm
		</text>
		<!-- Korpus -->
		<path d="M82 1 L82 112 M79 1 L85 1 M79 112 L85 112" />
		<text x="88" y="56" transform="rotate(-90 88 56)" text-anchor="middle" stroke="none">
			Korpus 111 cm
		</text>
		<!-- Mensur: vom Sattel bis zum Steg -->
		<path d="M100 -45 L100 60 M97 -45 L103 -45 M97 60 L103 60" />
		<path d="M42 -45 L100 -45 M46 60 L100 60" stroke-dasharray="1 1" opacity="0.5" />
		<text x="106" y="7.5" transform="rotate(-90 106 7.5)" text-anchor="middle" stroke="none">
			Mensur 105 cm
		</text>
	</g>
</svg>