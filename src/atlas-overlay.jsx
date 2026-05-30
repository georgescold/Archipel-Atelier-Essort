// L'Atlas d'Aluria — full-screen island overlay (carnet de voyage).
const { useState: useStateO, useEffect: useEffectO } = React;

/* per-letter rising title — driven by `on` (transition) so it never stalls */
function LetterReveal({ text, delayBase = 0, on = true }) {
  const reduced = window.useReducedMotion();
  return [...text].map((ch, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom" style={{ lineHeight: 0.9 }}>
      <span className="inline-block" style={{
        opacity: reduced ? 1 : (on ? 1 : 0),
        transform: reduced ? "none" : (on ? "translateY(0)" : "translateY(110%)"),
        transition: `opacity 0.9s ${window.EASE_OUT} ${delayBase + i * 0.03}s, transform 0.9s ${window.EASE_OUT} ${delayBase + i * 0.03}s`,
      }}>{ch === " " ? "\u00A0" : ch}</span>
    </span>
  ));
}

function IslandOverlay({ island, onClose, onPrev, onNext, onJump, setCursorBig }) {
  const [vis, setVis] = useStateO(false);
  const [leaving, setLeaving] = useStateO(false);
  useEffectO(() => { const t = setTimeout(() => setVis(true), 20); return () => clearTimeout(t); }, []);

  const close = () => { setLeaving(true); setTimeout(onClose, 460); };
  const idx = window.ISLANDS.findIndex((i) => i.id === island.id);
  const total = window.ISLANDS.length;
  const open = vis && !leaving;

  return (
    <div className="fixed inset-0 z-[100] bg-abyss-deep"
      style={{ opacity: open ? 1 : 0, transition: `opacity 0.5s ${window.EASE}` }}>
      {/* background video (keyed → re-mounts & re-reveals per island) */}
      <div key={island.id} className="absolute inset-0"
        style={{ transform: open ? "scale(1)" : "scale(1.08)", transition: `transform 0.7s ${window.EASE_OUT}` }}>
        <window.MuxVideo playbackId={island.playbackId} poster={island.image} play={true}
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss via-abyss/20 to-transparent" />
      </div>

      {/* drawn gold hairline frame */}
      <div className="absolute inset-4 md:inset-6 border border-gold/25 rounded-lg pointer-events-none"
        style={{ opacity: open ? 1 : 0, transform: open ? "scale(1)" : "scale(0.985)",
          transition: `opacity 0.8s ${window.EASE} 0.15s, transform 0.8s ${window.EASE_OUT} 0.15s` }} />

      {/* top bar */}
      <div className="absolute top-0 inset-x-0 z-10 px-6 md:px-12 pt-7 flex justify-between items-start"
        style={{ opacity: open ? 1 : 0, transition: `opacity 0.5s ${window.EASE} 0.25s` }}>
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold">Carnet de voyage / N° {island.numeral}</span>
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-mist">{island.coords}</span>
        </div>
        <button onClick={close}
          onMouseEnter={() => setCursorBig && setCursorBig(true)} onMouseLeave={() => setCursorBig && setCursorBig(false)}
          className="glass rounded-full pl-4 pr-2 py-2 flex items-center gap-2 text-ink hover:text-gold transition-colors duration-300 group">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase">Fermer</span>
          <span className="w-6 h-6 rounded-full border border-ink/30 flex items-center justify-center group-hover:border-gold/60 transition-colors"><window.X size={13} /></span>
        </button>
      </div>

      {/* content block */}
      <div key={"c" + island.id} className="absolute left-0 bottom-0 z-10 px-6 md:px-16 pb-14 md:pb-20 max-w-[680px]">
        <div className="flex items-center gap-3 mb-5" style={{ opacity: open ? 1 : 0, transition: `opacity 0.6s ${window.EASE} 0.2s` }}>
          <span className="w-2 h-2 rounded-full" style={{ background: island.accent, boxShadow: `0 0 12px ${island.glow}` }} />
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: island.accent }}>{island.tagline}</span>
        </div>
        <h2 className="font-display text-[3.4rem] md:text-[6rem] font-light leading-[0.9] tracking-tight text-ink flex flex-wrap">
          <LetterReveal text={island.name} delayBase={0.25} on={open} />
        </h2>
        <p className="font-serif italic text-[1.25rem] md:text-[1.7rem] text-ink/90 leading-snug mt-6"
          style={{ opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(16px)", transition: `all 0.8s ${window.EASE_OUT} 0.45s` }}>
          « {island.quote} »
        </p>
        <p className="font-sans text-[14px] md:text-[15px] text-mist leading-relaxed max-w-[460px] mt-5"
          style={{ opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(16px)", transition: `all 0.8s ${window.EASE_OUT} 0.55s` }}>
          {island.description}
        </p>
        {/* carnet grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 mt-9 max-w-[560px]">
          {island.carnet.map((c, i) => (
            <div key={c.label} className="border-t border-ink/15 pt-3"
              style={{ opacity: open ? 1 : 0, transform: open ? "translateY(0)" : "translateY(14px)",
                transition: `all 0.7s ${window.EASE_OUT} ${0.65 + i * 0.08}s` }}>
              <div className="text-[9px] font-mono tracking-[0.2em] uppercase text-gold/80">{c.label}</div>
              <div className="font-sans text-[13px] text-ink/90 mt-1.5 leading-snug">{c.value}</div>
            </div>
          ))}
        </div>
        {/* CTA */}
        <div className="mt-10" style={{ opacity: open ? 1 : 0, transition: `opacity 0.7s ${window.EASE} 0.9s` }}>
          <button onMouseEnter={() => setCursorBig && setCursorBig(true)} onMouseLeave={() => setCursorBig && setCursorBig(false)}
            className="group glass rounded-full pl-6 pr-2 py-2 flex items-center gap-5">
            <span className="relative overflow-hidden h-5 inline-block">
              <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-1/2">
                <span className="block h-5 leading-5 text-[12px] font-mono tracking-[0.18em] uppercase text-ink">Ouvrir le carnet</span>
                <span className="block h-5 leading-5 text-[12px] font-mono tracking-[0.18em] uppercase text-gold">Ouvrir le carnet</span>
              </span>
            </span>
            <span className="w-8 h-8 rounded-full bg-gold flex items-center justify-center text-abyss">
              <window.ArrowUpRight size={16} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-out" />
            </span>
          </button>
        </div>
      </div>

      {/* right rail nav */}
      <div className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-5"
        style={{ opacity: open ? 1 : 0, transition: `opacity 0.6s ${window.EASE} 0.35s` }}>
        <button onClick={onPrev} onMouseEnter={() => setCursorBig && setCursorBig(true)} onMouseLeave={() => setCursorBig && setCursorBig(false)}
          className="glass rounded-full w-11 h-11 flex items-center justify-center text-ink hover:text-gold transition-colors"><window.ChevronUp size={18} /></button>
        <div className="flex flex-col items-center gap-3 py-1">
          {window.ISLANDS.map((isl) => {
            const cur = isl.id === island.id;
            return (
              <button key={isl.id} onClick={() => onJump(isl.id)}
                onMouseEnter={() => setCursorBig && setCursorBig(true)} onMouseLeave={() => setCursorBig && setCursorBig(false)}
                className="text-[11px] font-mono tracking-[0.15em] transition-colors duration-300"
                style={{ color: cur ? "var(--color-gold)" : "rgba(143,163,184,0.5)" }}>
                {cur ? <span className="inline-flex items-center justify-center w-7 h-7 rounded-full border border-gold/50">{isl.numeral}</span> : isl.numeral}
              </button>
            );
          })}
        </div>
        <button onClick={onNext} onMouseEnter={() => setCursorBig && setCursorBig(true)} onMouseLeave={() => setCursorBig && setCursorBig(false)}
          className="glass rounded-full w-11 h-11 flex items-center justify-center text-ink hover:text-gold transition-colors"><window.ChevronDown size={18} /></button>
      </div>

      {/* bottom progress strip */}
      <div className="absolute bottom-6 right-6 md:right-12 z-10 text-[10px] font-mono tracking-[0.25em] text-gold"
        style={{ opacity: open ? 1 : 0, transition: `opacity 0.5s ${window.EASE} 0.4s` }}>
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}

Object.assign(window, { IslandOverlay });
