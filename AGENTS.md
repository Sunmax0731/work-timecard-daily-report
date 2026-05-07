# AGENTS

この repo は `work-timecard-daily-report`、対象プロダクトは「作業打刻・日報生成」です。

## Working Rules

- 変更前に `README.md`、`docs/requirements.md`、`docs/specification.md`、`docs/test-plan.md` を確認する。
- 作業ブランチは `codex/closed-alpha-release` 形式を1本だけ使う。
- main へ merge した後は `origin/main` へ push し、ローカル/リモートに `codex/*` を残さない。
- `npm test` は unit test、代表シナリオ、QCDS metrics、docs ZIP、静的UI smoke、文字化け検査をまとめて実行する。
- ZIP サイズ、生成時刻、絶対一時パスは固定評価根拠にしない。
- Markdown / JSON / JS / HTML / CSS は UTF-8 + LF を維持する。文字化け確認は `Get-Content -Encoding UTF8` または Node.js UTF-8 読み込みで行う。

## Remote QCDS Benchmark Rules

- QCDS は Quality、Cost、Delivery、Satisfaction と定義する。
- 評価は `S+ / S- / A+ / A- / B+ / B- / C+ / C- / D+ / D-` を使う。
- 手動テスト未実施の closed alpha は原則 `S-` を上限にする。
- A- 未満が出た場合は `docs/qcds-strict-gap-analysis.md` に理由と改善を残し、同じブランチ内で改善する。
