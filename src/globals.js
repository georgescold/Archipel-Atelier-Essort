// Bundled vendor libs exposed as globals so the atlas-*.jsx modules (which were
// authored against window.React / window.ReactDOM / window.Hls) keep working
// without per-file imports. This module is imported FIRST in main.jsx, so these
// assignments run before any atlas module body executes.
import React from "react";
import * as ReactDOM from "react-dom/client";
import Hls from "hls.js";

window.React = React;
window.ReactDOM = ReactDOM;
window.Hls = Hls;
