// Save the state of tasks in localStorage
function saveTasks() {
  const todoBank = document.getElementById("taskBank").innerHTML;
  const completedTasks = document.getElementById("completedList").innerHTML;
  const matrixCells = [...document.querySelectorAll(".matrix-cell")].map(cell => cell.innerHTML);

  localStorage.setItem("todoBank", todoBank);
  localStorage.setItem("completedTasks", completedTasks);
  localStorage.setItem("matrixCells", JSON.stringify(matrixCells));
}

// Load tasks from localStorage
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

// Add event listener to save on window unload
window.addEventListener("beforeunload", saveTasks);
window.addEventListener("DOMContentLoaded", loadTasks);

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
function createTaskTile(text) {
  const taskTile = document.createElement("div");
  taskTile.className = "task-tile";
  taskTile.draggable = true;
  taskTile.ondragstart = drag;

  const taskText = document.createElement("span");
  taskText.textContent = text;
  taskTile.appendChild(taskText);

  const deleteBtn = document.createElement("span");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "X";
  deleteBtn.onclick = () => taskTile.remove();
  const deleteContainer = document.createElement("div");
  deleteContainer.className = "delete-container";
  deleteContainer.appendChild(deleteBtn);
  taskTile.appendChild(deleteContainer);

  return taskTile;
}

// Drag-and-drop functionality
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.outerHTML);
}

function drop(event) {
  event.preventDefault();
  const droppedHTML = event.dataTransfer.getData("text");
  event.target.closest(".matrix-cell").innerHTML += droppedHTML;
}

// Add task on pressing Enter
function handleKeyPress(event) {
  if (event.key === "Enter") addTask();
}