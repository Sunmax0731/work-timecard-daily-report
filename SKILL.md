# SKILL

## Start Order

1. `README.md`
2. `docs/source-idea-pack.json`
3. `docs/requirements.md`
4. `docs/specification.md`
5. `src/product-profile.mjs`
6. `samples/representative-suite.json`

## Validation

```powershell
npm test
npm start
```

## Release Notes

- Release body は `docs/releases/v0.1.0-alpha.1.md` を使う。
- Assets は `dist/work-timecard-daily-report-docs.zip`、`docs/manual-test.md`、`docs/strict-manual-test-addendum.md`。
- 手動テストはユーザー実施であり、Codex 側では未実施として QCDS を `S-` 上限にする。
