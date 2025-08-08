# 🎯 Cursor Training Project

Cursorの学習と実践のためのプロジェクトです。基礎的なWeb開発からモダンな技術まで、段階的に学習できるよう構成されています。

## 📁 プロジェクト構造

```
cursor-training/
├── README.md                    # このファイル
├── .cursor/                     # Cursor設定ファイル
│   └── rules/                   # Cursor Rules設定
│       ├── ecmole.mdc          # ECサイト開発ルール
│       └── update-readme.mdc   # README更新ルール
├── case1/                       # HTML基礎
│   └── index.html              # Hello World ページ
├── case2/                       # Todoアプリ
│   ├── index.html              # メインHTML
│   ├── css/
│   │   └── style.css           # スタイルシート
│   └── js/
│       └── app.js              # JavaScript機能
├── case3/                       # インタラクティブアニメーション
│   ├── index.html              # メインHTML
│   ├── styles.css              # スタイルシート
│   └── script.js               # Aninestアニメーション
├── case4/                       # JavaScript基礎
│   └── loops.js                # ループ処理とセミコロン練習
├── case5/                       # 設定管理
│   └── config.js               # 定数とAPI設定
├── case6/                       # BEMコンポーネント
│   └── button.html             # ボタンコンポーネント
└── case7/                       # ECサイト（ShopEasy）
    ├── index.html              # 商品一覧ページ
    ├── style.css               # スタイルシート
    └── app.js                  # JavaScript機能
```

## 📚 学習ケース詳細

### Case 1: HTML基礎
- **目的**: HTML5の基本構造とセマンティックタグの理解
- **技術**: HTML5、CSS3
- **機能/内容**: 
  - シンプルなHello Worldページ
  - インラインスタイルの基本
  - レスポンシブデザインの基礎

### Case 2: Todoアプリ
- **目的**: JavaScript DOM操作とイベントハンドリングの学習
- **技術**: HTML5、CSS3、Vanilla JavaScript (ES6+)
- **機能/内容**: 
  - タスクの追加・削除・完了管理
  - LocalStorage を使用したデータ永続化
  - エラーハンドリングとバリデーション
  - レスポンシブデザイン（モバイルファースト）

### Case 3: インタラクティブアニメーション
- **目的**: モダンアニメーションライブラリの活用
- **技術**: HTML5、CSS3、Aninest ライブラリ、ES6+ Modules
- **機能/内容**: 
  - カードのインタラクティブアニメーション
  - 3D変形とカラーアニメーション
  - クリックカウントとフィードバック
  - アニメーションフレーム最適化

### Case 4: JavaScript基礎練習
- **目的**: ループ処理とコーディング規約の習得
- **技術**: Vanilla JavaScript (ES6+)
- **機能/内容**: 
  - while ループとfor ループの実装
  - 配列操作（doubleArray, sumArray, uniqueArray）
  - セミコロンの適切な使用
  - const/let の使い分け

### Case 5: 設定管理
- **目的**: 定数管理とAPI設定のベストプラクティス
- **技術**: Vanilla JavaScript (ES6+)
- **機能/内容**: 
  - 税率・割引率の定数化
  - API設定の構造化
  - 価格計算ロジック
  - 設定オブジェクトの管理

### Case 6: BEMコンポーネント設計
- **目的**: BEM記法とアクセシビリティの実践
- **技術**: HTML5、CSS3（CSS変数）、Vanilla JavaScript
- **機能/内容**: 
  - BEM記法による構造化CSS
  - CSS変数を活用したデザインシステム
  - ボタンコンポーネントの様々なバリエーション
  - ARIA属性によるアクセシビリティ対応
  - レスポンシブデザイン

### Case 7: ECサイト（ShopEasy）
- **目的**: 本格的なECサイト機能の実装
- **技術**: HTML5、CSS3、Vanilla JavaScript (ES6+)、LocalStorage
- **機能/内容**: 
  - 商品一覧表示とフィルタリング
  - ショッピングカート機能
  - 税込み価格計算（10%）
  - レスポンシブデザイン（BEM記法）
  - エラーハンドリングとアクセシビリティ対応

## 🛠️ 技術スタック

### 共通技術
- **HTML5**: セマンティックタグ、アクセシビリティ（ARIA属性）
- **CSS3**: Flexbox、Grid、CSS変数、レスポンシブデザイン
- **JavaScript ES6+**: const/let、アロー関数、async/await、モジュール

### 特殊技術
- **Aninest**: モダンアニメーションライブラリ（Case 3）
- **LocalStorage**: データ永続化（Case 2, 7）
- **BEM記法**: CSS命名規約（Case 6, 7）
- **Noto Sans JP**: Googleフォント（Case 7）

## 📋 コーディング規約

### JavaScript
- ES6+の機能を積極的に使用
- constとletを使用（varは禁止）
- アロー関数を優先的に使用
- セミコロンは必須
- 非同期処理はasync/awaitを使用
- エラーハンドリングを必ず含める

### HTML
- セマンティックHTMLを使用
- すべての画像にalt属性を必須
- フォーム要素には必ずlabelを関連付け
- lang="ja"を含める
- アクセシビリティ（ARIA属性）を考慮

### CSS
- BEM記法（block__element--modifier）を使用
- カラーコードは小文字で統一
- レスポンシブデザインはモバイルファースト
- CSS変数を積極的に活用

## 🎨 デザインシステム

### カラーパレット
- **プライマリカラー**: #2563eb（青）
- **セカンダリカラー**: #f59e0b（オレンジ）
- **フォント**: Noto Sans JP

### ブレークポイント
- **タブレット**: 768px
- **デスクトップ**: 1024px

## 🚀 学習の進め方

1. **Case 1**: HTML基礎からスタート
2. **Case 4**: JavaScript基礎をしっかり習得
3. **Case 5**: 設定管理のベストプラクティスを学習
4. **Case 2**: DOM操作とイベントハンドリングを実践
5. **Case 6**: BEM記法とコンポーネント設計を習得
6. **Case 3**: モダンアニメーションライブラリを活用
7. **Case 7**: 総合的なECサイト開発に挑戦

## 📝 その他

- コメントは日本語で記述
- console.logは開発時のみ（本番では削除）
- データはlocalStorageに保存
- 価格は税込みで表示（税率10%）

## 📖 参考情報

各ケースには詳細なコメントとエラーハンドリングが含まれており、実際のプロジェクト開発に活用できる知識を習得できます。