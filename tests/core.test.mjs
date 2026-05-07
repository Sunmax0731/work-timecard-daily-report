import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import { productProfile } from "../src/product-profile.mjs";
import { evaluateBatch } from "../src/core.mjs";

test("happy path passes", () => {
  const input = JSON.parse(fs.readFileSync("samples/sample-input.json", "utf8"));
  const result = evaluateBatch(input, productProfile);
  assert.equal(result.result, "passed");
  assert.equal(result.errors, 0);
  assert.equal(result.warnings, 0);
});

test("missing required field fails", () => {
  const suite = JSON.parse(fs.readFileSync("samples/representative-suite.json", "utf8"));
  const scenario = suite.find((entry) => entry.id === "missing-required");
  const result = evaluateBatch({ items: scenario.items }, productProfile);
  assert.equal(result.result, "failed");
  assert.equal(result.errors, 1);
});
