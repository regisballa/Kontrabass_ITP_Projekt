<script>
  // Die Website. Sie benutzt die Komponente <Konfigurator />.
  import Konfigurator from './lib/Konfigurator.svelte'
  import Zeichnung from './lib/Zeichnung.svelte'
  import { HOTSPOTS, SPECS, RENDERINGS } from './lib/data.js'
  import { ui, openHotspot } from './lib/state.svelte.js'
  import { setMusic, hasRecording } from './lib/audio.js'

  const base = import.meta.env.BASE_URL

  // true = Aufnahme gefunden, false = Ersatz-Version (Datei fehlt in public/audio)
  let echt = $state(true)

  function toggleMusic() {
    ui.music = !ui.music
    setMusic(ui.music)
    echt = hasRecording()
  }

  // Bildstreifen der Renderings: mit den Pfeilen ein Stück weiter schieben
  let streifen
  function blaettern(richtung) {
    streifen.scrollBy({ left: richtung * streifen.clientWidth * 0.6, behavior: 'smooth' })
  }

  function showPart(id) {
    document.getElementById('konfigurator').scrollIntoView({ behavior: 'smooth' })
    setTimeout(() => openHotspot(id), 450)
  }
</script>

<header class="sticky top-0 z-[200] flex h-16 items-center justify-between gap-6 border-b border-kreide-dunkel bg-kreide/90 px-5 backdrop-blur sm:px-8">
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
      <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15l12-7.5z" /></svg>
    {/if}
    <span>{ui.music ? 'Musik anhalten' : 'Musik abspielen'}</span>
    <span class="hidden opacity-60 lg:inline">{ui.music && !echt ? 'Ersatz, Datei fehlt' : 'Bach, Cellosuiten'}</span>
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
        Acht Stellen am Modell haben einen roten Punkt. Klick auf ein Bild, dann fliegt die Kamera im 3D-Modell genau
        dorthin. Alle Bilder sind in Blender gerendert.
      </p>
    </div>
    <ul class="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {#each HOTSPOTS as h}
        <li>
          <button class="group block w-full overflow-hidden rounded-md" onclick={() => showPart(h.id)} aria-label="{h.title} im Modell zeigen">
            <img
              src="{base}images/teile/teil_{h.id}.jpg"
              alt=""
              loading="lazy"
              class="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </button>
          <h3 class="mt-4 flex items-center gap-2.5 text-[19px] font-semibold"><span class="marke" aria-hidden="true"></span>{h.title}</h3>
          <p class="mt-2 text-[15px] text-grau">{h.text}</p>
          <button class="link mt-3 text-[15px]" onclick={() => showPart(h.id)}>Im Modell zeigen</button>
        </li>
      {/each}
    </ul>
  </section>

  <!-- Renderings: ein Bildstreifen auf dunkler Bühne -->
  <section id="renderings" class="scroll-mt-16 bg-nacht py-20 text-white lg:py-28">
    <div class="flex flex-wrap items-end justify-between gap-6 px-5 sm:px-8">
      <h2 class="heading text-[56px] lg:text-[88px]">Renderings</h2>
      <div class="flex items-end gap-8">
        <p class="max-w-[40ch] text-white/65">
          Gerendert in Blender mit Cycles, auf der Bühne mit rotem Vorhang und Parkett. Klick auf ein Bild, dann siehst du
          es groß.
        </p>
        <div class="hidden shrink-0 gap-2 sm:flex">
          <button class="pill" onclick={() => blaettern(-1)} aria-label="Zurück">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button class="pill" onclick={() => blaettern(1)} aria-label="Weiter">
            <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
    <div bind:this={streifen} class="streifen mt-10 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-5 sm:scroll-px-8 sm:px-8">
      {#each RENDERINGS as r}
        <figure class="w-[80vw] shrink-0 snap-start sm:w-[44vw] lg:w-[min(31vw,540px)]">
          <a href="{base}images/{r.file}" target="_blank" rel="noopener" class="block overflow-hidden rounded-md">
            <img src="{base}images/{r.file}" alt={r.alt} loading="lazy" class="aspect-[4/5] w-full object-cover" />
          </a>
          <figcaption class="mt-3 text-[14px] text-white/60">{r.title}</figcaption>
        </figure>
      {/each}
    </div>
  </section>

  <!-- Maße: technische Zeichnung und Liste -->
  <section id="masse" class="scroll-mt-16 bg-kreide-hell px-5 py-20 sm:px-8 lg:py-28">
    <div class="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <Zeichnung />
      <div>
        <h2 class="heading text-[56px] lg:text-[88px]">Maße</h2>
        <p class="mt-5 max-w-[42ch] text-grau">
          Das Modell hat die echten Maße eines 3/4-Basses. Ein Meter in Blender ist ein Meter im Browser. Die Zeichnung
          zeigt die Form, die du oben im Konfigurator gewählt hast.
        </p>
        <dl class="mt-10 text-[17px]">
          {#each SPECS as [k, v]}
            <div class="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-6 border-t border-kreide-dunkel py-3">
              <dt class="text-grau">{k}</dt>
              <dd class="tabular-nums">{v}</dd>
            </div>
          {/each}
        </dl>
      </div>
    </div>
  </section>
</main>


<footer class="bg-ebenholz px-5 py-12 text-[14px] text-kreide-dunkel sm:px-8">
	<div class="grid gap-8 md:grid-cols-2">
		<div>
			<p class="heading text-[28px] text-white">Kontrabass</p>
			<p class="mt-3">ITP-Projekt „3D-Objekt im Web“, HTL Shkodër 2026<br />Regis Balla</p>
		</div>
		<div class="space-y-2 md:text-right">
			<p>
				Musik: J. S. Bach, Cellosuite Nr. 1, BWV 1007, Prélude und Cellosuite Nr. 3, BWV 1009,
				Bourrées. Aufnahmen von John Michel (Cello), Wikimedia Commons (<a
					class="underline underline-offset-4 hover:text-white"
					href="https://commons.wikimedia.org/wiki/File:JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_1_in_G_Prelude.ogg"
					target="_blank"
					rel="noopener"
				>
					Prélude
				</a>,
				<a
					class="underline underline-offset-4 hover:text-white"
					href="https://commons.wikimedia.org/wiki/File:JOHN_MICHEL_CELLO-J_S_BACH_CELLO_SUITE_3_in_G_Bourees.ogg"
					target="_blank"
					rel="noopener"
				>
					Bourrées
				</a>), für den Kontrabass eine Oktave tiefer bearbeitet. Lizenz
				<a
					class="underline underline-offset-4 hover:text-white"
					href="https://creativecommons.org/licenses/by-sa/3.0/"
					target="_blank"
					rel="noopener"
				>
					CC BY-SA 3.0
				</a>.
			</p>
		</div>
	</div>
</footer>