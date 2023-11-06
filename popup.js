const timeElement = document.getElementById("time")


const nameElement = document.getElementById("name")
const timerCurrent = document.getElementById("time-left")



function updateTimeElements() {
    chrome.storage.local.get(
        ["timer"],
        (res) => {
            timerCurrent.textContent = res.timer ?? 0
        }
    )

    const currentTime = new Date().toLocaleTimeString()
    timeElement.textContent = `The time is ${currentTime}`
}

updateTimeElements() // This needs to be called due to a one second delay
setInterval(updateTimeElements, 1000) // 1000 is the timeout


// get the data from sync storage and update the name that is displayed




chrome.storage.sync.get(
    ["name", "timer"],
    (res) => {
        const name = res.name ?? "????" // checks if valid, if not get ???
        nameElement.textContent = `Your name is: ${name}`
    }
)

const startBtn = document.getElementById("start-btn")
const stopBtn = document.getElementById("stop-btn")
const resetBtn = document.getElementById("reset-btn")

startBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning : true
    })
})
stopBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning : false
    })
})
resetBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer : 0,
        isRunning : false
    })
})