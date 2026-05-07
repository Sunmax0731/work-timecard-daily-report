import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import { productProfile } from "../src/product-profile.mjs";
import { runScenario } from "../src/core.mjs";

test("representative suite has required scenarios and expected results", () => {
  const suite = JSON.parse(fs.readFileSync("samples/representative-suite.json", "utf8"));
  assert.deepEqual(suite.map((entry) => entry.id), ["happy-path", "missing-required", "warning", "mixed-batch"]);
  const results = suite.map((scenario) => runScenario(scenario, productProfile));
  assert.equal(results.every((result) => result.pass), true, JSON.stringify(results, null, 2));
});
