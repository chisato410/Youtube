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
