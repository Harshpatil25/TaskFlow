let modeBtn = document.querySelector('#modeBtn');
let addBtn = document.querySelector('#addBtn');
let clearBtn = document.querySelector('#clearBtn');
let input = document.querySelector('#taskInput');
let list = document.querySelector('#taskList');
let body = document.querySelector('body');
const themeLink = document.getElementById("themeStylesheet");
let pendingList = document.querySelector('#pendingList');
let completedList = document.querySelector('#completedList');

// Changing Mode - Light / Dark
// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    themeLink.setAttribute("href", "style-dark.css");
}

// Toggle theme
modeBtn.addEventListener("click", () => {
    if (themeLink.getAttribute("href") === "style-light.css") {
        themeLink.setAttribute("href", "style-dark.css");
        localStorage.setItem("theme", "dark");
    } else {
        themeLink.setAttribute("href", "style-light.css");
        localStorage.setItem("theme", "light");
    }
});

// Changing Mode - complete
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    if (pendingList) pendingList.innerHTML = "";
    if (completedList) completedList.innerHTML = "";

    tasks.forEach((task, index) => {

        let li = document.createElement("li");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        let span = document.createElement("span");
        span.innerText = task.text;

        li.appendChild(checkbox);
        li.appendChild(span);

        // If task completed → completed list
        if (task.completed) {
            if (completedList) completedList.appendChild(li);
        } else {
            if (pendingList) pendingList.appendChild(li);
        }

        // Toggle complete
        checkbox.addEventListener("change", () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });
    });
}

renderTasks();

// Adding task 
if(addBtn){
addBtn.addEventListener("click", () => {

    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    renderTasks();

    input.value = "";
});
}

// Adding task - complete

// Clearing task
if (clearBtn) {
    clearBtn.addEventListener("click", () => {
        tasks = tasks.filter(task => !task.completed);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    });
}

// Clearing task - complete