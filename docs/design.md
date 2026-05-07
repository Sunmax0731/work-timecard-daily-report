# 設計

## 3 Options

| Option | 内容 | 評価 |
| --- | --- | --- |
| A | UIだけを先に作る | 見た目は早いが検証根拠が弱い |
| B | core判定、docs、QCDSを先に固める | closed alpha の根拠を作りやすい |
| C | 外部連携を先に作る | 価値は大きいが初期リスクが高い |

## Chosen

Option B。Android closed-alpha product core + mobile preview と CLI 検証コアを分け、UI は `public/` の preview と `src/app-adapter.mjs` で扱う。
