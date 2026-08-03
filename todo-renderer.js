const todoInput = document.getElementById("todo-input");
const todoResults = document.getElementById("todo-results");

let tasks = [];

function renderTasks() {
    todoResults.innerHTML = "";

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        const row = document.createElement("div");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.done;

        checkbox.addEventListener("change", () => {
            tasks[i].done = checkbox.checked;
            renderTasks();
        });

        const label = document.createElement("span");
        label.textContent = task.text;
        row.appendChild(checkbox);
        row.appendChild(label);
        todoResults.appendChild(row);
    }
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        window.panelAPI.hidePanel();
    }

    if (event.key === "Enter" && todoInput.value.trim() !== "") {
        tasks.push({ text: todoInput.value.trim(), done: false });
        renderTasks();
        todoInput.value = "";
    }
});