const newTask = document.querySelector(".input-task");
const addNewTaskBtn = document.querySelector(".btn-add-task");
const taskList = document.querySelector(".task-list");

addNewTaskBtn.addEventListener("click", addTask);
taskList.addEventListener("click", deleteTaskComplete);
document.addEventListener("DOMContentLoaded", readStorage);

function deleteTaskComplete(e) {
  const clickedItem = e.target;
  if (clickedItem.classList.contains("task-completed")) {
    clickedItem.parentElement.classList.toggle("task-completed");
  }

  if (clickedItem.classList.contains("task-deleted")) {
    clickedItem.parentElement.classList.toggle("hide");
    const deleteItem = clickedItem.parentElement.children[0].innerText;
    storageItemDelete(deleteItem);
    clickedItem.parentElement.addEventListener("transitionend", () => {
      clickedItem.parentElement.remove();
    });
  }
}

function addTask(e) {
  e.preventDefault();

  crateTaskItem(newTask.value);
  saveLocalStorage(newTask.value);
  newTask.value = "";
}

function saveLocalStorage(newTask) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function readStorage() {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((element) => {
    crateTaskItem(element);
  });
}

function crateTaskItem(task) {
  //crate div
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-item");

  //create li
  const taskLi = document.createElement("li");
  taskLi.classList.add("task");
  taskLi.innerText = task;
  taskDiv.appendChild(taskLi);

  //add div to ul
  taskList.appendChild(taskDiv);

  //add complete button
  const taskCompleteBtn = document.createElement("button");
  taskCompleteBtn.classList.add("task-btn");
  taskCompleteBtn.classList.add("task-completed");
  taskCompleteBtn.innerHTML = '<i class="far fa-check-square">';
  taskDiv.appendChild(taskCompleteBtn);

  //add delete button
  const taskDeleteBtn = document.createElement("button");
  taskDeleteBtn.classList.add("task-btn");
  taskDeleteBtn.classList.add("task-deleted");
  taskDeleteBtn.innerHTML = '<i class="far fa-trash-alt">';
  taskDiv.appendChild(taskDeleteBtn);
}

function storageItemDelete(task) {
  let tasks;

  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  //delete item with splice
  const deleteItemIndex = task.indexOf(task);
  tasks.splice(deleteItemIndex, 1);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
