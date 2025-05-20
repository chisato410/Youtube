// noteManager.js
import { getCurrentTime, seekTo } from "./videoPlayer.js";
import { saveNotes, loadNotesFromStorage } from "./storage.js";
import { formatTime } from "./utils.js";

let notes = [];

export function loadNotes() {
  notes = loadNotesFromStorage();
  renderNotes();
}

export function addNote(text) {
  const time = getCurrentTime();
  notes.push({ time, text });
  saveNotes(notes);
  renderNotes();
}

function renderNotes() {
  const notesContainer = document.getElementById("memoList");
  notesContainer.innerHTML = notes
    .map(
      (note, i) => `
    <div class="note">
      <span>${formatTime(note.time)}</span>
      <p>${note.text}</p>
      <button data-index="${i}" class="play-btn">▶</button>
    </div>
  `
    )
    .join("");
}

export function handleNoteClick(event) {
  const target = event.target;
  if (target.classList.contains("play-btn")) {
    const index = target.dataset.index;
    seekTo(notes[index].time);
  }
}
