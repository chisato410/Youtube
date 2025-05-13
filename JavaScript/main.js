import { initPlayer } from "./videoPlayer.js";
import { setupEventListeners } from "./ui.js";
import { loadNotes } from "./noteManager.js";

window.onload = () => {
  initPlayer(() => {
    loadNotes();
    setupEventListeners();
  });
};
