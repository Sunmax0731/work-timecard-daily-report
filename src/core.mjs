import { validateItem } from "./validators.mjs";

export function normalizeInput(input) {
  const items = Array.isArray(input) ? input : input.items;
  if (!Array.isArray(items)) {
    throw new Error("Input must be an array or an object with an items array.");
  }
  return {
    product: input.product ?? {},
    items: items.map((item, index) => ({
      status: "ready",
      tags: [],
      ...item,
      _index: index,
    })),
  };
}

export function evaluateBatch(input, profile) {
  const normalized = normalizeInput(input);
  const results = normalized.items.map((item) => validateItem(item, profile));
  const errors = results.reduce((sum, result) => sum + result.errors.length, 0);
  const warnings = results.reduce((sum, result) => sum + result.warnings.length, 0);
  const result = errors > 0 ? "failed" : warnings > 0 ? "warning" : "passed";
  return {
    repository: profile.repository,
    title: profile.title,
    result,
    totalItems: results.length,
    errors,
    warnings,
    results,
  };
}

export function runScenario(scenario, profile) {
  const actual = evaluateBatch({ items: scenario.items }, profile);
  return {
    id: scenario.id,
    purpose: scenario.purpose,
    expected: scenario.expected,
    actual: {
      result: actual.result,
      errors: actual.errors,
      warnings: actual.warnings,
      totalItems: actual.totalItems,
    },
    pass:
      actual.result === scenario.expected.result &&
      actual.errors === scenario.expected.errors &&
      actual.warnings === scenario.expected.warnings,
  };
}
