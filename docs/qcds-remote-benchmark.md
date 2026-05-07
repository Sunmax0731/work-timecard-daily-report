# QCDS Remote Benchmark

## 探索した成熟例

- `D:\AI\AndroidApp\listing-delivery-asset-checklist`: 代表シナリオ、`docs/qcds-strict-metrics.json`、`docs/release-evidence.json`、docs ZIP を持つ closed alpha 運用例。
- `D:\AI\AndroidApp\codex-remote-android`: `docs/qcds-hardening-plan.md`、release precheck、security evidence を持つ成熟例。
- `Sunmax0731/movie-telop-transcriber`: 代表データ、actual run、metrics JSON、release evidence を持つ成熟例。

## 採用基準

- ファイル存在だけで S 評価にしない。
- `samples/representative-suite.json` と実測を比較する。
- `docs/qcds-strict-metrics.json` を機械可読 evidence にする。
- `docs/release-evidence.json` に release URL、asset、branch cleanup、manual test 未実施を残す。
