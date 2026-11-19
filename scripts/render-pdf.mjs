// Renders index.html to a PDF with headless Chromium.
// Usage: node scripts/render-pdf.mjs [output.pdf]   (default: cv.pdf)
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(process.argv[2] ?? path.join(root, "cv.pdf"));

const browser = await chromium.launch();
const page = await browser.newPage();

// Block everything that isn't the local file (Google Analytics etc.), so the
// render is deterministic and never counts as a page view.
await page.route("**/*", (route) =>
  route.request().url().startsWith("file:") ? route.continue() : route.abort()
);

await page.goto(pathToFileURL(path.join(root, "index.html")).href);
await page.emulateMedia({ media: "print" });
await page.pdf({
  path: out,
  format: "A4",
  printBackground: true,
  margin: { top: "12mm", bottom: "12mm", left: "10mm", right: "10mm" },
});

await browser.close();
console.log(`Wrote ${out}`);
