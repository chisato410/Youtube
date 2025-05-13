import { addNote, handleNoteClick } from "./noteManager.js";

export function setupEventListeners() {
  document.getElementById("addMemo").addEventListener("click", () => {
    const input = document.getElementById("memoText");
    const text = input.value.trim();
    if (text) {
      addNote(text);
      input.value = "";
    }
  });

  document
    .getElementById("memoList")
    .addEventListener("click", handleNoteClick);
}
