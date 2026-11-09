/** Renders scripts/app-icon.svg to the PNG icons in public/ (Home Screen icon and web-app manifest icons). Run: node scripts/make-icons.cjs */
const { chromium } = require("playwright");
const { readFileSync } = require("node:fs");
const path = require("node:path");
const ROOT = path.resolve(__dirname, "..");
const svg = readFileSync(path.join(ROOT, "scripts/app-icon.svg"), "utf8");
const OUT = { "apple-touch-icon.png": 180, "icon-192.png": 192, "icon-512.png": 512 };
(async () => {
  const browser = await chromium.launch();
  for (const [file, size] of Object.entries(OUT)) {
    const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
    await page.setContent(`<style>html,body{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${svg}`);
    await page.screenshot({ path: path.join(ROOT, "public", file), clip: { x: 0, y: 0, width: size, height: size } });
    await page.close();
    console.log(`public/${file} (${size}×${size})`);
  }
  await browser.close();
})();
