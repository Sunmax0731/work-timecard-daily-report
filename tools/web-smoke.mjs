import fs from "node:fs";

const html = fs.readFileSync("public/index.html", "utf8");
const app = fs.readFileSync("public/app.js", "utf8");
const css = fs.readFileSync("public/styles.css", "utf8");
const checks = [
  ["html-nonblank", html.trim().length > 500],
  ["app-marker", app.includes("closed-alpha-preview")],
  ["css-nonblank", css.trim().length > 100],
  ["title-present", html.includes("<h1")],
];
const result = {
  command: "node tools/web-smoke.mjs",
  nonBlank: checks.every(([, pass]) => pass),
  checks: checks.map(([id, pass]) => ({ id, pass })),
  manualTestSeparated: true,
};
fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/web-smoke-result.json", JSON.stringify(result, null, 2) + "\n", "utf8");
if (!result.nonBlank) {
  console.error(JSON.stringify(result, null, 2));
  process.exit(1);
}
console.log("web-smoke ok");
