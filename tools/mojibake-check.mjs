import fs from "node:fs";
import path from "node:path";

const badPatterns = [
  String.fromCodePoint(0x7e67),
  String.fromCodePoint(0x90e2),
  String.fromCodePoint(0x9aeb),
  String.fromCodePoint(0xfffd),
];
const extensions = new Set([".md", ".json", ".mjs", ".js", ".html", ".css", ".cs", ".jsx"]);
const ignoredDirs = new Set([".git", "node_modules", "dist"]);
const findings = [];

walk(".");
if (findings.length > 0) {
  console.error(findings.join("\n"));
  process.exit(1);
}
console.log("mojibake-check ok");

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignoredDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!extensions.has(path.extname(entry.name))) continue;
    const content = fs.readFileSync(fullPath, "utf8");
    for (const pattern of badPatterns) {
      if (content.includes(pattern)) {
        findings.push(`${fullPath}: contains ${pattern}`);
      }
    }
  }
}
