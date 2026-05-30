// L'Atlas d'Aluria — shared helpers, hooks and atmospheric components.
const { useState, useEffect, useRef, useCallback, useMemo } = React;

/* ---------- environment hooks ---------- */
function useReducedMotion() {
  const [rm, setRm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setRm(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return rm;
}

function useFinePointer() {
  const [fine, setFine] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const on = () => setFine(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return fine;
}

/* ---------- Reveal: expo-eased fade-up, gate via `show` or IntersectionObserver ---------- */
function Reveal({
  children, show, inView = false, delay = 0, y = 28, duration = 1,
  as = "div", className = "", style = {}, once = true, ...rest
}) {
  const Tag = as;
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const gated = show !== undefined;
  const [vis, setVis] = useState(gated ? !!show : !inView);

  useEffect(() => { if (gated) setVis(!!show); }, [show, gated]);

  useEffect(() => {
    if (gated || !inView) return;
    const el = ref.current;
    if (!el) return;
    let done = false;
    const reveal = () => { if (!done) { done = true; setVis(true); cleanup(); } };
    const checkNow = () => {
      const r = el.getBoundingClientRect();
      if (r.top < (window.innerHeight || 0) * 0.92 && r.bottom > 0) { reveal(); return true; }
      return false;
    };
    const onScroll = () => { checkNow(); };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) reveal(); }),
      { rootMargin: "0px 0px -100px 0px", threshold: 0.05 }
    );
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const tid = setTimeout(checkNow, 120);
    function cleanup() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      io.disconnect();
    }
    return () => { clearTimeout(tid); cleanup(); };
  }, [gated, inView, once]);

  const ease = window.EASE_OUT;
  const t = reduced ? {} : {
    transition: `opacity ${duration}s ${ease} ${delay}s, transform ${duration}s ${ease} ${delay}s`,
    transform: vis ? "translateY(0)" : `translateY(${y}px)`,
  };
  return (
    <Tag ref={ref} className={className}
      style={{ opacity: reduced ? 1 : (vis ? 1 : 0), willChange: "opacity, transform", ...t, ...style }}
      {...rest}>
      {children}
    </Tag>
  );
}

/* ---------- MuxVideo: HLS stream into a <video> ---------- */
function MuxVideo({ playbackId, poster, className = "", play = true }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const src = `https://stream.mux.com/${playbackId}.m3u8`;
    let hls;
    const attachHls = () => {
      const H = window.Hls;
      if (H && H.isSupported()) {
        hls = new H({ enableWorker: true, lowLatencyMode: false, capLevelToPlayerSize: false });
        hls.loadSource(src);
        hls.attachMedia(video);
        // force the highest rendition so high-motion frames never drop quality
        hls.on(H.Events.MANIFEST_PARSED, () => {
          try { const top = hls.levels.length - 1; hls.startLevel = top; hls.currentLevel = top; } catch (e) {}
        });
      }
    };
    // Prefer hls.js whenever it can run (Chromium's canPlayType reports a misleading
    // "maybe" for HLS but cannot actually decode it) — only fall back to NATIVE HLS
    // (Safari/iOS) when hls.js is unsupported.
    if (window.Hls && window.Hls.isSupported()) {
      attachHls();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else {
      let s = document.getElementById("hlsjs-cdn");
      if (!s) {
        s = document.createElement("script");
        s.id = "hlsjs-cdn";
        s.src = "https://cdn.jsdelivr.net/npm/hls.js@1.5.13/dist/hls.min.js";
        document.head.appendChild(s);
      }
      s.addEventListener("load", attachHls);
      if (window.Hls) attachHls();
    }
    return () => { if (hls) hls.destroy(); };
  }, [playbackId, reduced]);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduced) return;
    if (play) v.play().catch(() => {});
    else v.pause();
  }, [play, reduced]);

  if (reduced) {
    return <img src={poster} alt="" className={className} />;
  }
  return (
    <video ref={ref} poster={poster} muted loop playsInline preload="auto" className={className} />
  );
}

/* ---------- CustomCursor: golden dot + ring tied directly to the real cursor ---------- */
function CustomCursor({ big }) {
  const fine = useFinePointer();
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!fine) return;
    const onMove = (e) => {
      const t = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px)`;
      if (dotRef.current) dotRef.current.style.transform = t;
      if (ringRef.current) ringRef.current.style.transform = t;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [fine]);

  if (!fine) return null;
  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" style={{ mixBlendMode: "difference" }}>
      <div ref={dotRef} className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-gold"
        style={{ opacity: big ? 0 : 1, transition: `opacity 0.3s ${window.EASE}` }} />
      {/* position is set instantly on mousemove; only the inner ring scales (animated) */}
      <div ref={ringRef} className="fixed top-0 left-0 flex items-center justify-center">
        <div className="rounded-full border border-gold/60"
          style={{ width: "24px", height: "24px",
            transform: `scale(${big ? 1.7 : 1})`, transition: `transform 0.3s ${window.EASE}` }} />
      </div>
    </div>
  );
}

/* ---------- GrainOverlay ---------- */
function GrainOverlay() {
  const reduced = useReducedMotion();
  const noise =
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  return (
    <div className="fixed inset-0 z-[9998] pointer-events-none opacity-[0.07]" style={{ mixBlendMode: "overlay" }}>
      <div style={{
        position: "absolute", top: "-50%", left: "-50%", width: "200%", height: "200%",
        backgroundImage: noise, backgroundSize: "220px 220px",
        animation: reduced ? "none" : "grainShift 8s steps(6) infinite",
      }} />
    </div>
  );
}

/* ---------- ChromaVideo: HLS video drawn to a canvas with the WHITE background keyed
   out to true transparency in real time (keeps the colourful subject). ---------- */
function ChromaVideo({ playbackId, poster, className = "", fallbackImg }) {
  const canvasRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const video = document.createElement("video");
    video.muted = true; video.loop = true; video.playsInline = true;
    video.crossOrigin = "anonymous"; video.preload = "auto";
    const src = `https://stream.mux.com/${playbackId}.m3u8`;
    let hls;
    const attachHls = () => {
      const H = window.Hls;
      if (H && H.isSupported()) { hls = new H({ enableWorker: true }); hls.loadSource(src); hls.attachMedia(video); }
    };
    if (window.Hls && window.Hls.isSupported()) attachHls();
    else if (video.canPlayType("application/vnd.apple.mpegurl")) video.src = src;
    else {
      let s = document.getElementById("hlsjs-cdn");
      if (s) s.addEventListener("load", attachHls);
    }
    const tryPlay = () => video.play().catch(() => {});
    video.addEventListener("loadeddata", tryPlay);
    tryPlay();

    const TARGET_W = 480;
    let raf, alphaBuf = null;
    const draw = () => {
      raf = requestAnimationFrame(draw);
      const vw = video.videoWidth, vh = video.videoHeight;
      if (!vw || !vh || video.readyState < 2) return;
      const w = TARGET_W, h = Math.round(TARGET_W * vh / vw);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      ctx.drawImage(video, 0, 0, w, h);
      let img;
      try { img = ctx.getImageData(0, 0, w, h); } catch (e) { return; }
      const d = img.data, n = w * h;
      if (!alphaBuf || alphaBuf.length !== n) alphaBuf = new Uint8ClampedArray(n);
      // pass 1 — key only the FRANK white field (bright + nearly grey); spare cream & coloured magic
      for (let p = 0; p < n; p++) {
        const i = p << 2, r = d[i], g = d[i + 1], b = d[i + 2];
        const mn = r < g ? (r < b ? r : b) : (g < b ? g : b);
        const mx = r > g ? (r > b ? r : b) : (g > b ? g : b);
        const sat = mx - mn;
        const bright = mn > 234 ? (mn - 234) / 21 : 0;   // 234→255
        const grey = sat < 22 ? (22 - sat) / 22 : 0;     // saturated colours (magic) survive
        let bg = bright * grey; if (bg > 1) bg = 1;
        alphaBuf[p] = 255 - (bg * 255 | 0);
      }
      // pass 2 — erode the matte by 1px (removes the white anti-aliased fringe) + spill clean-up
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const p = y * w + x; let a = alphaBuf[p];
          if (a > 0) {
            const up = y > 0 ? alphaBuf[p - w] : 0, dn = y < h - 1 ? alphaBuf[p + w] : 0;
            const lf = x > 0 ? alphaBuf[p - 1] : 0, rt = x < w - 1 ? alphaBuf[p + 1] : 0;
            let m = up; if (dn < m) m = dn; if (lf < m) m = lf; if (rt < m) m = rt;
            if (m < a) a = m;                              // 1px erosion
          }
          const i = p << 2;
          if (a < 250) {                                   // de-spill edge: pull whiteness down
            const k = a / 255;
            d[i] = d[i] * k; d[i + 1] = d[i + 1] * k; d[i + 2] = d[i + 2] * k;
          }
          d[i + 3] = a;
        }
      }
      ctx.putImageData(img, 0, 0);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      video.removeEventListener("loadeddata", tryPlay);
      if (hls) hls.destroy();
      try { video.pause(); video.removeAttribute("src"); video.load(); } catch (e) {}
    };
  }, [playbackId, reduced]);

  if (reduced) return fallbackImg ? <img src={fallbackImg} alt="" className={className} /> : null;
  return <canvas ref={canvasRef} className={className} />;
}

Object.assign(window, {
  useReducedMotion, useFinePointer, Reveal, MuxVideo, ChromaVideo, CustomCursor, GrainOverlay,
});
