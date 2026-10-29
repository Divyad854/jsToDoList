const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearButton = document.getElementById("clearButton");


// Get tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


// Display all tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        // Create li
        const li = document.createElement("li");

        li.classList.add("task");


        // Add completed class
        if (task.completed) {
            li.classList.add("completed");
        }


        // Left side
        const taskLeft = document.createElement("div");

        taskLeft.classList.add("task-left");


        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.dataset.id = task.id;


        // Task text
        const span = document.createElement("span");

        span.classList.add("task-text");

        span.textContent = task.text;


        // Add checkbox and text
        taskLeft.appendChild(checkbox);

        taskLeft.appendChild(span);


        // Buttons container
        const buttons = document.createElement("div");

        buttons.classList.add("task-buttons");


        // Edit button
        const editButton = document.createElement("button");

        editButton.classList.add("edit-button");

        editButton.textContent = "✏️ Edit";

        editButton.dataset.id = task.id;


        // Delete button
        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-button");

        deleteButton.textContent = "🗑️";

        deleteButton.dataset.id = task.id;


        // Add buttons
        buttons.appendChild(editButton);

        buttons.appendChild(deleteButton);


        // Add everything to li
        li.appendChild(taskLeft);

        li.appendChild(buttons);


        // Add li to list
        taskList.appendChild(li);

    });


    updateTaskCount();
}


// Add new task
function addTask() {

    const text = taskInput.value.trim();


    // Don't allow empty task
    if (text === "") {

        alert("Please enter a task.");

        return;
    }


    // Create new task
    const newTask = {

        id: Date.now(),

        text: text,

        completed: false

    };


    // Add task to array
    tasks.push(newTask);


    // Save
    saveTasks();


    // Display
    displayTasks();


    // Clear input
    taskInput.value = "";


    // Focus input
    taskInput.focus();
}


// Add button
addButton.addEventListener("click", function () {

    addTask();

});


// Press Enter to add
taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});


// Task list click events
taskList.addEventListener("click", function (event) {


    // =========================
    // COMPLETE TASK
    // =========================

    if (event.target.type === "checkbox") {

        const id = Number(event.target.dataset.id);


        const task = tasks.find(function (task) {

            return task.id === id;

        });


        if (task) {

            task.completed = event.target.checked;

        }


        saveTasks();

        displayTasks();

    }


    // =========================
    // EDIT TASK
    // =========================

    if (event.target.classList.contains("edit-button")) {

        const id = Number(event.target.dataset.id);


        const task = tasks.find(function (task) {

            return task.id === id;

        });


        if (task) {

            const newText = prompt(
                "Edit your task:",
                task.text
            );


            // User didn't press Cancel
            if (newText !== null) {

                const updatedText = newText.trim();


                // Don't allow empty task
                if (updatedText === "") {

                    alert("Task cannot be empty.");

                    return;
                }


                // Update task
                task.text = updatedText;


                // Save changes
                saveTasks();


                // Display changes
                displayTasks();

            }

        }

    }


    // =========================
    // DELETE TASK
    // =========================

    if (event.target.classList.contains("delete-button")) {

        const id = Number(event.target.dataset.id);


        tasks = tasks.filter(function (task) {

            return task.id !== id;

        });


        saveTasks();

        displayTasks();

    }

});


// =========================
// CLEAR COMPLETED
// =========================

clearButton.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {

        return task.completed === false;

    });


    saveTasks();

    displayTasks();

});


// =========================
// SAVE TASKS
// =========================

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


// =========================
// UPDATE TASK COUNT
// =========================

function updateTaskCount() {

    const totalTasks = tasks.length;


    const completedTasks = tasks.filter(function (task) {

        return task.completed;

    }).length;


    const remainingTasks =
        totalTasks - completedTasks;


    taskCount.textContent =
        `Tasks: ${remainingTasks} remaining / ${totalTasks} total`;

}


// Display tasks when page loads
displayTasks();