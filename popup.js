const timeElement = document.getElementById("time")
const currentTime = new Date().toLocaleTimeString()
timeElement.textContent = `The time is ${currentTime}`

chrome.action.setBadgeText(
    {
        text : "TIMER"
    },
    () => {
        console.log("Finished Setting the Badge Text")
    }
)