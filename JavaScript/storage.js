// storage.js
export function saveNotes(notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
}

export function loadNotesFromStorage() {
  return JSON.parse(localStorage.getItem("notes")) || [];
}
