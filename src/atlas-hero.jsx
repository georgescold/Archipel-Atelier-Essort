// L'Atlas d'Aluria — Preloader, Navigation and Hero (la carte vivante).
const { useState: useStateH, useEffect: useEffectH, useRef: useRefH } = React;

/* ---------- clip-up text reveal ---------- */
function ClipUp({ children, delay = 0, className = "" }) {
  const reduced = window.useReducedMotion();
  const [v, setV] = useStateH(false);
  useEffectH(() => { const t = setTimeout(() => setV(true), 20); return () => clearTimeout(t); }, []);
  return (
    <span className={"inline-block overflow-hidden align-bottom " + className}>
      <span className="inline-block" style={{
        transform: reduced ? "none" : (v ? "translateY(0)" : "translateY(110%)"),
        transition: `transform 1.1s ${window.EASE_OUT} ${delay}s`,
      }}>{children}</span>
    </span>
  );
}

/* ---------- PRELOADER ---------- */
function Preloader({ loaded }) {
  const [gone, setGone] = useStateH(false);
  useEffectH(() => {
    if (loaded) { const t = setTimeout(() => setGone(true), 1050); return () => clearTimeout(t); }
  }, [loaded]);
  if (gone) return null;
  return (
    <div className="fixed inset-0 z-[1000] bg-abyss-deep flex flex-col items-center justify-center px-6"
      style={{
        opacity: loaded ? 0 : 1,
        transform: loaded ? "scale(1.04)" : "scale(1)",
        transition: `opacity 1s ${window.EASE}, transform 1s ${window.EASE}`,
        pointerEvents: loaded ? "none" : "auto",
      }}>
      <div className="absolute w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(212,168,87,0.12), transparent 65%)", animation: "drift 12s ease-in-out infinite" }} />
      <window.Reveal delay={0} y={10} duration={0.9}
        className="relative text-[10px] font-mono tracking-[0.4em] uppercase text-gold/70 mb-7">
        Atelier Essort
      </window.Reveal>
      <h1 className="relative font-display text-ink text-[2.5rem] md:text-[4rem] font-light tracking-tight leading-none text-center">
        <ClipUp delay={0.3}>L'Atlas&nbsp;</ClipUp>
        <ClipUp delay={0.42}><span className="font-serif italic text-gold-bright">d'Aluria</span></ClipUp>
      </h1>
      <div className="relative h-px w-[180px] bg-gold origin-left mt-8"
        style={{ animation: `drawLine 1.6s ${window.EASE} 0.6s forwards`, transform: "scaleX(0)" }} />
      <window.Reveal delay={1} y={8} duration={0.8}
        className="relative mt-7 text-[10px] font-mono tracking-[0.3em] uppercase text-mist">
        Édition N° 01 — Première
      </window.Reveal>
    </div>
  );
}

/* ---------- live edition clock ---------- */
function EditionClock({ className = "" }) {
  const [t, setT] = useStateH("");
  useEffectH(() => {
    const tick = () => {
      const d = new Date();
      setT(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={"flex items-center gap-2 text-[11px] font-mono tracking-[0.12em] text-mist " + className}>
      <window.Compass size={13} className="text-gold" />
      <span className="uppercase">Édition vivante</span>
      <span className="text-ink/70 tabular-nums">{t}</span>
    </div>
  );
}

/* ---------- NAV ---------- */
function Nav({ show, setCursorBig }) {
  const [menu, setMenu] = useStateH(false);
  const [active, setActive] = useStateH(null);
  return (
    <header className="fixed top-0 inset-x-0 z-[80] flex items-center justify-between px-6 md:px-12 pt-7"
      style={{ opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none",
        transform: show ? "translateY(0)" : "translateY(-12px)",
        transition: `opacity 0.6s ${window.EASE}, transform 0.6s ${window.EASE}` }}
      aria-hidden={show ? "false" : "true"}>{/* hidden on the welcome screen, revealed once dived */}
      {/* wordmark */}
      <window.Reveal show={show} delay={0.4} y={-12} duration={0.9}>
        <a href="#explorer" className="block leading-none">
          <div className="font-display text-ink text-[19px] tracking-tight flex items-start">
            ALURIA
            <svg width="9" height="9" viewBox="0 0 24 24" className="ml-0.5 mt-0.5 text-gold" fill="currentColor">
              <path d="M12 2l2.2 6.8H21l-5.5 4 2.1 6.8L12 15.6 6.4 19.6l2.1-6.8L3 8.8h6.8z" />
            </svg>
          </div>
          <div className="text-[9px] font-mono tracking-[0.3em] text-mist uppercase mt-1">L'Atlas des Mondes Rêvés</div>
        </a>
      </window.Reveal>

      {/* center nav */}
      <window.Reveal show={show} delay={0.5} y={-12} duration={0.9}
        className="hidden xl:block">
        <nav className="glass rounded-full px-2 py-2 flex items-center gap-1">
          {window.NAV.map((item) => (
            <a key={item} href={"#" + item.toLowerCase().replace(/\s/g, "-")}
              onMouseEnter={() => { setActive(item); setCursorBig(true); }}
              onMouseLeave={() => { setActive(null); setCursorBig(false); }}
              className="relative text-[11px] font-mono tracking-[0.16em] uppercase text-ink/80 hover:text-ink px-4 py-1.5 rounded-full transition-colors duration-300">
              {item}
              <span className="absolute left-1/2 -translate-x-1/2 bottom-0.5 h-px bg-gold origin-center transition-transform duration-300"
                style={{ width: "60%", transform: `translateX(-50%) scaleX(${active === item ? 1 : 0})` }} />
            </a>
          ))}
        </nav>
      </window.Reveal>

      {/* right */}
      <window.Reveal show={show} delay={0.6} y={-12} duration={0.9} className="flex items-center">
        <EditionClock className="hidden xl:flex" />
        <button className="xl:hidden glass rounded-full p-2.5 text-ink"
          onMouseEnter={() => setCursorBig(true)} onMouseLeave={() => setCursorBig(false)}
          onClick={() => setMenu(true)} aria-label="Menu">
          <window.Menu size={18} />
        </button>
      </window.Reveal>

      {/* mobile sheet */}
      {menu && (
        <div className="fixed inset-0 z-[60] xl:hidden">
          <div className="absolute inset-0 bg-abyss/70" style={{ animation: `fade 0.4s ${window.EASE} both` }}
            onClick={() => setMenu(false)} />
          <div className="glass absolute bottom-0 inset-x-0 rounded-t-3xl px-8 pt-10 pb-12"
            style={{ animation: `sheetUp 0.5s ${window.EASE_OUT} both` }}>
            <div className="flex justify-between items-start mb-8">
              <div className="text-[9px] font-mono tracking-[0.3em] text-gold uppercase">Naviguer</div>
              <button onClick={() => setMenu(false)} className="text-ink"><window.X size={20} /></button>
            </div>
            <nav className="flex flex-col gap-5">
              {window.NAV.map((item) => (
                <a key={item} href={"#" + item.toLowerCase().replace(/\s/g, "-")} onClick={() => setMenu(false)}
                  className="font-display text-2xl text-ink/90">{item}</a>
              ))}
            </nav>
            <div className="mt-10 pt-6 border-t border-ink/10"><EditionClock /></div>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- portrait detection (matches the .atlas-stage CSS breakpoint) ---------- */
function usePortrait() {
  const [p, setP] = useStateH(false);
  useEffectH(() => {
    const mq = window.matchMedia("(max-aspect-ratio: 1 / 1)");
    const on = () => setP(mq.matches);
    on();
    mq.addEventListener("change", on);
    window.addEventListener("resize", on, { passive: true });
    window.addEventListener("orientationchange", on);
    return () => {
      mq.removeEventListener("change", on);
      window.removeEventListener("resize", on);
      window.removeEventListener("orientationchange", on);
    };
  }, []);
  return p;
}

/* ---------- parallax hook ---------- */
function useParallax(range = 22, stiffness = 60, damping = 20) {
  const elRef = useRefH(null);
  const target = useRefH({ x: 0, y: 0 });
  const cur = useRefH({ x: 0, y: 0 });
  const vel = useRefH({ x: 0, y: 0 });
  const reduced = window.useReducedMotion();
  useEffectH(() => {
    if (reduced) return;
    let raf; const k = stiffness, d = damping, dt = 1 / 60;
    const tick = () => {
      const c = cur.current, v = vel.current, tg = target.current;
      ["x", "y"].forEach((ax) => { const a = -k * (c[ax] - tg[ax]) - d * v[ax]; v[ax] += a * dt; c[ax] += v[ax] * dt; });
      if (elRef.current) elRef.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);
  const onMove = (e) => {
    const w = window.innerWidth, h = window.innerHeight;
    target.current.x = (e.clientX / w - 0.5) * 2 * -range;
    target.current.y = (e.clientY / h - 0.5) * 2 * -range;
  };
  return { elRef, onMove };
}

/* ---------- HERO — kelp curtain entrance: opens to reveal the world, scroll closes it ---------- */
function Hero({ show, onArrived, hoveredId, setHoveredId, setOpenId, setCursorBig }) {
  const [mapAlive, setMapAlive] = useStateH(false);
  const [scaleIn, setScaleIn] = useStateH(false);
  const [arrived, setArrived] = useStateH(false);    // dived → island cards interactive
  const reduced = window.useReducedMotion();
  const fine = window.useFinePointer();
  const portrait = usePortrait();

  const sceneRef = useRefH(null);
  const stickyRef = useRefH(null);
  const mapRef = useRefH(null);
  const veilRef = useRefH(null);
  const algLRef = useRefH(null);
  const algRRef = useRefH(null);
  const welcomeRef = useRefH(null);
  const mascotRef = useRefH(null);
  const heroRef = useRefH(null);
  const arrivedRef = useRefH(false);
  const pSmooth = useRefH(0);
  const mouse = useRefH({ target: { x: 0, y: 0 }, cur: { x: 0, y: 0 } });

  // archipel video breathes by default once revealed
  useEffectH(() => {
    if (!show) return;
    setMapAlive(true);
    const t = setTimeout(() => setScaleIn(true), 50);
    return () => clearTimeout(t);
  }, [show]);

  const openIsland = (id) => setOpenId(id);

  // the engine: one rAF reading scroll + mouse, writing styles via refs
  useEffectH(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const blurMax = fine ? 14 : 9;

    // reduced motion → forced DIVED state (p = 1): hero visible, cards live, scroll free
    if (reduced) {
      if (veilRef.current) veilRef.current.style.opacity = "0";
      if (mapRef.current) { mapRef.current.style.filter = "none"; mapRef.current.style.transform = "scale(1)"; }
      if (algLRef.current) { algLRef.current.style.opacity = "0"; algLRef.current.style.transform = "translateX(-140%)"; }
      if (algRRef.current) { algRRef.current.style.opacity = "0"; algRRef.current.style.transform = "translateX(140%)"; }
      if (welcomeRef.current) { welcomeRef.current.style.opacity = "0"; welcomeRef.current.style.pointerEvents = "none"; }
      if (mascotRef.current) mascotRef.current.style.opacity = "0";
      if (heroRef.current) { heroRef.current.style.opacity = "1"; heroRef.current.style.pointerEvents = "auto"; }
      arrivedRef.current = true; setArrived(true); if (onArrived) onArrived(true);
      return;
    }

    const frame = () => {
      const scene = sceneRef.current;
      if (!scene) return;
      const r = scene.getBoundingClientRect();
      // Use the sticky stage's own height (a stable CSS 100vh), NOT
      // window.innerHeight. On mobile the URL bar shows/hides while scrolling,
      // which changes window.innerHeight mid-dive and made the scroll progress
      // `p` (and therefore the map scale/blur, kelp, opacities) jump. The sticky
      // height stays constant, so the dive stays silky.
      const vpH = (stickyRef.current && stickyRef.current.offsetHeight) || window.innerHeight;
      const pTarget = clamp(-r.top / (r.height - vpH), 0, 1);
      // silky: glide p toward its target a beat after the wheel stops
      pSmooth.current = lerp(pSmooth.current, pTarget, 0.13);
      const p = Math.abs(pSmooth.current - pTarget) < 0.0006 ? pTarget : pSmooth.current;
      const pe = easeInOut(p);

      // smooth mouse
      const m = mouse.current;
      m.cur.x = lerp(m.cur.x, m.target.x, 0.08);
      m.cur.y = lerp(m.cur.y, m.target.y, 0.08);
      const mx = fine ? m.cur.x : 0, my = fine ? m.cur.y : 0;

      // DARK VEIL — light wash at landing, eased away (no abrupt reveal)
      if (veilRef.current) veilRef.current.style.opacity = 0.22 * (1 - easeInOut(clamp(p / 0.4, 0, 1)));

      // ARCHIPEL — clarity eased (easeInOut) so blur/brightness glide gently into full
      // sharpness near arrival instead of snapping clear at the end.
      const blur = lerp(blurMax, 0, easeInOut(clamp(p / 0.66, 0, 1)));
      const bright = lerp(0.82, 1, easeInOut(clamp(p / 0.55, 0, 1)));
      const sMap = lerp(1.06, 1.0, pe);
      if (mapRef.current) {
        mapRef.current.style.filter =
          (blur > 0.3 || bright < 0.995) ? `blur(${blur.toFixed(1)}px) brightness(${bright.toFixed(3)})` : "none";
        mapRef.current.style.transform = `scale(${sMap})`;
      }

      // KELP — covering at landing, slide off-screen as we dive
      const shiftL = lerp(-4, -140, pe);
      const shiftR = lerp(4, 140, pe);
      const sK = lerp(1.0, 1.3, pe);
      const opK = 1 - easeInOut(clamp((p - 0.4) / 0.34, 0, 1));
      if (algLRef.current) {
        algLRef.current.style.transform = `translate(calc(${shiftL}% + ${mx * 16}px), ${my * 16 * 0.3}px) scale(${sK})`;
        algLRef.current.style.opacity = opK;
      }
      if (algRRef.current) {
        algRRef.current.style.transform = `translate(calc(${shiftR}% + ${mx * 16}px), ${my * 16 * 0.3}px) scale(${sK})`;
        algRRef.current.style.opacity = opK;
      }

      // WELCOME copy — fades out the instant the dive begins
      const opW = clamp(1 - p / 0.18, 0, 1);
      if (welcomeRef.current) {
        welcomeRef.current.style.opacity = opW;
        welcomeRef.current.style.transform = `translateY(${lerp(0, -20, pe)}px) scale(${lerp(1, 0.96, p)})`;
        welcomeRef.current.style.pointerEvents = "none";
      }
      if (mascotRef.current) {
        mascotRef.current.style.opacity = opW;
        mascotRef.current.style.transform = `translateX(-50%) translateY(${lerp(0, 26, pe)}px)`;
      }

      // HERO copy — fades in as the archipel is revealed
      const opH = clamp((p - 0.58) / 0.14, 0, 1);
      if (heroRef.current) {
        heroRef.current.style.opacity = opH;
        heroRef.current.style.transform = `translateY(${lerp(16, 0, opH)}px)`;
        heroRef.current.style.pointerEvents = "none";
      }

      const isArrived = p >= 0.72;
      if (isArrived !== arrivedRef.current) { arrivedRef.current = isArrived; setArrived(isArrived); if (onArrived) onArrived(isArrived); }
    };

    let loopId = requestAnimationFrame(function loop() { frame(); loopId = requestAnimationFrame(loop); });
    const onResize = () => frame();
    window.addEventListener("resize", onResize, { passive: true });
    return () => { cancelAnimationFrame(loopId); window.removeEventListener("resize", onResize); };
  }, [reduced, fine]);

  const onMove = (e) => {
    if (!fine) return;
    mouse.current.target.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.target.y = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  // Desktop: wide curtains that meet behind the mascot. Mobile portrait: each
  // side spans half the width so left + right meet cleanly at centre (no bright
  // screen-blend overlap band, which was the visible vertical seam on phones).
  const kelpW = portrait ? "50vw" : "clamp(340px, 62vw, 880px)";
  // Portrait: feather the kelp's inner (meeting) edges so the two halves blend
  // softly at the centre instead of showing a hard mirror seam, and feather the
  // map band's top/bottom edges so it melts into the dark rather than reading as
  // a sharp rectangle. Desktop keeps its full curtains (no mask).
  const kelpFadeL = portrait ? "linear-gradient(to right, #000 60%, transparent 100%)" : "none";
  const kelpFadeR = portrait ? "linear-gradient(to left, #000 60%, transparent 100%)" : "none";
  const mapFade = portrait
    ? "linear-gradient(to bottom, transparent 0%, #000 12%, #000 88%, transparent 100%)"
    : "none";

  return (
    <section id="explorer" ref={sceneRef}
      className="relative w-full"
      style={{ height: reduced ? "100vh" : (fine ? "240vh" : "220vh") }}
      onMouseMove={fine ? onMove : undefined}>
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
        <window.Reveal show={show} delay={0.1} duration={1.1} y={0} className="absolute inset-0">

          {/* z-0 — MAP stage (shared 16:9 box: whole map fits on mobile, cover on desktop).
              overflow-hidden clips the subtle scale overscan so the map never bleeds
              into the dark letterbox on portrait. */}
          <div className="atlas-stage z-0 overflow-hidden" style={{ maskImage: mapFade, WebkitMaskImage: mapFade }}>
            <div className="absolute inset-0" ref={mapRef}
              style={{ transformOrigin: "center", willChange: "transform, filter", transform: "scale(1.04)", filter: `blur(${fine ? 14 : 9}px) brightness(0.82)` }}>
              <div className="absolute inset-0" style={{
                transform: reduced ? "none" : (scaleIn ? "scale(1)" : "scale(1.06)"),
                transition: `transform 2.4s ${window.EASE_OUT}`,
              }}>
                <img src={window.ARCHIPEL.image} alt="Carte de l'archipel d'Aluria"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: mapAlive ? 0 : 1, transition: `opacity 0.9s ${window.EASE}` }} />
                <div className="absolute inset-0" style={{ opacity: mapAlive ? 1 : 0, transition: `opacity 0.9s ${window.EASE}` }}>
                  <window.MuxVideo playbackId={window.ARCHIPEL.playbackId} poster={window.ARCHIPEL.image}
                    play={true} className="absolute inset-0 w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* z-15 — DARK VEIL (truly hides the archipel at the landing) */}
          <div ref={veilRef} className="absolute inset-0 z-[15] pointer-events-none"
            style={{ background: "var(--color-abyss-deep)", opacity: 0.22, willChange: "opacity" }} />

          {/* z-16 — scrims + vignette (above the veil) */}
          <div className="absolute inset-0 z-[16] pointer-events-none"
            style={{ background: "radial-gradient(120% 120% at 50% 45%, transparent 55%, rgba(6,9,18,0.85) 100%)" }} />
          <div className="absolute top-0 inset-x-0 h-48 z-[16] pointer-events-none bg-gradient-to-b from-abyss/80 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-64 z-[16] pointer-events-none bg-gradient-to-t from-abyss via-abyss/50 to-transparent" />

          {/* z-20 — KELP curtains (start COVERING inline → no archipel flash) */}
          <img src={window.ALGUES.left} ref={algLRef} alt="" aria-hidden="true"
            style={{ position: "absolute", top: 0, bottom: 0, left: 0, height: "100%",
              width: kelpW, objectFit: "cover", objectPosition: "left center",
              mixBlendMode: "screen", transformOrigin: "left center", zIndex: 20,
              pointerEvents: "none", willChange: "transform, opacity",
              maskImage: kelpFadeL, WebkitMaskImage: kelpFadeL,
              transform: "translateX(-4%) scale(1)", opacity: 1 }} />
          <img src={window.ALGUES.right} ref={algRRef} alt="" aria-hidden="true"
            style={{ position: "absolute", top: 0, bottom: 0, right: 0, height: "100%",
              width: kelpW, objectFit: "cover", objectPosition: "right center",
              mixBlendMode: "screen", transformOrigin: "right center", zIndex: 20,
              pointerEvents: "none", willChange: "transform, opacity",
              maskImage: kelpFadeR, WebkitMaskImage: kelpFadeR,
              transform: "translateX(4%) scale(1)", opacity: 1 }} />

          {/* z-[22] — Essort mascot as a luminous medallion at the kelp junction (pristine video) */}
          <div ref={mascotRef} className="absolute bottom-4 left-1/2 z-[22] pointer-events-none"
            style={{ transform: "translateX(-50%)", willChange: "transform, opacity" }}>
            <div className="relative w-[156px] md:w-[196px] aspect-square rounded-full overflow-hidden"
              style={{ background: "var(--color-abyss-deep)", boxShadow: "0 0 0 2px rgba(212,168,87,0.55), 0 0 0 6px rgba(212,168,87,0.14), 0 22px 50px -14px rgba(0,0,0,0.7), 0 0 60px -10px rgba(212,168,87,0.35)" }}>
              <window.MuxVideo playbackId={window.MASCOT_PLAYBACK} play={true}
                className="absolute inset-0 w-full h-full object-cover scale-105" />
              {/* blend the medallion's bright field into the night at the rim */}
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 46%, transparent 52%, rgba(10,14,26,0.5) 74%, rgba(6,9,18,0.96) 100%)" }} />
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ boxShadow: "inset 0 0 30px 8px rgba(6,9,18,0.55)" }} />
            </div>
          </div>

          {/* z-[25] — spotlight dimmer (only on card hover; backdrop blur applied ONLY when shown) */}
          {/* z-[25] — spotlight dimmer (subtle darken only on card hover; NO blur) */}
          <div className="absolute inset-0 z-[25] pointer-events-none bg-abyss/18"
            style={{ opacity: hoveredId ? 1 : 0, transition: `opacity 0.5s ${window.EASE}` }} />

          {/* z-30 — ISLAND CARDS (interactive once dived) — same 16:9 stage as the
              map so each parchment stays glued to its island at any screen size */}
          <div className="atlas-stage z-30"
            style={{ opacity: arrived ? 1 : 0, pointerEvents: arrived ? "auto" : "none",
              transition: `opacity 0.6s ${window.EASE}` }}>
            {window.ISLANDS.map((isl, i) => (
              <IslandMapCard key={isl.id} island={isl} i={i} fine={fine} reduced={reduced} portrait={portrait}
                hoveredId={hoveredId} setHoveredId={setHoveredId} setOpenId={openIsland} setCursorBig={setCursorBig} />
            ))}
          </div>

          {/* z-40 — WELCOME copy (centered, covers the landing) */}
          <div ref={welcomeRef} className="absolute inset-0 z-40 flex flex-col items-center justify-center text-center px-6"
            style={{ willChange: "transform, opacity", opacity: 1 }}>
            {/* luminous halo lifts the copy off the busy kelp */}
            <div className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{ width: "min(720px, 86vw)", height: "min(440px, 56vh)",
                background: "radial-gradient(ellipse, rgba(8,12,22,0.92), rgba(8,12,22,0.62) 38%, rgba(8,12,22,0) 72%)",
                transform: "translate(-50%,-50%)" }} />
            <div className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{ width: "min(560px, 78vw)", height: "min(560px, 78vw)",
                background: "radial-gradient(circle, rgba(212,168,87,0.16), rgba(212,168,87,0) 60%)",
                animation: `haloPulse 7s ${window.EASE} infinite` }} />

            <div className="relative flex flex-col items-center">
              <div className="flex items-center gap-3 mb-7">
                <span className="w-8 h-px bg-gold/50" />
                <span className="text-[10px] md:text-[11px] font-mono tracking-[0.4em] uppercase text-gold-bright">L'Atlas d'Aluria · Atelier Essort</span>
                <span className="w-8 h-px bg-gold/50" />
              </div>
              <h2 className="font-display text-[clamp(2rem,8.5vw,2.7rem)] md:text-[4.6rem] font-light tracking-tight text-ink leading-[1.02]"
                style={{ animation: `titleGlow 6s ${window.EASE} infinite` }}>
                Scroll pour <span className="italic font-serif shimmer-gold">découvrir…</span>
              </h2>
              <span className="relative w-px h-12 overflow-hidden mt-11"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(212,168,87,0.7), transparent)" }}>
                <span className="absolute left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-bright"
                  style={{ animation: `scrollDot 2s ${window.EASE} infinite`, boxShadow: "0 0 8px rgba(236,202,126,0.8)" }} />
              </span>
            </div>
          </div>

          {/* z-40 — HERO copy (bottom-left, opacity driven by scroll) */}
          <div ref={heroRef} className="absolute inset-0 z-40"
            style={{ willChange: "transform, opacity", opacity: 0, pointerEvents: "none" }}>
            <div className="hero-copy absolute bottom-0 left-0 px-6 md:px-12 pb-12 md:pb-16 max-w-[640px]">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-gold">01 / Atlas</span>
                <span className="w-12 h-px bg-gold/40" />
              </div>
              <h2 className="font-display text-[clamp(1.9rem,8vw,2.6rem)] md:text-[4.4rem] leading-[0.98] font-light tracking-tight text-ink">
                <span className="block whitespace-nowrap">Un monde rêvé,</span>
                <span className="block whitespace-nowrap italic font-serif text-gold-bright">île par île.</span>
              </h2>
              <p className="font-sans text-[14px] md:text-[15px] text-mist leading-relaxed max-w-[440px] mt-6">
                Survolez une contrée pour l'éveiller, cliquez pour y entrer.
              </p>
            </div>
            <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-end gap-1 text-[10px] font-mono tracking-[0.2em] uppercase text-ink/45">
              <span className="text-gold-bright">Atelier Essort</span>
              <span>Édition N° 01 — Première</span>
            </div>
          </div>

        </window.Reveal>
      </div>
    </section>
  );
}

/* ---------- per-island engraved motif (line art evoking each island's story) ---------- */
function IslandMotif({ id, ink }) {
  const common = { fill: "none", stroke: ink, strokeWidth: 1.1, strokeLinecap: "round", strokeLinejoin: "round" };
  if (id === "mirelune") {
    // crescent moon, rising paper lanterns, still lagoon line
    return (
      <svg viewBox="0 0 40 56" className="w-full h-full">
        <path d="M27 11a8 8 0 1 0 5 9 6.5 6.5 0 0 1-5-9Z" {...common} />
        <g {...common}><rect x="9" y="22" width="5" height="6" rx="1" /><rect x="17" y="29" width="4.5" height="5.5" rx="1" /><rect x="24" y="24" width="4" height="5" rx="1" /></g>
        <path d="M6 44h28M10 48h20" {...common} strokeOpacity="0.6" />
      </svg>
    );
  }
  if (id === "hespera") {
    // low sun with rays over rolling fields + a windmill
    return (
      <svg viewBox="0 0 48 56" className="w-full h-full">
        <circle cx="24" cy="22" r="6" {...common} />
        <path d="M24 11v-4M24 37v3M13 22H9M39 22h-4M16 14l-2.5-2.5M32 14l2.5-2.5" {...common} strokeOpacity="0.7" />
        <path d="M5 44c8-5 16-5 24 0s11 3 14 1" {...common} />
        <path d="M37 44V31M37 31l5-3M37 31l-5-3M37 31l3 5M37 31l-3-5" {...common} strokeWidth="0.9" />
      </svg>
    );
  }
  if (id === "sarvane") {
    // tiered pagoda climbing, hanging lanterns
    return (
      <svg viewBox="0 0 40 56" className="w-full h-full">
        <path d="M9 18h22l-4 4H13zM12 26h16l-3 4H15zM15 33h10l-2 4h-6z" {...common} />
        <path d="M20 11l9 7H11z" {...common} />
        <path d="M20 41v8" {...common} />
        <circle cx="13" cy="46" r="1.6" {...common} /><circle cx="27" cy="46" r="1.6" {...common} />
      </svg>
    );
  }
  // onyrie — floating cliffs, rope bridge, a wind bird
  return (
    <svg viewBox="0 0 48 56" className="w-full h-full">
      <path d="M7 26h12l-3 7-7-1z" {...common} /><path d="M30 22h11l-2 6-7 1z" {...common} />
      <path d="M19 30c4 4 7 4 11 0" {...common} strokeOpacity="0.7" strokeDasharray="1.5 2.5" />
      <path d="M11 33v9M16 32v9M35 29v9M39 29v8" {...common} strokeWidth="0.8" strokeOpacity="0.6" />
      <path d="M20 14c2-2 3-2 5 0 2-2 3-2 5 0" {...common} strokeWidth="0.9" />
    </svg>
  );
}

/* ---------- ISLAND MAP CARD — closed parchment card that unfolds into a living card ---------- */
function IslandMapCard({ island: isl, i, fine, reduced, portrait, hoveredId, setHoveredId, setOpenId, setCursorBig }) {
  const on = hoveredId === isl.id;
  const cfg = isl.card || { w: 56, ratio: "3 / 4", tiltY: -18, tiltX: 6, motif: isl.id };
  // On phones the whole map is fitted to the band, so islands sit much closer
  // together — size each parchment as a CONSTANT fraction of the band width (not
  // a fixed px), so the spacing-to-size ratio is identical on a 320px phone, a
  // 412px phone or a tablet → no overlap at any width. Calibrated so it matches
  // the 0.6× sizing that was verified non-overlapping at a 375px band.
  const bandW = Math.min(window.innerWidth, window.innerHeight * 0.46 * 16 / 9);
  const cardW = portrait ? Math.round(cfg.w * 0.6 * bandW / 375) : cfg.w;
  // preview flip computed from the parchment's REAL on-screen position (works with manual placement)
  const [flip, setFlip] = useStateH({ h: isl.map.x >= 50 ? "left" : "right", v: isl.map.y >= 50 ? "up" : "down" });

  const enter = (e) => {
    if (!fine) return;
    const r = e.currentTarget.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    setFlip({ h: cx > window.innerWidth / 2 ? "left" : "right", v: cy > window.innerHeight / 2 ? "up" : "down" });
    setHoveredId(isl.id); setCursorBig(true);
  };
  const leave = () => { if (!fine) return; setHoveredId((c) => (c === isl.id ? null : c)); setCursorBig(false); };

  // place the preview FULLY outside the parchment box (never overlapping):
  // top anchor clears the parchment's half-height; side anchors sit beside, vertically centred.
  const topAnchor = cfg.previewAnchor === "top";
  const halfH = cfg.w * 0.36;   // parchment art is ~0.71× as tall as wide
  const gap = 12;
  const tx = topAnchor ? "-50%" : (flip.h === "left" ? `calc(-100% - ${cfg.w / 2 + gap}px)` : `${cfg.w / 2 + gap}px`);
  const ty = topAnchor ? `calc(-100% - ${halfH + gap}px)` : "-50%";
  const origin = topAnchor ? "bottom center" : `${flip.h === "left" ? "right" : "left"} center`;

  return (
    <div className="absolute z-30 pointer-events-none"
      style={{ left: `${isl.map.x}%`, top: `${isl.map.y}%`,
        transform: "translate(-50%, -50%)" }}>

      {/* CLOSED parchment card — static (no float, stays visible on hover) */}
      <button className="block pointer-events-auto"
        style={{ perspective: "760px" }}
        onMouseEnter={enter} onMouseLeave={leave}
        onClick={() => setOpenId(isl.id)} aria-label={isl.name}>
        <div className="relative"
          style={{
            width: `${cardW}px`, transformOrigin: "center",
            transform: `rotateY(${cfg.tiltY}deg) rotateX(${cfg.tiltX}deg) scale(${on ? 1.08 : 1})`,
            transition: `transform 0.3s ${window.EASE_OUT}`,
            filter: "drop-shadow(0 0 9px rgba(212,168,87,0.3)) drop-shadow(5px 9px 11px rgba(0,0,0,0.6))",
          }}>
          {/* soft accent halo lifts the parchment off the dark water (no size change) */}
          <div className="absolute -inset-[12%] pointer-events-none"
            style={{ background: `radial-gradient(ellipse at center, ${isl.glow}, transparent 66%)`,
              filter: "blur(9px)", opacity: on ? 0.75 : 0.5, transition: `opacity 0.3s ${window.EASE_OUT}` }} />
          {/* bespoke per-island parchment artwork */}
          <img src={isl.cardImg} alt={isl.name} className="relative block w-full h-auto select-none"
            draggable="false" decoding="async" style={{ filter: "brightness(1.06) contrast(1.04) saturate(1.05)" }} />
        </div>
      </button>

      {/* ISLAND PREVIEW — appears beside the parchment on hover, flipped toward the edge */}
      {fine && (
        <div className="absolute top-1/2 left-1/2"
          style={{
            transform: `translate(${tx}, ${ty}) scale(${on ? 1 : 0.92})`,
            transformOrigin: origin, opacity: on ? 1 : 0, zIndex: 36,
            pointerEvents: on ? "auto" : "none",
            transition: `opacity 0.35s ${window.EASE_OUT}, transform 0.35s ${window.EASE_OUT}` }}
          onMouseEnter={enter} onMouseLeave={leave} onClick={() => setOpenId(isl.id)}>
          <div className="relative w-[200px] aspect-[16/10] rounded-lg overflow-hidden bg-abyss-deep ring-1 ring-gold/55 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.75)]">
            <img src={isl.image} alt={isl.name} className="absolute inset-0 w-full h-full object-cover" decoding="async" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-abyss/90 via-abyss/25 to-transparent" />
            <div className="absolute left-0 bottom-0 p-3">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-[9px] tracking-[0.2em] text-gold">N° {isl.numeral}</span>
                <span className="font-display text-[18px] leading-none text-ink">{isl.name}</span>
              </div>
              <span className="mt-1.5 inline-flex items-center gap-1 text-[8px] font-mono tracking-[0.25em] uppercase text-gold">
                Explorer <window.ArrowRight size={10} />
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Preloader, Nav, Hero });
