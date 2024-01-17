// Create the basic alarm
chrome.alarms.create('Pomodorro Timer', { periodInMinutes: 1 / 60 });
// Add a listener to track the changes
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'Pomodorro Timer') {
    // Get the local variables and increment if we need to
    chrome.storage.local.get(['timer', 'isRunning', 'timeOption'], (res) => {
      let timer = res.timer + 1;

      if (res.isRunning) {
        if (res.timer === 60 * res.timeOption) {
          // Change to using the tabs
          // this.registration.showNotification('Pomodoro Timer', {
          //   body: `${res.timeOption} minutes have passed! Great Job!`,
          //   icon: 'chronometer.png',
          // });
          chrome.notifications.create({
            title: 'Time has ended!',
            message: 'Time has ended!',
            iconUrl: 'chronometer.png',
            type: 'basic',
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
    timeOption: 'timeOption' in res ? res.timeOption : 25,
  });
});
