const gradeOrder = ["D-", "D+", "C-", "C+", "B-", "B+", "A-", "A+", "S-", "S+"];

export function gradeFromScore(score) {
  if (score >= 98) return "S+";
  if (score >= 94) return "S-";
  if (score >= 90) return "A+";
  if (score >= 86) return "A-";
  if (score >= 78) return "B+";
  if (score >= 70) return "B-";
  if (score >= 60) return "C+";
  if (score >= 50) return "C-";
  if (score >= 40) return "D+";
  return "D-";
}

export function isAtLeastAminus(grade) {
  return gradeOrder.indexOf(grade) >= gradeOrder.indexOf("A-");
}

export function summarizeScenarioResults(results) {
  return {
    total: results.length,
    passed: results.filter((result) => result.pass).length,
    failed: results.filter((result) => !result.pass).map((result) => result.id),
  };
}
