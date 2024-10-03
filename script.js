let isClock = true;
let clockInterval, stopwatchInterval;
let stopwatchRunning = false;
let hours = 0, minutes = 0, seconds = 0;
let milliseconds = 0;

function switchView() {
    const clock = document.getElementById('clockControls');
    const stopWatch = document.getElementById('stopwatchControls');
    const switchBtn = document.getElementById('switchBTn');

    if (isClock) {
        clearInterval(clockInterval);
        clock.textContent = "00:00:00:00";
        stopWatch.style.display = 'block';
        switchBtn.textContent = "Switch to Clock";
        resetStopwatch();
    } else {
        clearInterval(stopwatchInterval);
        stopWatch.style.display = 'none';
        switchBtn.textContent = "Switch to Stopwatch";
        updateClock();
        clockInterval = setInterval(updateClock, 1000);
    }
    isClock = !isClock;
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    document.getElementById('clockControls').textContent = `${hours}:${minutes}:${seconds}`;
}

function startStopwatch() {
    if (!stopwatchRunning) {
        stopwatchInterval = setInterval(updateStopwatch, 100); // Run every 100ms
        stopwatchRunning = true;
    }
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
    stopwatchRunning = false;
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    document.getElementById('clockControls').textContent = "00:00:00:00";
    stopwatchRunning = false;
}

function updateStopwatch() {
    milliseconds += 10;  // Increment by 10 to show 2-digit milliseconds
    if (milliseconds >= 100) {  // Reset after reaching 100ms
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }

    // Format the time with leading zeros
    let displayHours = hours < 10 ? "0" + hours : hours;
    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    let displayMilliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;  // Always two digits

    // Update the stopwatch display
    document.getElementById('clockControls').textContent = `${displayHours}:${displayMinutes}:${displaySeconds}:${displayMilliseconds}`;
}

window.onload = function () {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
};
