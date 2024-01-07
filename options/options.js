// Add in validation for the number field
const timeOption = document.getElementById('time-option');

// listener to ensure when this value changes
timeOption.addEventListener('change', (event) => {
  // This basically helps you find the value in the number
  const val = event.target.value;

  // find how diff the value is, and modify it
  if (val < 1 || val > 60) {
    timeOption.value = 25;
  }
});

const saveBtn = document.getElementById('save-time-option-btn');

// listen to changes on this button, and update the value
saveBtn.addEventListener('click', () => {
  chrome.storage.local.set({
    timeOption: timeOption.value,
    isRunning: false,
    timer: 0,
  });
});
