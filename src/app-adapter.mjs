export function buildPreviewModel(evaluation, profile) {
  return {
    title: profile.title,
    repository: profile.repository,
    result: evaluation.result,
    totalItems: evaluation.totalItems,
    summary: `${evaluation.errors} errors / ${evaluation.warnings} warnings`,
    primaryFields: profile.requiredFields,
    nextActions: evaluation.result === "passed"
      ? ["manual-test.md を確認", "release evidence を確認"]
      : ["必須項目と警告を修正", "representative-suite を再実行"],
  };
}
