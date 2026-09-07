const API_URL = "/api/todos";

async function loadTodos() {
    const response = await fetch(API_URL);
    const todos = await response.json();

    const todoList = document.getElementById("todoList");
    todoList.innerHTML = "";

    todos.forEach(todo => {
        const li = document.createElement("li");
        li.className = "todo-item";

        if (todo.completed) {
            li.classList.add("completed");
        }

        li.innerHTML = `
            <div class="todo-content">
                <input
                    type="checkbox"
                    ${todo.completed ? "checked" : ""}
                    onchange="toggleTodo(${todo.id}, '${escapeQuotes(todo.task)}', this.checked)"
                >
                <span>${escapeHtml(todo.task)}</span>
            </div>

            <button
                class="delete-btn"
                onclick="deleteTodo(${todo.id})">
                Delete
            </button>
        `;

        todoList.appendChild(li);
    });
}

async function addTodo() {
    const input = document.getElementById("todoInput");
    const task = input.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: task,
            completed: false
        })
    });

    input.value = "";
    loadTodos();
}

async function toggleTodo(id, task, completed) {
    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            task: task,
            completed: completed
        })
    });

    loadTodos();
}

async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadTodos();
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function escapeQuotes(text) {
    return text.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

document.getElementById("todoInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTodo();
    }
});

loadTodos();
