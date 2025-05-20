import { initPlayer } from "./videoPlayer.js";
import { setupEventListeners } from "./ui.js";
import { loadNotes } from "./noteManager.js";
import { setupSearch } from "./search.js";
import { fallbackVideos } from "./fallbackVideos.js";

window.onload = () => {
  initPlayer(() => {
    loadNotes();
    setupEventListeners();
    setupSearch();
  });
};
