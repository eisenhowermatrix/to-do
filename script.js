// Save tasks
function saveTasks() {
  const todoBank = document.getElementById("taskBank").innerHTML;
  const completedTasks = document.getElementById("completedList").innerHTML;
  const matrixCells = [...document.querySelectorAll(".matrix-cell")].map(cell => cell.innerHTML);

  localStorage.setItem("todoBank", todoBank);
  localStorage.setItem("completedTasks", completedTasks);
  localStorage.setItem("matrixCells", JSON.stringify(matrixCells));
}

// Load tasks
function loadTasks() {
  const todoBank = localStorage.getItem("todoBank");
  const completedTasks = localStorage.getItem("completedTasks");
  const matrixCells = JSON.parse(localStorage.getItem("matrixCells"));

  if (todoBank) document.getElementById("taskBank").innerHTML = todoBank;
  if (completedTasks) document.getElementById("completedList").innerHTML = completedTasks;
  if (matrixCells) {
    document.querySelectorAll(".matrix-cell").forEach((cell, i) => {
      cell.innerHTML = matrixCells[i];
    });
  }
}

// Add task
function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskText = taskInput.value.trim();
  if (taskText) {
    const taskTile = createTaskTile(taskText);
    document.getElementById("taskBank").appendChild(taskTile);
    taskInput.value = "";
  }
}

// Create task tile
function createTaskTile(text, isCompleted = false) {
  const taskTile = document.createElement("div");
  taskTile.className = `task-tile ${isCompleted ? "completed" : ""}`;
  taskTile.draggable = true;
  taskTile.ondragstart = drag;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isCompleted;
  checkbox.onclick = () => toggleTaskCompletion(taskTile, checkbox.checked);
  taskTile.appendChild(checkbox);

  const taskText = document.createElement("span");
  taskText.textContent = text;
  taskText.ondblclick = () => (taskText.contentEditable = true);
  taskText.onblur = () => (taskText.contentEditable = false);
  taskTile.appendChild(taskText);

  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => taskTile.remove();
  taskTile.appendChild(deleteBtn);

  return taskTile;
}

// Toggle task completion
function toggleTaskCompletion(taskTile, isCompleted) {
  const parent = isCompleted ? document.getElementById("completedList") : document.getElementById("taskBank");
  taskTile.classList.toggle("completed", isCompleted);
  parent.appendChild(taskTile);
}

// Drag-and-drop
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.outerHTML);
}

function drop(event) {
  event.preventDefault();
  const draggedHTML = event.dataTransfer.getData("text");
  const tempContainer = document.createElement("div");
  tempContainer.innerHTML = draggedHTML;
  const draggedElement = tempContainer.firstChild;
  event.target.closest(".matrix-cell").appendChild(draggedElement);
}

// Add task on Enter
function handleKeyPress(event) {
  if (event.key === "Enter") addTask();
}

// Save on unload
window.addEventListener("beforeunload", saveTasks);
window.addEventListener("DOMContentLoaded", loadTasks);
