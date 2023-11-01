(()=>{
    let youtubeLeftControls, youtubePlayer
    let currentVideo = ""

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        // response when a message is received and send back to the
        // sender
        const {type, value, videoID} = obj

        if(type=="NEW") {
            currentVideo = videoID
            newVideoLoaded()
        }

    })
    
})()