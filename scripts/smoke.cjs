/**
 * Smoke test in a real browser: the app starts, every story opens (entry page, then the story with its
 * check), the end of the deck shows, and nothing logs an error. Run after `npm run build`:  npm run smoke
 */
const { chromium } = require("playwright");
const { spawn } = require("node:child_process");
const { readFileSync } = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const PORT = 4179;
const total = (readFileSync(path.join(ROOT, "src/data/stories.ts"), "utf8").match(/^ {4}id: "/gm) || []).length;
let failed = false;
const check = (ok, msg) => { console.log(`${ok ? "ok  " : "FAIL"}: ${msg}`); if (!ok) failed = true; };

(async () => {
  const server = spawn("npx", ["vite", "preview", "--port", String(PORT), "--strictPort"], { cwd: ROOT, stdio: "ignore" });
  const kill = () => { try { server.kill(); } catch {} };
  process.on("exit", kill);
  try {
    for (let i = 0; i < 40; i++) { try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break; } catch {} await new Promise((r) => setTimeout(r, 250)); }
    const browser = await chromium.launch();
    const page = await (await browser.newContext({ viewport: { width: 390, height: 844 } })).newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    await page.goto(`http://localhost:${PORT}/`);

    check((await page.locator(".left").innerText()).startsWith(`${total} new stor`), `the deck offers all ${total} stories`);
    for (let n = 1; n <= total; n++) {
      const title = await page.locator("h1.intro-title").innerText();
      const words = await page.locator(".kw").count();
      const pills = await page.locator(".intro-pill").count();
      await page.getByRole("button", { name: /To the story/ }).click();
      const paras = await page.locator(".story-text .para").count();
      const quiz = await page.locator(".quiz-q").count();
      const ok = words >= 1 && words <= 5 && pills >= 1 && pills <= 2 && paras >= 2 && quiz >= 1;
      check(ok, `story ${n}/${total} “${title}” opens (${words} words, ${pills} pills, ${paras} paragraphs, ${quiz} questions)`);
      await page.getByRole("button", { name: /Skip/ }).click();
    }
    check((await page.locator(".empty h2").innerText()).includes("seen every story"), "end of the deck is reached");
    check(errors.length === 0, "no console or page errors" + (errors.length ? ": " + JSON.stringify(errors) : ""));
    await browser.close();
  } finally {
    kill();
  }
  process.exit(failed ? 1 : 0);
})();
