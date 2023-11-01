const timeElement = document.getElementById("time")
const currentTime = new Date().toLocaleTimeString()

const nameElement = document.getElementById("name")
timeElement.textContent = `The time is ${currentTime}`

chrome.action.setBadgeText(
    {
        text : "TIMER"
    },
    () => {
        console.log("Finished Setting the Badge Text")
    }
)

// get the data from sync storage and update the name that is displayed
chrome.storage.sync.get(
    ["name"],
    (res) => {
        const name = res.name ?? "????" // checks if valid, if not get ???
        nameElement.textContent = `Your name is: ${name}`
    }
)