const tasks = []

//Logic to delete the task here
function deleteTask (taskNum){
    //delete the task using splice from the array
    tasks.splice(taskNum,1)

    //Set the whole container as 0, this could be a function by itself
    const taskContainer = document.getElementById('task-container')

    //Empty the task container
    taskContainer.textContent = ""

    //Use forEach to loop and re-render
    tasks.forEach((taskText, taskNum) => {
        // If you dont mention the taskText you end up with a weird error
        renderTask(taskNum)
    })
}

// Move the rendering logic here
function renderTask(taskNum) {
    // Make a div
    const taskRow = document.createElement("div")

    //Make the children in the div
    const taskInput = document.createElement("input")
    taskInput.type = "text"
    taskInput.placeholder = "Enter a task.."

    //Add the value to make sure it exists when deleting
    taskInput.value = tasks[taskNum]

    //Check if the input changes and update it
    taskInput.addEventListener('change', ()=> {
        tasks[taskNum] = taskInput.value
    })

    //Button creation
    const taskBtn = document.createElement('input')
    taskBtn.type = "button"
    taskBtn.value = 'X'
    taskBtn.addEventListener('click', ()=> {
        deleteTask(taskNum)
    })

    //Append the data into the div
    taskRow.appendChild(taskInput)
    taskRow.appendChild(taskBtn)

    //Append the whole div into the main task-container
    const taskContainer = document.getElementById('task-container')
    taskContainer.appendChild(taskRow)

}
// Add a div containing the input and a button to the task container
document.getElementById("add-task-btn").addEventListener(
    "click",
    () => {
        // Add a task handler
        const taskNum = tasks.length
        tasks.push("")
        renderTask(taskNum)

    }
)