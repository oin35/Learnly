import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// Every build gets an id. The app compares its own id with version.json on the server
// and reloads itself when a newer build is out (see src/lib/update.ts).
const BUILD = new Date().toISOString();
const versionFile = (): Plugin => ({
  name: "version-file",
  apply: "build",
  generateBundle() {
    this.emitFile({ type: "asset", fileName: "version.json", source: JSON.stringify({ build: BUILD }) + "\n" });
  },
});

// SINGLE_FILE=1 inlines JS+CSS into one index.html (handy for hosting anywhere).
export default defineConfig({
  base: "./",
  define: { __BUILD__: JSON.stringify(BUILD) },
  plugins: [react(), ...(process.env.SINGLE_FILE ? [viteSingleFile()] : [versionFile()])],
  test: { include: ["src/**/*.test.ts"] },
});
