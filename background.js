chrome.alarms.create({
    periodInMinutes: 1/60 // this is in minutes
})

chrome.alarms.onAlarm.addListener((alarms) => {
    chrome.storage.local.get(["timer"], (res) => {
        const time = res.timer ?? 0
        // mod the value in the timer every single second
        chrome.storage.local.set({
            timer : time + 1
        })

        // Ensure that this is reflected on the Badge too
        chrome.action.setBadgeText(
            {
                text : `${time + 1}`
            })
    })
})