<style>
  body {
    font-family: "Helvetica Neue", sans-serif;
    line-height: 1.6;
    background-color: #f9f9f9;
    color: #333;
    max-width: 960px;
    margin: 0 auto;
    padding: 2rem;
  }

  h1, h2, h3 {
    border-left: 5px solid #2196f3;
    padding-left: 10px;
    color: #2196f3;
  }

  ul, ol {
    margin: 0 0 1rem 1.5rem;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    font-size: 0.95em;
    font-family: Consolas, monospace;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
  }

  th, td {
    border: 1px solid #ccc;
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background-color: #2196f3;
    color: white;
  }

  tr:nth-child(even) td {
    background-color: #f0f8ff;
  }

  li strong {
    color: #333;
  }

  ul > li {
    margin-bottom: 0.5rem;
  }

  .idea-list li::before {
    content: "💡";
    margin-right: 6px;
  }

  img {
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid #ddd;
  }
</style>

# Youtubeを使ったメモアプリ

YouTube動画を再生しながら、特定の再生タイミングにメモを残せるアプリです。
例えば、好きな歌のサビや、勉強用のポイントを記録できます。

# イメージ画像

# 全体の構成
ファイルは次の6つに分け、役割分担をしました。

<table border="1" cellspacing="0" cellpadding="8">
  <thead>
    <tr>
      <th>ファイル名</th>
      <th>役割</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>index.html</code></td>
      <td>アプリのUI（動画プレイヤーやメモ欄など）を定義</td>
    </tr>
    <tr>
      <td><code>main.js</code></td>
      <td>アプリの初期化処理を担当（プレイヤー準備、メモ読み込みなど）</td>
    </tr>
    <tr>
      <td><code>videoPlayer.js</code></td>
      <td>YouTube IFrame API を使って動画再生を制御</td>
    </tr>
    <tr>
      <td><code>noteManager.js</code></td>
      <td>メモの追加・表示・クリック時のジャンプ処理を管理</td>
    </tr>
    <tr>
      <td><code>storage.js</code></td>
      <td>ローカルストレージへの保存・読み込みを処理</td>
    </tr>
    <tr>
      <td><code>utils.js</code></td>
      <td>時間を mm:ss 形式に変換するなどの汎用処理</td>
    </tr>
    <tr>
      <td><code>ui.js</code></td>
      <td>ボタンクリックなどUIイベントを設定</td>
    </tr>
  </tbody>
</table>

# 処理の流れ
<ol>
  <li><strong>ページ読み込み時：</strong>
    <ul>
      <li><code>main.js</code> が読み込まれる</li>
      <li><code>initPlayer()</code> で YouTube プレイヤーを初期化</li>
      <li>プレイヤーが準備できたらコールバックで以下を実行：
        <ul>
          <li><code>loadNotes()</code> で保存済みのメモを表示</li>
          <li><code>setupEventListeners()</code> でUIイベントを登録</li>
        </ul>
      </li>
    </ul>
  </li>

  <li><strong>メモの追加：</strong>
    <ul>
      <li>ユーザーがメモ入力 → 「＋ メモを追加」ボタンをクリック</li>
      <li><code>ui.js</code> で <code>addNote()</code> を呼び出す</li>
      <li><code>noteManager.js</code> で：
        <ul>
          <li>現在の再生時間を取得（<code>getCurrentTime()</code>）</li>
          <li>メモを配列に追加して <code>localStorage</code> に保存</li>
          <li><code>renderNotes()</code> でメモ一覧を再描画</li>
        </ul>
      </li>
    </ul>
  </li>

  <li><strong>メモをクリック：</strong>
    <ul>
      <li>「▶」ボタンをクリックすると <code>handleNoteClick()</code> が呼ばれる</li>
      <li>該当メモの時間へ <code>seekTo()</code> でジャンプ</li>
    </ul>
  </li>
</ol>

# 技術的なポイント
<ul>
  <li><strong>モジュール構成（ES Modules）:</strong>
    <ul>
      <li>機能ごとにファイルを分割（例: <code>videoPlayer.js</code>, <code>noteManager.js</code>）</li>
      <li><code>import / export</code> を使ってモジュール間で機能を共有</li>
    </ul>
  </li>

  <li><strong>YouTube IFrame API の活用:</strong>
    <ul>
      <li><code>YT.Player</code> を使って動画を埋め込み</li>
      <li>APIを通じて、再生・一時停止・時間取得・seek などを制御</li>
    </ul>
  </li>

  <li><strong>localStorage によるデータの永続化:</strong>
    <ul>
      <li>メモはリロードしても保持されるように <code>localStorage</code> に保存</li>
      <li><code>saveNotes()</code>, <code>loadNotesFromStorage()</code> を作成</li>
    </ul>
  </li>

  <li><strong>イベント駆動型の UI 操作:</strong>
    <ul>
      <li>ボタンや入力にイベントリスナーを設定（<code>setupEventListeners()</code>）</li>
      <li>再生時間付きメモの追加やジャンプなど、動的なインタラクションを実現</li>
    </ul>
  </li>

  <li><strong>時間表示の整形処理:</strong>
    <ul>
      <li><code>formatTime()</code> 関数で、秒数を「分:秒」の形式に変換</li>
      <li>見やすく整理されたメモ表示を実現</li>
    </ul>
  </li>
</ul>

# 💡 今後追加できそうなアイデア（余裕があれば）
<ul>
  <li>メモにタグをつけて検索</li>
  <li>再生時間に自動でメモをポップアップ表示</li>
  <li>メモを他の人と共有</li>
  <li>動画再生時のエフェクト</li>
</ul>
