const todoInput = document.getElementById("todo-input");
const todoResults = document.getElementById("todo-results");

let tasks = [];

function renderTasks() {
    todoResults.innerHTML = "";

    for (const task of tasks) {
        const item = document.createElement("div");
        item.textContent = task;
        todoResults.appendChild(item);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        window.panelAPI.hidePanel();
    }

    if (event.key === "Enter" && todoInput.value.trim() !== "") {
        tasks.push(todoInput.value.trim());
        renderTasks();
        todoInput.value = "";
    }
})