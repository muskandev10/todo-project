const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearBtn = document.getElementById("clearBtn");
const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const completedCount = document.getElementById("completedCount");


// ADD TASK
addBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.classList.add("task");

    li.innerHTML = `
        <input type="checkbox">
        <span class="task-text">${taskText}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(li);

    taskInput.value = "";

    saveTasks();
    updateTotalCount();
    updatePendingCount();
    updateCompletedCount();
    showEmptyMessage();
});


// DELETE + EDIT
taskList.addEventListener("click", function (event) {

    // DELETE
    if (event.target.classList.contains("delete-btn")) {

        const task = event.target.parentElement;

        task.remove();

        saveTasks();
        updateTotalCount();
        updatePendingCount();
        updateCompletedCount();
        showEmptyMessage();
    }


    // EDIT
    if (event.target.classList.contains("edit-btn")) {

        const task = event.target.parentElement;
        const taskText = task.querySelector(".task-text");

        const newText = prompt(
            "Edit your task:",
            taskText.textContent
        );

        if (newText !== null && newText.trim() !== "") {

            taskText.textContent = newText.trim();

            saveTasks();
            updateTotalCount();
            updatePendingCount();
            updateCompletedCount();
        }
    }

});


// COMPLETE TASK
taskList.addEventListener("change", function (event) {

    if (event.target.type === "checkbox") {

        const task = event.target.parentElement;

        task.classList.toggle("completed");

        saveTasks();
        updateTotalCount();
        updatePendingCount();
        updateCompletedCount();
    }

});


// FILTER
filterBtns.forEach(function (button) {

    button.addEventListener("click", function () {

        filterBtns.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        const tasks = document.querySelectorAll(".task");

        tasks.forEach(function (task) {

            const checkbox = task.querySelector(
                "input[type='checkbox']"
            );

            if (filter === "all") {

                task.style.display = "flex";

            }
            else if (filter === "pending") {

                if (checkbox.checked) {
                    task.style.display = "none";
                } else {
                    task.style.display = "flex";
                }

            }
            else if (filter === "completed") {

                if (checkbox.checked) {
                    task.style.display = "flex";
                } else {
                    task.style.display = "none";
                }

            }

        });

    });

});


// SAVE TASKS
function saveTasks() {

    const tasks = [];

    const allTasks = document.querySelectorAll(".task");

    allTasks.forEach(function (task) {

        const text = task.querySelector(".task-text").textContent;

        const completed = task.querySelector(
            "input[type='checkbox']"
        ).checked;

        tasks.push({
            text: text,
            completed: completed
        });

    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// LOAD TASKS
const savedTasks = localStorage.getItem("tasks");

if (savedTasks) {

    const tasks = JSON.parse(savedTasks);

    // Remove existing HTML tasks
    taskList.innerHTML = "";

    tasks.forEach(function (taskData) {

        const li = document.createElement("li");

        li.classList.add("task");

        li.innerHTML = `
            <input type="checkbox">
            <span class="task-text">${taskData.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;

        const checkbox = li.querySelector(
            "input[type='checkbox']"
        );

        checkbox.checked = taskData.completed;

        if (taskData.completed) {
            li.classList.add("completed");
        }

        taskList.appendChild(li);
    });
}

clearBtn.addEventListener("click", function () {
    const confirmClear = confirm("Are you sure you want to delete all tasks?");

    if (!confirmClear) {
        return;
    }
    taskList.innerHTML = "";

    localStorage.removeItem("tasks");
    updateTotalCount();
    updatePendingCount();
    updateCompletedCount();
    showEmptyMessage();
});

function updateTotalCount() {
    const totalTasks = document.querySelectorAll(".task").length;

    totalCount.textContent = "Total Tasks: " + totalTasks;
}

function updatePendingCount() {
    const pendingTasks = document.querySelectorAll(".task:not(.completed)").length;

    pendingCount.textContent = "Pending Tasks: " + pendingTasks;
}

function updateCompletedCount() {
    const completedTasks = document.querySelectorAll(".task.completed").length;

    completedCount.textContent = "Completed Tasks: " + completedTasks;
}

updateTotalCount();
updatePendingCount();
updateCompletedCount();

function showEmptyMessage() {

    const existingMessage = document.querySelector(".empty-message");

    if (existingMessage) {
        existingMessage.remove();
    }

    const tasks = document.querySelectorAll(".task");

    if (tasks.length === 0) {

        const message = document.createElement("p");

        message.classList.add("empty-message");

        message.innerHTML = `
    No tasks yet!<br>
    Add your first task above.
`;

        taskList.appendChild(message);
    }
}

showEmptyMessage();