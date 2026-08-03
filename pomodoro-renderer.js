const timeDisplay = document.getElementById("time-display");
const StartPauseButton = document.getElementById("start-pause-button");

let secondsleft = 25 * 60;
let timerId = null;
let isRunning = false;

function updateDisplay() {
    const minutes = Math.floor(secondsleft / 60);
    const seconds = secondsleft % 60;
    const secondsText = seconds < 10 ? "0" + seconds : seconds;
    timeDisplay.textContent = minutes + ":" + secondsText
}

function tick() {
    secondsleft = secondsleft - 1;
    updateDisplay();

    if (secondsleft <= 0) {
        clearInterval(timerId);
        isRunning = false;
        StartPauseButton.textContent = "Start";
        timeDisplay.textContent = "Time's up bucko";
    }
}

StartPauseButton.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timerId);
        isRunning = false;
        StartPauseButton.textContent = "Start";
    } else {
        timerId = setInterval(tick, 1000);
        isRunning = true;
        StartPauseButton.textContent = "Pause";
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        window.panelAPI.hidePanel();
    }
});

