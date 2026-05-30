// Entry point. Order matters: globals first (sets window.React etc.), then the
// data + component modules in dependency order, then the app which renders.
import "./globals.js";
import "./styles.css";
import "./atlas-data.js";
import "./atlas-icons.jsx";
import "./atlas-helpers.jsx";
import "./atlas-hero.jsx";
import "./atlas-overlay.jsx";
import "./atlas-rest.jsx";
import "./atlas-app.jsx";
