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


        // Get the time-period data
        chrome.storage.sync.get(["time"],
        (res)=> {
            const notificationTime = res.time ?? 1000
            if(time%notificationTime==0) { // not get spammed
                self.registration.showNotification("Chrome Timer Extension", { //needs to be self, not this
                    body : `${notificationTime} second has passed`,
                    icon : "chronometer.png",
                })
            }
            
        })


        
    })
})