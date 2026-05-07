import test from "node:test";
import assert from "node:assert/strict";
import { gradeFromScore, isAtLeastAminus, summarizeScenarioResults } from "../src/review-model.mjs";

test("grade mapping is strict", () => {
  assert.equal(gradeFromScore(100), "S+");
  assert.equal(gradeFromScore(86), "A-");
  assert.equal(isAtLeastAminus("A-"), true);
  assert.equal(isAtLeastAminus("B+"), false);
});

test("scenario summary reports failures", () => {
  const summary = summarizeScenarioResults([{ pass: true }, { pass: false, id: "bad" }]);
  assert.equal(summary.total, 2);
  assert.deepEqual(summary.failed, ["bad"]);
});
