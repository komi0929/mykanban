# MyKanban (マイカンバン)

開発者用ポートフォリオサイト。カンバンボード形式でプロジェクトを管理・表示します。

## セットアップ手順

### 1. 環境変数の設定

`.env.local` ファイルを開き、Supabaseのプロジェクト設定から以下の値をコピーして貼り付けてください。

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. データベースの構築

Supabaseのダッシュボード（SQL Editor）を開き、`database/schema.sql` の中身をすべてコピーして実行してください。
これにより、テーブル作成とセキュリティポリシー（RLS）、ストレージバケットの設定が行われます。

### 3. 画像のアップロード (手動テスト用)

`projects` テーブルにデータを追加し、Storageの `project-images` バケットに画像をアップロードして、その公開URLを `image_url` に設定することで表示を確認できます。

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 にアクセスして確認してください。

## 技術スタック

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4 (+ tailwindcss-animate)
- **UI**: Shadcn/ui (Custom implementation for Bento UI)
- **Database**: Supabase
- **Font**: Noto Sans JP
