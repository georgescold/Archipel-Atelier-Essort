// L'Atlas d'Aluria — Destinations index, Manifeste, Footer.
const { useState: useStateR } = React;

/* ---------- available island card ---------- */
function IslandCard({ island, index, setOpenId, setCursorBig }) {
  const [hovered, setHovered] = useStateR(false);
  return (
    <window.Reveal inView delay={index * 0.08} y={32}
      className="group relative aspect-[16/10] rounded-2xl overflow-hidden"
      onClick={() => setOpenId(island.id)}
      onMouseEnter={() => { setHovered(true); setCursorBig(true); }}
      onMouseLeave={() => { setHovered(false); setCursorBig(false); }}>
      <img src={island.image} alt={island.name} className="absolute inset-0 w-full h-full object-cover" />
      {hovered && (
        <div className="absolute inset-0" style={{ animation: `fade 0.5s ${window.EASE} both` }}>
          <window.MuxVideo playbackId={island.playbackId} poster={island.image} play={true}
            className="absolute inset-0 w-full h-full object-cover" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/10 to-transparent" />
      {/* accent ring on hover */}
      <span className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${island.accent}`, opacity: hovered ? 1 : 0 }} />
      {/* badge */}
      <span className="absolute top-4 right-4 glass rounded-full px-3 py-1 text-[9px] font-mono tracking-[0.2em] uppercase text-gold">Disponible</span>
      {/* content */}
      <div className="absolute bottom-0 left-0 p-6">
        <div className="text-[10px] font-mono tracking-[0.2em] uppercase text-gold mb-1.5">N° {island.numeral}</div>
        <div className="font-display text-3xl md:text-4xl text-ink transition-transform duration-500 ease-out"
          style={{ transform: hovered ? "translateY(-4px)" : "translateY(0)" }}>{island.name}</div>
        <div className="font-serif italic text-[13px] text-mist mt-1">{island.tagline}</div>
        <div className="overflow-hidden mt-3" style={{ maxHeight: hovered ? 24 : 0, transition: `max-height 0.45s ${window.EASE_OUT}` }}>
          <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-[0.2em] uppercase text-gold">
            Explorer <window.ArrowRight size={13} />
          </span>
        </div>
      </div>
    </window.Reveal>
  );
}

/* ---------- upcoming locked card ---------- */
function UpcomingCard({ item, index }) {
  return (
    <window.Reveal inView delay={index * 0.05} y={24}
      className="group relative aspect-[4/5] rounded-xl border border-ink/10 bg-abyss-deep/60 overflow-hidden flex flex-col justify-end p-5 opacity-70 hover:opacity-100 transition-opacity duration-500">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(120% 80% at 50% 0%, rgba(212,168,87,0.10), transparent 60%)" }} />
      <span className="absolute top-0 left-0 h-px bg-gold/70 origin-left transition-transform duration-700 ease-out scale-x-0 group-hover:scale-x-100 w-full" />
      <window.Lock size={14} className="absolute top-4 right-4 text-mist" />
      <div className="relative">
        <div className="font-display text-xl text-ink/80">{item.name}</div>
        <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-mist mt-1.5">{item.season}</div>
        <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-gold mt-3">À paraître</div>
      </div>
    </window.Reveal>
  );
}

/* ---------- DESTINATIONS ---------- */
function Destinations({ setOpenId, setCursorBig }) {
  return (
    <section id="destinations" className="relative w-full bg-abyss px-6 md:px-12 py-28 md:py-40 z-10">
      <div className="absolute top-0 inset-x-0 h-px bg-gold/15" />
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
        <div>
          <window.Reveal inView className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold mb-5">02 / Destinations</window.Reveal>
          <window.Reveal inView delay={0.1}>
            <h2 className="font-display text-[2.4rem] md:text-[3.8rem] font-light leading-[1.02] tracking-tight text-ink">
              Les Douze Contrées<br /><span className="italic font-serif text-gold-bright">d'Aluria</span>
            </h2>
          </window.Reveal>
        </div>
        <window.Reveal inView delay={0.15} className="font-sans text-[14px] text-mist max-w-[340px] leading-relaxed">
          Quatre contrées sont aujourd'hui cartographiées. Huit autres affleurent encore le brouillard des songes, et paraîtront au fil des saisons.
        </window.Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-7 mb-12 md:mb-16">
        {window.ISLANDS.map((isl, i) => (
          <IslandCard key={isl.id} island={isl} index={i} setOpenId={setOpenId} setCursorBig={setCursorBig} />
        ))}
      </div>

      <window.Reveal inView className="flex items-center gap-3 mb-7">
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-mist">À venir au fil des saisons</span>
        <span className="flex-1 h-px bg-ink/10" />
      </window.Reveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {window.UPCOMING.map((u, i) => (<UpcomingCard key={u.name} item={u} index={i} />))}
      </div>
    </section>
  );
}

/* ---------- MANIFESTE ---------- */
function Manifeste() {
  return (
    <section id="à-propos" className="relative w-full bg-abyss-deep px-6 md:px-12 py-32 md:py-48 z-10 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,168,87,0.08), transparent 65%)", animation: `drift 16s ease-in-out infinite` }} />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-display font-light text-ink leading-none" style={{ fontSize: "min(34vw, 520px)", opacity: 0.04 }}>ALURIA</span>
      </div>
      <div className="relative max-w-[860px] mx-auto text-center">
        <window.Reveal inView className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold mb-10">03 / Le Manifeste</window.Reveal>
        <window.Reveal inView delay={0.1}>
          <p className="font-display text-[1.7rem] md:text-[2.9rem] font-light leading-[1.25] tracking-tight text-balance text-ink">
            Aluria ne figure sur aucune carte marine. On dit qu'elle dérive entre le <span className="italic font-serif text-gold-bright">sommeil</span> et l'<span className="italic font-serif text-gold-bright">éveil</span>, et qu'on n'y accoste que les nuits où l'on a oublié de douter.
          </p>
        </window.Reveal>
        <window.Reveal inView delay={0.2}>
          <p className="font-sans text-[15px] md:text-[16px] text-mist leading-[1.8] max-w-[620px] mx-auto mt-12">
            Cet atlas est le premier à en consigner les contours. Chaque île y est peinte à la main, chaque légende recueillie au fil des rêves. Nous ne promettons pas qu'elle existe — seulement qu'elle vous attend.
          </p>
        </window.Reveal>
        <window.Reveal inView delay={0.3} className="flex flex-col items-center mt-14">
          <svg width="120" height="14" viewBox="0 0 120 14" fill="none" className="text-gold mb-4">
            <path d="M2 8C20 2 40 12 60 7C80 2 100 11 118 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="font-serif italic text-[1.1rem] text-ink/70">— Atelier Essort</span>
        </window.Reveal>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  const cols = [
    { head: "Explorer", links: ["Mirelune", "Hespera", "Sarvane", "Onyrie"] },
    { head: "Atlas", links: ["Destinations", "Carnets", "Journal"] },
    { head: "Atelier", links: ["À propos", "Contact", "Presse"] },
  ];
  return (
    <footer className="relative w-full border-t border-gold/15 bg-abyss-deep px-6 md:px-12 py-16 z-10">
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-14">
        <div>
          <div className="font-display text-3xl text-ink flex items-start">ALURIA
            <svg width="11" height="11" viewBox="0 0 24 24" className="ml-1 mt-1 text-gold" fill="currentColor"><path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.8L12 15.6 6.4 19.6l2.1-6.8L3 8.8h6.8z" /></svg>
          </div>
          <div className="text-[9px] font-mono tracking-[0.3em] uppercase text-mist mt-2">L'Atlas des Mondes Rêvés</div>
          <div className="font-serif italic text-ink/60 mt-5">Une édition de l'Atelier Essort.</div>
        </div>
        <div className="flex gap-12 md:gap-16">
          {cols.map((c) => (
            <div key={c.head} className="flex flex-col gap-3">
              <div className="text-[9px] font-mono tracking-[0.25em] uppercase text-gold mb-1">{c.head}</div>
              {c.links.map((l) => (
                <a key={l} href="#" className="text-[11px] font-mono tracking-[0.15em] uppercase text-mist hover:text-ink transition-colors duration-300">{l}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="h-px bg-gold/15 mb-7" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] font-mono tracking-[0.2em] uppercase text-ink/40">
        <span>© MMXXVI · Atelier Essort</span>
        <span>Édition N° 01 — Première</span>
        <span>Cartographié à la main · Aluria</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Destinations, Manifeste, Footer });
