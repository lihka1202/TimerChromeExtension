let tasks = [];

// Get a reference to the timer button
const startTimerBtn = document.getElementById("start-timer-btn");

// This is to update the timer on the screen
function updateTimer() {
    chrome.storage.local.get(["timer"], (res) => {
        const timeHolder = document.getElementById("time-remaining");
        const minutes = 25 - res.timer / 60;
        const seconds = 60 - (res.timer % 60);
        timeHolder.textContent = `${minutes}:${seconds}`;
    });
}

// Call the function once atleast
updateTimer();

// Set intervals in 1 second to trigger this for atleast a 1000 times
setInterval(updateTimer, 1000);

// if Start Timer is clicked, toggle the value of the isRunning var, and also change the text
startTimerBtn.addEventListener("click", () => {
    chrome.storage.local.get(["isRunning"], (res) => {
        let isRunning = !res.isRunning;
        // Set the value first
        chrome.storage.local.set({
            isRunning: isRunning,
        });

        // Toggle the words on the button, and switch when needed
        startTimerBtn.textContent = isRunning ? "Stop Timer" : "Start Timer";
    });
});

// Place isRunning to off and set the timer variable to 0, reset text content
const resetTimerBtn = document.getElementById("reset-timer-btn");

resetTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set(
        {
            timer: 0,
            isRunning: false,
        },
        () => {
            startTimerBtn.textContent = "Start Timer";
        },
    );
});

//Read from the storage to see if it already exists
chrome.storage.sync.get(["tasks"], (res) => {
    tasks = res.tasks ? res.tasks : [];
    renderTasks();
});

function saveTasks() {
    chrome.storage.sync.set({
        tasks: tasks,
    });
}

function renderTasks() {
    tasks.forEach((_, taskNum) => {
        // If you dont mention the taskText you end up with a weird error
        renderTask(taskNum);
    });
}

//Logic to delete the task here
function deleteTask(taskNum) {
    //delete the task using splice from the array
    tasks.splice(taskNum, 1);

    //Set the whole container as 0, this could be a function by itself
    const taskContainer = document.getElementById("task-container");

    //Empty the task container
    taskContainer.textContent = "";

    renderTasks();

    saveTasks();
}

// Move the rendering logic here
function renderTask(taskNum) {
    // Make a div
    const taskRow = document.createElement("div");

    //Make the children in the div
    const taskInput = document.createElement("input");
    taskInput.type = "text";
    taskInput.placeholder = "Enter a task..";

    //Add the value to make sure it exists when deleting
    taskInput.value = tasks[taskNum];

    //Check if the input changes and update it
    taskInput.addEventListener("change", () => {
        tasks[taskNum] = taskInput.value;
        saveTasks();
    });

    //Button creation
    const taskBtn = document.createElement("input");
    taskBtn.type = "button";
    taskBtn.value = "X";
    taskBtn.addEventListener("click", () => {
        deleteTask(taskNum);
        saveTasks();
    });

    //Append the data into the div
    taskRow.appendChild(taskInput);
    taskRow.appendChild(taskBtn);

    //Append the whole div into the main task-container
    const taskContainer = document.getElementById("task-container");
    taskContainer.appendChild(taskRow);
}
// Add a div containing the input and a button to the task container
document.getElementById("add-task-btn").addEventListener("click", () => {
    // Add a task handler
    const taskNum = tasks.length;
    tasks.push("");
    renderTask(taskNum);
    saveTasks();
});
