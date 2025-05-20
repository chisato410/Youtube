// ui.js
import { addNote, handleNoteClick } from "./noteManager.js";

export function setupEventListeners() {
  const addMemoBtn = document.getElementById("addMemo");
  const memoTextArea = document.getElementById("memoText");
  const memoList = document.getElementById("memoList");

  addMemoBtn.addEventListener("click", () => {
    const text = memoTextArea.value.trim();
    if (text) {
      addNote(text);
      memoTextArea.value = "";
    }
  });

  memoList.addEventListener("click", handleNoteClick);
}
