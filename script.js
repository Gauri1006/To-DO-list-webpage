let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filter = "all") {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    let filtered = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    filtered.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        li.innerHTML = `
            <span onclick="toggleTask(${index})">${task.text}</span>
            <div class="actions">
                <button onclick="editTask(${index})">✏️</button>
                <button onclick="deleteTask(${index})">❌</button>
            </div>
        `;

        list.appendChild(li);
    });

    updateCount();
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value.trim()) return;

    tasks.push({ text: input.value, completed: false });
    input.value = "";

    saveTasks();
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText) {
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
    }
}

function filterTasks(type) {
    renderTasks(type);
}

function updateCount() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    document.getElementById("taskCount").innerText =
        `✨ ${completed} / ${total} tasks completed`;
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// Initial render
renderTasks();