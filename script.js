document.addEventListener("DOMContentLoaded", function () {
    var alerts = document.querySelector(".alert");
    var alarms = document.getElementById("alarms");
    var formsArray = []; // Array to store all forms

    document.getElementById("alarmForm").addEventListener("click", function (event) {
        if (event.target.classList.contains("set")) {
            if (alerts) {
                alerts.style.display = "none";
            }
            setAlarm();
        }
    });

    function setAlarm() {
        const hour = parseInt(document.getElementById("alarmHour").value, 10);
        const minute = parseInt(document.getElementById("alarmMinute").value, 10);
        const second = parseInt(document.getElementById("alarmSecond").value, 10);

        const form = document.createElement("form");
        const left = document.createElement("p");
        const time = document.createElement("p");
        const button = document.createElement("button");
        time.id = "time";
        button.innerText = "Delete";
        left.innerText = "Time left:";
        button.className = "delete";
        form.id = "alarmForm1";
        form.appendChild(left);
        form.appendChild(time);
        form.appendChild(button);
        alarms.appendChild(form);

        // Start the countdown
        startCountdown(form, hour, minute, second);

        // Attach the click event listener to the "Delete" button
        button.addEventListener("click", function () {
            // Remove the form when the "Delete" button is clicked
            stopCountdown(form);
            alarms.removeChild(form);
            removeFromArray(form);
        });
    }

    function startCountdown(form, hour, minute, second) {
        const countdownInterval = setInterval(function () {
            const currentTime = new Date();
            const targetTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hour, minute, second);
            const timeDifference = targetTime - currentTime;

            if (timeDifference <= 0) {
                clearInterval(countdownInterval);
                // Replace "Delete" button with "Stop" button
                const stopButton = document.createElement("button");
                stopButton.className = "stop";
                stopButton.innerText = "Stop";
                stopButton.className = "stop";
                form.removeChild(form.querySelector(".delete"));
                form.appendChild(stopButton);

                // Attach the click event listener to the "Stop" button
                stopButton.addEventListener("click", function () {
                    stopCountdown(form);
                    alarms.removeChild(form);
                    removeFromArray(form);
                    playBuzzerSound();
                });
                playBuzzerSound();
            } else {
                // Update the time left in the form
                const timeElement = form.querySelector("#time");
                timeElement.innerText = formatTimeDifference(timeDifference);
                
            }
        }, 1000);
    }

    function stopCountdown(form) {
        // Stop the countdown (if needed)
    }

    function playBuzzerSound() {
        const buzzerAudio = new Audio('assets/alarm-clock-short-6402.mp3');
        buzzerAudio.play();
    }

    function formatTimeDifference(timeDifference) {
        const totalSeconds = Math.floor(timeDifference / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(remainingSeconds)}`;
    }

    function padZero(value) {
        return value < 10 ? `0${value}` : value;
    }

    function removeFromArray(form) {
        const index = formsArray.indexOf(form);
        if (index !== -1) {
            formsArray.splice(index, 1);
        }
    }
});
