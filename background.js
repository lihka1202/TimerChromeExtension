chrome.tabs.onUpdated.addListener((tabID, tab) => {
    if(tab.url && tab.url.includes("youtube.com/watch")) {
        const queryParameters = tab.url.split("?")[1]
        const urlParameters = new URLSearchParams(queryParameters)

        console.log(urlParameters)
        // Send a Message to the contentScript, and let it know that
        // A new vid has loaded with the Query Parameter

        chrome.tabs.sendMessage(tabID, {
            type : "NEW",
            videoID : urlParameters.get("v")
        })
    }
})