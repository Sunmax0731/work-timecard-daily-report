# 作業打刻・日報生成

開始終了ボタン、成果メモ、写真付き日報を生成する。入力、確認、履歴保存、次アクションを同じ作業単位で扱えるようにする。

| 項目 | 内容 |
| --- | --- |
| Rank | 81 |
| Domain | AndroidApp |
| Idea No. | 6 |
| Repository | work-timecard-daily-report |
| 主な公開先 | Google Play |

## Implementation

- `src/product-profile.mjs`: プロダクト定義。
- `src/core.mjs`: 入力正規化とバッチ評価。
- `src/validators.mjs`: 必須項目と warning 項目の検査。
- `src/review-model.mjs`: QCDS / 手動レビュー向けモデル。
- `src/report.mjs`: Markdown / HTML レポート生成。
- `src/app-adapter.mjs`: Android closed-alpha product core + mobile preview 向けの表示状態を作る。
- `src/cli.mjs`: CLI。
- `public/`: closed alpha preview 用の静的 UI。

## Validation

```powershell
npm test
npm start
```

`npm test` で代表シナリオ、QCDS、docs ZIP、静的UI smoke、文字化けを検証します。

## Strict QCDS Docs

- [Remote benchmark](docs/qcds-remote-benchmark.md)
- [Strict metrics](docs/qcds-strict-metrics.json)
- [Traceability matrix](docs/traceability-matrix.md)
- [Release evidence](docs/release-evidence.json)
