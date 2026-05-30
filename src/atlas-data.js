// L'Atlas d'Aluria — data module. Exposes globals consumed by the JSX files.
window.ISLANDS = [
  {
    id: "mirelune",
    name: "Mirelune",
    numeral: "I",
    tagline: "L'île aux lanternes flottantes",
    quote: "Ici, la nuit ne tombe jamais tout à fait — elle scintille.",
    description:
      "Un lagon phosphorescent veille sous une lune éternelle. Les lanternes de papier montent vers les aurores, et l'on dit qu'un cerf d'argent traverse les eaux sans jamais les troubler.",
    coords: "14°N · 88°O",
    accent: "#9db4e8",
    glow: "rgba(157,180,232,0.55)",
    map: { x: 22, y: 56 },
    carnet: [
      { label: "Climat", value: "Nuit douce, perpétuelle" },
      { label: "Esprit gardien", value: "Le Cerf d'Argent" },
      { label: "À voir", value: "L'observatoire des étoiles · le lagon phosphorescent" },
    ],
    image: "https://i.postimg.cc/ncxcWTwQ/Mirelune-compresse.jpg",
    playbackId: "02RkBGcdp022uUyQVuyPXrtjtS97wR02i2g4t01M89NFIaQ",
    // tall, slender card — lanterns rising into eternal night
    card: { w: 116, ratio: "5 / 8", tiltY: -18, tiltX: 6, motif: "mirelune" },
    cardImg: "assets/Parchemin-Mirelune.png",
  },
  {
    id: "hespera",
    name: "Hespera",
    numeral: "II",
    tagline: "La vallée où le soleil s'attarde",
    quote: "Le crépuscule y dure mille ans, et personne ne s'en plaint.",
    description:
      "Des champs d'or ondulent jusqu'à l'horizon, ponctués de moulins et de lanternes suspendues à un arbre immense. Au loin, un château marche lentement dans la lumière du couchant.",
    coords: "31°N · 12°E",
    accent: "#e6b365",
    glow: "rgba(230,179,101,0.55)",
    map: { x: 32, y: 30 },
    carnet: [
      { label: "Climat", value: "Heure dorée éternelle" },
      { label: "Esprit gardien", value: "Le Renard-Lumière" },
      { label: "À voir", value: "Le grand arbre aux lanternes · les moulins du couchant" },
    ],
    image: "https://i.postimg.cc/43y35d27/Hespera-compresse.jpg",
    playbackId: "PaGWIEXVcdGgbJuR0002Fj5xOgt00Lz2FZ4UISj4Qh5D8c",
    // wider, calmer card — the long golden valley
    card: { w: 134, ratio: "5 / 6", tiltY: 15, tiltX: 5, motif: "hespera", previewAnchor: "top" },
    cardImg: "assets/Parchemin-Hespera.png",
  },
  {
    id: "sarvane",
    name: "Sarvane",
    numeral: "III",
    tagline: "La cité qui ne dort jamais",
    quote: "Mille lanternes, mille histoires, mille saveurs.",
    description:
      "Une cité portuaire grimpe à flanc de montagne, étagée de toits-jardins et de mille lanternes rouges. Au pied de la pagode dorée, un marché flottant fume de cent festins.",
    coords: "22°N · 114°E",
    accent: "#e8895a",
    glow: "rgba(232,137,90,0.55)",
    map: { x: 56, y: 42 },
    carnet: [
      { label: "Climat", value: "Crépuscule de fête" },
      { label: "Esprit gardien", value: "Le Lampion Vagabond" },
      { label: "À voir", value: "Le marché flottant · la pagode aux mille feux" },
    ],
    image: "https://i.postimg.cc/yxv5vVbj/Saravane-compresse.jpg",
    playbackId: "I8I1Bh00dXBoLh1Ckd2Y2PsZAo6vkcYFz2fcb7Xf2VRo",
    // tall narrow card — the city climbing the mountain
    card: { w: 120, ratio: "1 / 2", tiltY: -14, tiltX: 7, motif: "sarvane" },
    cardImg: "assets/Parchemin-Saravane.png",
  },
  {
    id: "onyrie",
    name: "Onyrie",
    numeral: "IV",
    tagline: "L'archipel suspendu entre ciel et mer",
    quote: "Ici, même la terre a appris à voler.",
    description:
      "Des falaises flottent au-dessus d'un océan de turquoise, reliées par des ponts de corde. Des cascades s'évaporent en brume avant de toucher l'eau, et les chevaux du vent paissent dans les nuages.",
    coords: "9°S · 142°O",
    accent: "#5fc8d8",
    glow: "rgba(95,200,216,0.55)",
    map: { x: 84, y: 38 },
    carnet: [
      { label: "Climat", value: "Grand ciel clair" },
      { label: "Esprit gardien", value: "Les Chevaux du Vent" },
      { label: "À voir", value: "Les ponts suspendus · le vol des pégases" },
    ],
    image: "https://i.postimg.cc/FRJsM647/Onyrie-compresse.jpg",
    playbackId: "c2NKp6019HLuAnpId01FxnNXtFk7tT7hdpTfiJgaUU2IQ",
    // squarer, airier card — the wide open sky
    card: { w: 138, ratio: "6 / 5", tiltY: 20, tiltX: -5, motif: "onyrie" },
    cardImg: "assets/Parchemin-Onyrie.png",
  },
];

window.ARCHIPEL = {
  image: "https://i.postimg.cc/8PLfJjx1/Archipel-compresse.jpg",
  playbackId: "LG01I9PnOmeG6KGWjAGrVmoMZavQ5EunVHrB00JsW01nh4",
};

// aged parchment texture for the closed island cards
window.PARCHMENT = "https://i.postimg.cc/9QwHwtwV/parchemin.png";

// painted kelp curtains framing the hero crossing (black-bg PNGs → screen blend)
window.ALGUES = {
  left:  "https://i.postimg.cc/ncmM2Qq7/Algues-gauche.png",
  right: "https://i.postimg.cc/brDrKZMm/Algues-droite.png",
};

// Essort mascot — peeks at the bottom of the welcome screen (Mux)
window.MASCOT_PLAYBACK = "jJ19ehJvUHsMg02oDDNLd2Zr6tfomYvBngzGuEalMdU00";

window.UPCOMING = [
  { name: "Aluna",    season: "Édition d'Été" },
  { name: "Sirielle", season: "Édition d'Été" },
  { name: "Cinabre",  season: "Édition d'Automne" },
  { name: "Veluria",  season: "Édition d'Automne" },
  { name: "Mirevent", season: "Édition d'Hiver" },
  { name: "Helian",   season: "Édition d'Hiver" },
  { name: "Olara",    season: "Édition de Printemps" },
  { name: "Therion",  season: "Édition de Printemps" },
];

window.NAV = ["Explorer", "Destinations", "Carnets", "Journal", "À propos"];

// Easings used across the experience
window.EASE = "cubic-bezier(0.65, 0, 0.35, 1)";
window.EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)";
