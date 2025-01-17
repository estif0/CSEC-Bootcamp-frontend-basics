document.addEventListener("DOMContentLoaded", () => {
  const notesList = document.getElementById("notes");
  const searchInput = document.getElementById("search-input");
  const filterSelect = document.getElementById("filter");
  const themeToggle = document.getElementById("theme-toggle");
  const addNoteBtn = document.getElementById("add-note-btn");
  const modal = document.getElementById("modal");
  const newNoteInput = document.getElementById("new-note-input");
  const applyBtn = document.getElementById("apply-btn");
  const cancelBtn = document.getElementById("cancel-btn");

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

  const addNote = (text) => {
    notes.push({ text, completed: false });
    renderNotes();
  };

  const toggleComplete = (index) => {
    notes[index].completed = !notes[index].completed;
    renderNotes();
  };

  const editNote = (index) => {
    const newText = prompt("Edit note:", notes[index].text);
    if (newText !== null) {
      notes[index].text = newText;
      renderNotes();
    }
  };

  function deleteNote(index) {
    notes.splice(index, 1);
    renderNotes();
  }

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

  searchInput.addEventListener("input", renderNotes);
  filterSelect.addEventListener("change", renderNotes);

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    themeToggle.innerHTML = document.body.classList.contains("dark-mode")
      ? '<i class="fas fa-moon"></i>'
      : '<i class="fas fa-sun"></i>';
  });

  addNoteBtn.addEventListener("click", () => {
    modal.style.display = "block";
  });

  applyBtn.addEventListener("click", () => {
    const newNoteText = newNoteInput.value.trim();
    if (newNoteText) {
      addNote(newNoteText);
      newNoteInput.value = "";
      modal.style.display = "none";
    }
  });

  cancelBtn.addEventListener("click", () => {
    newNoteInput.value = "";
    modal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  renderNotes();
});
