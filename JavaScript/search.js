// search.js
import { loadVideoById } from "./videoPlayer.js";
import { fallbackVideos } from "./fallbackVideos.js";

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
      if (!res.ok) throw new Error("APIエラー");
      const data = await res.json();

      populateSearchList(data.items);
    } catch (err) {
      console.warn("API使用不可またはオフライン。フェイルセーフで表示します。");
      showFallbackVideos();
    }
  });

  searchList.addEventListener("change", () => {
    const videoId = searchList.value;
    if (videoId) {
      loadVideoById(videoId);
    }
  });

  function populateSearchList(items) {
    searchList.innerHTML = "";
    items.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id.videoId;
      option.textContent = item.snippet.title;
      searchList.appendChild(option);
    });
  }

  function showFallbackVideos() {
    searchList.innerHTML = "";
    fallbackVideos.forEach((video) => {
      const option = document.createElement("option");
      option.value = video.id;
      option.textContent = video.title;
      searchList.appendChild(option);
    });
  }
}
