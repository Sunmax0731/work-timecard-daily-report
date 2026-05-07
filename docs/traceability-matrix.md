# Traceability Matrix

| Requirement | Implementation | Test | Docs | Evidence |
| --- | --- | --- | --- | --- |
| 必須項目検証 | `src/validators.mjs` | `tests/core.test.mjs` | `docs/specification.md` | `docs/qcds-strict-metrics.json` |
| 代表シナリオ | `src/core.mjs` | `tests/representative-suite.test.mjs` | `docs/test-plan.md` | `docs/qcds-regression-baseline.json` |
| レポート生成 | `src/report.mjs` | `npm start` | `docs/user-guide.md` | `dist/run/report.md` |
| UI preview | `public/` | `tools/web-smoke.mjs` | `docs/ui-ux-polish.md` | `dist/web-smoke-result.json` |
| docs ZIP | `tools/package-docs.mjs` | `npm test` | `docs/release-checklist.md` | `dist/work-timecard-daily-report-docs.zip` |
