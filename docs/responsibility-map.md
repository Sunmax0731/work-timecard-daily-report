# Responsibility Map

| 領域 | ファイル | 責務 |
| --- | --- | --- |
| product profile | `src/product-profile.mjs` | プロダクト固有定義 |
| core | `src/core.mjs` | 入力正規化、バッチ評価 |
| validators | `src/validators.mjs` | 必須/警告判定 |
| report | `src/report.mjs` | Markdown / HTML 出力 |
| review model | `src/review-model.mjs` | QCDS / 手動レビュー補助 |
| app adapter | `src/app-adapter.mjs` | preview UI 向け状態 |
| cli | `src/cli.mjs` | 実行入口 |
