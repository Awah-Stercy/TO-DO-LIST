const input = document.querySelector("#todo-input");
const addButton = document.querySelector("#add-button");
const todoList = document.querySelector("#todo-list");

const allButton = document.querySelector("#all-button");
const activeButton = document.querySelector("#active-button");
const completedButton = document.querySelector("#completed-button");

const counter = document.querySelector("#counter");


// Keep track of the current filter
let currentFilter = "all";


// ADD A NEW TO-DO
addButton.addEventListener("click", () => {
  const text = input.value.trim();

  // Don't add an empty item
  if (text === "") {
    return;
  }

  // Create a new list item
  const li = document.createElement("li");

  // Track completion state
  li.dataset.completed = "false";

  // Create the text
  const textSpan = document.createElement("span");
  textSpan.textContent = text;

  // Create the Delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";


  // MARK ITEM COMPLETE / INCOMPLETE
  textSpan.addEventListener("click", () => {

    if (li.dataset.completed === "false") {

      // Mark as completed
      li.dataset.completed = "true";

      // Add strikethrough
      textSpan.style.textDecoration = "line-through";
      textSpan.style.color = "#9ca3af";

    } else {

      // Mark as active again
      li.dataset.completed = "false";

      // Remove strikethrough
      textSpan.style.textDecoration = "none";
      textSpan.style.color = "white";
    }

    updateCounter();
    filterItems();
  });


  // DELETE ITEM
  deleteButton.addEventListener("click", () => {

    // Remove only this specific item
    li.remove();

    updateCounter();
    filterItems();
  });


  // Add text and button to the list item
  li.append(textSpan);
  li.append(deleteButton);

  // Add the list item to the page
  todoList.append(li);

  // Clear the input
  input.value = "";

  // Update counter and filter
  updateCounter();
  filterItems();
});


// SHOW ALL ITEMS
allButton.addEventListener("click", () => {

  currentFilter = "all";

  filterItems();
});


// SHOW ACTIVE ITEMS
activeButton.addEventListener("click", () => {

  currentFilter = "active";

  filterItems();
});


// SHOW COMPLETED ITEMS
completedButton.addEventListener("click", () => {

  currentFilter = "completed";

  filterItems();
});


// FILTER ITEMS
function filterItems() {

  const items = todoList.querySelectorAll("li");

  items.forEach((li) => {

    const isCompleted = li.dataset.completed === "true";


    // Show everything
    if (currentFilter === "all") {

      li.style.display = "flex";
    }


    // Show only active
    else if (currentFilter === "active") {

      if (isCompleted) {
        li.style.display = "none";
      } else {
        li.style.display = "flex";
      }
    }


    // Show only completed
    else if (currentFilter === "completed") {

      if (isCompleted) {
        li.style.display = "flex";
      } else {
        li.style.display = "none";
      }
    }

  });
}


// UPDATE REMAINING COUNTER
function updateCounter() {

  const items = todoList.querySelectorAll("li");

  let remaining = 0;


  items.forEach((li) => {

    if (li.dataset.completed === "false") {
      remaining++;
    }

  });


  if (remaining === 1) {
    counter.textContent = "1 item remaining";
  } else {
    counter.textContent = `${remaining} items remaining`;
  }
}