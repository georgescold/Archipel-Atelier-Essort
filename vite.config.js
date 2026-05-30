import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" → built assets use relative paths so dist/ works whether served
// from a domain root, a sub-path, or GitHub Pages.
export default defineConfig({
  base: "./",
  plugins: [react()],
  build: {
    target: "es2018",
    chunkSizeWarningLimit: 1200,
  },
});
