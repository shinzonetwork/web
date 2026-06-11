import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Keep third-party modules out of the app entry chunk. The wallet
          // stack is large and internally circular, and Rollup's default split
          // can otherwise create browser-evaluation cycles between chunks.
          if (id.includes("/node_modules/")) {
            return "vendor";
          }
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    svgr({
      include: "**/*.svg",
      exclude: "**/*.svg?url",
      svgrOptions: { svgo: false },
    }),
    cloudflare(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./lib", import.meta.url)),
    },
    dedupe: ["react", "react-dom"],
  },
});
