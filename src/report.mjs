export function toMarkdown(evaluation) {
  const lines = [
    `# ${evaluation.title} evaluation report`,
    "",
    `- Repository: ${evaluation.repository}`,
    `- Result: ${evaluation.result}`,
    `- Items: ${evaluation.totalItems}`,
    `- Errors: ${evaluation.errors}`,
    `- Warnings: ${evaluation.warnings}`,
    "",
    "## Items",
    "",
  ];

  for (const result of evaluation.results) {
    lines.push(`### ${result.id}: ${result.title}`);
    lines.push(`- Result: ${result.result}`);
    for (const error of result.errors) {
      lines.push(`- Error: [${error.code}] ${error.field} - ${error.message}`);
    }
    for (const warning of result.warnings) {
      lines.push(`- Warning: [${warning.code}] ${warning.field} - ${warning.message}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function toJson(evaluation) {
  return JSON.stringify(evaluation, null, 2);
}
