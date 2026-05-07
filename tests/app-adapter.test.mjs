import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
import { productProfile } from "../src/product-profile.mjs";
import { evaluateBatch } from "../src/core.mjs";
import { buildPreviewModel } from "../src/app-adapter.mjs";

test("preview model exposes title and next actions", () => {
  const input = JSON.parse(fs.readFileSync("samples/sample-input.json", "utf8"));
  const model = buildPreviewModel(evaluateBatch(input, productProfile), productProfile);
  assert.equal(model.title, productProfile.title);
  assert.ok(model.nextActions.length > 0);
  assert.deepEqual(model.primaryFields, productProfile.requiredFields);
});
