# 仕様

## プロダクト範囲

- Domain: AndroidApp
- Repository: work-timecard-daily-report
- 主な公開先: Google Play
- Surface: Android closed-alpha product core + mobile preview

## 入力データ

必須項目:

- `id`
- `title`
- `startedAt`
- `endedAt`
- `outcome`
- `owner`

推奨項目:

- `dailyReportNote`

## 判定

- 必須項目不足は `failed`。
- 推奨項目不足、`waiting`、`blocked`、`riskLevel=high` は `warning`。
- エラーも警告もない場合は `passed`。
