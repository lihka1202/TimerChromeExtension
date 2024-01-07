// Create the basic alarm
chrome.alarms.create('Pomodorro Timer', { periodInMinutes: 1 / 60 });
// Add a listener to track the changes
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'Pomodorro Timer') {
    // Get the local variables and increment if we need to
    chrome.storage.local.get(['timer', 'isRunning'], (res) => {
      let timer = res.timer + 1;

      if (res.isRunning) {
        timer += 1;
        if (res.timer === 25 * 60) {
          // Change to using the tabs
          this.registration.showNotification('Pomodoro Timer', {
            body: '25 mins has passed',
            icon: 'chronometer.png',
          });
          timer = 0;
          res.isRunning = false;
        }
        // Once the timer has been updated, we want to set the value
        chrome.storage.local.set({
          timer,
          isRunning: res.isRunning,
        });
      }
    });
  }
});

// Check if the timer is on or not, if on, how much time is left
chrome.storage.local.get(['timer', 'isRunning'], (res) => {
  chrome.storage.local.set({
    timer: 'timer' in res ? res.timer : 0,
    isRunning: 'isRunning' in res ? res.isRunning : false,
  });
});
