document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addTaskButton = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    renderTask(task);
  });

  addTaskButton.addEventListener("click", () => {
    const teaskText = todoInput.value.trim();
    if (teaskText === "") return;

    const newTask = {
      id: Date.now(),
      task: teaskText,
      completed: false,
    };

    tasks.push(newTask);
    saveTasks();
    todoInput.value = "";
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    li.innerHTML = `<span>${tasks.text}</span>
    <button>Delete</button>
    `;
    todoList.appendChild(li);
  }
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
