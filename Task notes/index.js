let button = document.querySelector(".add");
let notes = [];
let input = document.getElementById("input");
let content = document.querySelector(".notes-content");
let del = document.getElementById("delete");
let deleteall = document.getElementById("deleteall");

// Render notes 
function render(){
  content.innerHTML = "";

  notes.forEach((note, index) => {
    content.innerHTML += `
      <p class="note" data-index="${index}" style="text-decoration:${note.done ? "line-through" : "none"}">
        ${note.text}
      </p>
    `;
  });
}

// Add Note
button.addEventListener("click", () => {
  if(input.value.trim() !== ""){
    notes.push({ text: input.value, done: false });
    render();
    input.value = "";
  }
});

// Delegated 
content.addEventListener("click", (event) => {
  if(event.target.classList.contains("note")){

    let index = event.target.dataset.index;

    // Pre duplicate buttons 
    if(event.target.nextElementSibling && event.target.nextElementSibling.tagName === "BUTTON"){
      return;
    }

    //  buttons
    let completeBtn = document.createElement("button");
    completeBtn.innerText = "Complete";

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "Remove";

    // Insert buttons beside
    event.target.insertAdjacentElement("afterend", removeBtn);
    removeBtn.insertAdjacentElement("afterend", completeBtn);

    // Complete
    completeBtn.addEventListener("click", () => {
      notes[index].done = true;
      render();
    });

    // Remove 
    removeBtn.addEventListener("click", () => {
      notes.splice(index, 1);
      render();
    });
  }
});

// Delete first 
del.addEventListener("click", () => {
  notes.splice(0, 1);
  render();
});

// Delete all notes
deleteall.addEventListener("click", () => {
  notes = [];
  render();
});
