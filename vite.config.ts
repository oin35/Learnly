import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// SINGLE_FILE=1 inlines JS+CSS into one index.html (handy for hosting anywhere).
export default defineConfig({
  base: "./",
  plugins: [react(), ...(process.env.SINGLE_FILE ? [viteSingleFile()] : [])],
  test: { include: ["src/**/*.test.ts"] },
});
