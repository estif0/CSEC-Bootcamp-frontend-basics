document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notes");
  const searchInput = document.getElementById("search-input");
  const filterSelect = document.getElementById("filter");

  let notes = [];

  const renderNotes = () => {
    notesList.innerHTML = "";
    const filteredNotes = filterNotes(searchInput.value, filterSelect.value);
    filteredNotes.forEach((note, index) => {
      const li = document.createElement("li");
      li.className = `note-item ${note.completed ? "completed" : ""}`;
      li.innerHTML = `
                <div class="note-content">
                    <input type="checkbox" ${note.completed ? "checked" : ""}>
                    <span>${note.text}</span>
                </div>
                <div class="note-actions">
                    <button class="edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;

      const checkbox = li.querySelector('input[type="checkbox"]');
      checkbox.addEventListener("change", () => toggleComplete(index));

      const editBtn = li.querySelector(".edit-btn");
      editBtn.addEventListener("click", () => editNote(index));

      const deleteBtn = li.querySelector(".delete-btn");
      deleteBtn.addEventListener("click", () => deleteNote(index));

      notesList.appendChild(li);
    });
  };

  function filterNotes(searchTerm, filter) {
    return notes.filter((note) => {
      const matchesSearch = note.text
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "completed" && note.completed) ||
        (filter === "incomplete" && !note.completed);
      return matchesSearch && matchesFilter;
    });
  }

  renderNotes();
});
