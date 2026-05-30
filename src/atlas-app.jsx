// L'Atlas d'Aluria — application shell & state.
const { useState: useStateA, useEffect: useEffectA, useCallback: useCallbackA } = React;

function App() {
  const [loaded, setLoaded] = useStateA(false);
  const [arrived, setArrived] = useStateA(false);
  const [hoveredId, setHoveredId] = useStateA(null);
  const [openId, setOpenId] = useStateA(null);
  const [cursorBig, setCursorBig] = useStateA(false);

  // reveal the site almost immediately — the kelp curtain is now the intro
  useEffectA(() => { const t = setTimeout(() => setLoaded(true), 150); return () => clearTimeout(t); }, []);

  // scroll lock + escape close while overlay open. NOTE: because the page sets
  // `html { overflow-x: hidden }`, the <html> element (not <body>) is the scroll
  // container, so body overflow:hidden alone won't stop the page from scrolling —
  // we must lock the documentElement too.
  useEffectA(() => {
    if (!openId) return;
    const root = document.documentElement;
    const prevRoot = root.style.overflowY;
    const prevBody = document.body.style.overflow;
    root.style.overflowY = "hidden";
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") setOpenId(null); };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflowY = prevRoot;
      document.body.style.overflow = prevBody;
      window.removeEventListener("keydown", onKey);
    };
  }, [openId]);

  const islands = window.ISLANDS;
  const curIdx = islands.findIndex((i) => i.id === openId);
  const island = curIdx >= 0 ? islands[curIdx] : null;
  const go = useCallbackA((dir) => {
    setOpenId((id) => {
      const i = islands.findIndex((x) => x.id === id);
      const n = (i + dir + islands.length) % islands.length;
      return islands[n].id;
    });
  }, [islands]);

  return (
    <div className="relative min-h-screen bg-abyss text-ink antialiased">{/* no overflow-x-hidden here: it would compute overflow-y:auto and break position:sticky in the hero; body handles horizontal clipping */}
      <window.CustomCursor big={cursorBig} />
      <window.GrainOverlay />

      <window.Nav show={loaded && arrived} setCursorBig={setCursorBig} />
      <window.Hero show={loaded} onArrived={setArrived} hoveredId={hoveredId} setHoveredId={setHoveredId}
        setOpenId={setOpenId} setCursorBig={setCursorBig} />
      <window.Destinations setOpenId={setOpenId} setCursorBig={setCursorBig} />
      <window.Manifeste />
      <window.Footer />

      {island && (
        <window.IslandOverlay island={island} setCursorBig={setCursorBig}
          onClose={() => { setOpenId(null); setCursorBig(false); }}
          onPrev={() => go(-1)} onNext={() => go(1)} onJump={(id) => setOpenId(id)} />
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
