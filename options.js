const nameInput = document.getElementById("name-input")
const timePeriod = document.getElementById("timer-duration")
const saveBtn = document.getElementById("save-btn")

saveBtn.addEventListener("click", ()=> {
    const name = nameInput.value
    const time = timePeriod.value

    chrome.storage.sync.set({
        name : name,
        time : time,
    }, () => {
        console.log(`Name has been set to ${name}`)
    })

    chrome.storage.sync.get(
        ["name", "time"] , (res) => {
            nameInput.value = res.name
            time.value = res.time ?? 1000
        }
    )
})