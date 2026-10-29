const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearButton = document.getElementById("clearButton");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task) {

        const li = document.createElement("li");

        li.classList.add("task");


        if (task.completed) {
            li.classList.add("completed");
        }


        const taskLeft = document.createElement("div");

        taskLeft.classList.add("task-left");


        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.dataset.id = task.id;


        const span = document.createElement("span");

        span.classList.add("task-text");

        span.textContent = task.text;

        taskLeft.appendChild(checkbox);

        taskLeft.appendChild(span);


        const buttons = document.createElement("div");

        buttons.classList.add("task-buttons");

        const editButton = document.createElement("button");

        editButton.classList.add("edit-button");

        editButton.textContent = "✏️ Edit";

        editButton.dataset.id = task.id;

        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete-button");

        deleteButton.textContent = "🗑️";

        deleteButton.dataset.id = task.id;


        buttons.appendChild(editButton);
        buttons.appendChild(deleteButton);


        li.appendChild(taskLeft);

        li.appendChild(buttons);

        taskList.appendChild(li);

    });


    updateTaskCount();
}

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {

        alert("Please enter a task.");

        return;
    }

    const newTask = {

        id: Date.now(),

        text: text,

        completed: false

    };


    tasks.push(newTask);


    saveTasks();


    displayTasks();


    taskInput.value = "";

    taskInput.focus();
}

addButton.addEventListener("click", function () {

    addTask();

});


taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});

taskList.addEventListener("click", function (event) {


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

            if (newText !== null) {

                const updatedText = newText.trim();


                if (updatedText === "") {

                    alert("Task cannot be empty.");

                    return;
                }

                task.text = updatedText;


                saveTasks();

                displayTasks();

            }

        }

    }


    if (event.target.classList.contains("delete-button")) {

        const id = Number(event.target.dataset.id);


        tasks = tasks.filter(function (task) {

            return task.id !== id;

        });


        saveTasks();

        displayTasks();

    }

});


clearButton.addEventListener("click", function () {

    tasks = tasks.filter(function (task) {

        return task.completed === false;

    });


    saveTasks();

    displayTasks();

});

function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

}


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

displayTasks();