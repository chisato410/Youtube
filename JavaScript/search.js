import { player } from "./videoPlayer.js";

const API_KEY = "AIzaSyC-qvW8IurfpIjs9L7_kXVEGGXJWLWLcq4";

export function setupSearch() {
  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("ytSearch");
  const searchList = document.getElementById("searchlist");

  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(
      query
    )}&key=${API_KEY}`;

    try {
      const res = await fetch(url);
      const data = await res.json();

      searchList.innerHTML = ""; // リスト初期化
      data.items.forEach((item) => {
        const option = document.createElement("option");
        option.value = item.id.videoId;
        option.textContent = item.snippet.title;
        searchList.appendChild(option);
      });
    } catch (err) {
      console.error("検索に失敗:", err);
    }
  });

  // 選択したら動画をプレイヤーで再生
  searchList.addEventListener("change", () => {
    const videoId = searchList.value;
    if (videoId && player && typeof player.loadVideoById === "function") {
      player.loadVideoById(videoId);
    }
  });
}
