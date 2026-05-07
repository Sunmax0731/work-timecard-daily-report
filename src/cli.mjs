import fs from "node:fs";
import path from "node:path";
import { productProfile } from "./product-profile.mjs";
import { evaluateBatch } from "./core.mjs";
import { toJson, toMarkdown } from "./report.mjs";

const inputPath = process.argv[2] ?? "samples/sample-input.json";
const outputDir = process.argv[3] ?? "dist/run";
const input = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const evaluation = evaluateBatch(input, productProfile);

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(path.join(outputDir, "report.json"), toJson(evaluation), "utf8");
fs.writeFileSync(path.join(outputDir, "report.md"), toMarkdown(evaluation), "utf8");

console.log(`${productProfile.repository}: ${evaluation.result} errors=${evaluation.errors} warnings=${evaluation.warnings}`);
if (evaluation.errors > 0) {
  process.exitCode = 1;
}
