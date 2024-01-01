const tasks = []
// Add a div containing the input and a button to the task container
document.getElementById("add-task-btn").addEventListener(
    "click",
    () => {
        // Add a task handler
        const taskNum = tasks.length
        tasks.push("")

        // Make a div
        const taskRow = document.createElement("div")

        //Make the children in the div
        const taskInput = document.createElement("input")
        taskInput.type = "text"
        taskInput.placeholder = "Enter a task.."
        //Check if the input changes and update it
        taskInput.addEventListener('change', ()=> {
            tasks[taskNum] = taskInput.value
            console.log(tasks)
            console.log(taskNum)
        })

        //Button creation
        const taskBtn = document.createElement('input')
        taskBtn.type = "button"
        taskBtn.value = 'X'

        //Append the data into the div
        taskRow.appendChild(taskInput)
        taskRow.appendChild(taskBtn)

        //Append the whole div into the main task-container
        const taskContainer = document.getElementById('task-container')
        taskContainer.appendChild(taskRow)

    }
)