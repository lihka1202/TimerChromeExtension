(()=>{
    let youtubeLeftControls, youtubePlayer
    let currentVideo = ""
    let currentVideoBookmarks = []

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        // response when a message is received and send back to the
        // sender
        const {type, value, videoID} = obj

        if(type=="NEW") {
            currentVideo = videoID
            newVideoLoaded()
        }
    })

    const newVideoLoaded = () => {
        const bookmarkBtnExists = document.getElementsByClassName("bookmark-btn")[0]

        if(!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement("img")

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png")
            bookmarkBtn.className = "ytp-button " + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark the current timestamp"

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0]
            youtubePlayer = document.getElementsByClassName("video-stream")[0]

            youtubeLeftControls.appendChild(bookmarkBtn)
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler)
        }
    }

    const addNewBookmarkEventHandler = () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookMark = {
            time : currentTime,
            desc : "Bookmark at " + getTime(currentTime)
        }
    }

    newVideoLoaded() //Note that this would load the video twice
    //Whenever the pattern matches

    //Convert the time into something better
    const getTime = (t) => {
        var date = new Date(0);
        date.setSeconds(t)

        return date.toISOString().substr(11,8)
    }

    console.log(newBookMark)

    chrome.storage.sync.set({
        [currentVideo] : JSON.stringify([...currentVideoBookmarks, newBookMark].sort((a,b) => a.time - b.time))
    })

})()