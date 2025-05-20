import { initPlayer } from "./videoPlayer.js";
import { setupEventListeners } from "./ui.js";
import { loadNotes } from "./noteManager.js";
import { setupSearch } from "./search.js";

// インターネット接続チェック関数
async function checkInternetConnection() {
  try {
    await fetch("https://www.gstatic.com/generate_204", {
      method: "GET",
      mode: "no-cors",
    });
    console.log("✅ インターネットに接続されています");
    return true;
  } catch (e) {
    console.warn("⚠️ インターネットに接続されていません");
    return false;
  }
}

window.onload = async () => {
  const online = await checkInternetConnection();

  initPlayer(() => {
    loadNotes();
    setupEventListeners();
    setupSearch();

    // 必要ならこのオンライン情報を他でも使えるようにできます
    if (!online) {
      alert(
        "インターネットに接続されていません。検索機能はフェイルセーフに切り替わります。"
      );
    }
  });
};
