document.addEventListener("DOMContentLoaded", function () {
    var alerts = document.querySelector(".alert");
    var alarms = document.getElementById("alarms");
    var formsArray = []; // Array to store all forms

    document.getElementById("alarmForm").addEventListener("click", (event) => {
        if (event.target.classList.contains("set")) {
            if (alerts) {
                alerts.style.display = "none";
            }
            setAlarm();
        }
    });

    function setAlarm() {
        const currentDateTime = new Date();
        const currentHour = currentDateTime.getHours();
        const currentMinute = currentDateTime.getMinutes();
        const currentSecond = currentDateTime.getSeconds();

        const selectedHour = parseInt(document.getElementById("alarmHour").value, 10);
        const selectedMinute = parseInt(document.getElementById("alarmMinute").value, 10);
        const selectedSecond = parseInt(document.getElementById("alarmSecond").value, 10);

        // Check if the selected time is in the past
        if (selectedHour < currentHour ||
            (selectedHour === currentHour && selectedMinute < currentMinute) ||
            (selectedHour === currentHour && selectedMinute === currentMinute && selectedSecond < currentSecond)) {
            alert("Please select a future time for the alarm.");
            return;
        }

        const form = document.createElement("form");
        const left = document.createElement("p");
        const time = document.createElement("p");
        const button = document.createElement("button");
        const audio = document.createElement("audio"); // Create audio element

        audio.src = 'assets/alarm-clock-short-6402.mp3';
        audio.loop = true; // Set to true if you want the alarm to loop
        audio.volume = .5; // Set the initial volume

        time.id = "time";
        button.innerText = "Delete";
        left.innerText = "Time left:";
        button.className = "delete";
        form.id = "alarmForm1";
        form.appendChild(left);
        form.appendChild(time);
        form.appendChild(button);
        form.appendChild(audio); // Append the audio element to the form
        alarms.appendChild(form);

        // Start the countdown
        startCountdown(form, selectedHour, selectedMinute, selectedSecond, audio);

        // Attach the click event listener to the "Delete" button
        button.addEventListener("click", function () {
            // Remove the form when the "Delete" button is clicked
            stopCountdown(form);
            alarms.removeChild(form);
            removeFromArray(form);
        });
    }

    function startCountdown(form, hour, minute, second, audio) {
        const countdownInterval = setInterval(function () {
            const currentTime = new Date();
            const targetTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), hour, minute, second);
            const timeDifference = targetTime - currentTime;
    
            if (timeDifference <= 0) {
                clearInterval(countdownInterval);
                // Change background color to yellow
                form.style.backgroundColor = 'yellow';
    
                // Replace "Delete" button with "Stop" button
                const stopButton = document.createElement("button");
                stopButton.className = "stop";
                stopButton.innerText = "Stop";
                stopButton.className = "stop";
                form.removeChild(form.querySelector(".delete"));
                form.appendChild(stopButton);
    
                // Remove the "Time left:" text
                const leftElement = form.querySelector("p:first-child");
                leftElement.innerText = '';
    
                // Update the text to "Timmer Is Up !"
                const timeElement = form.querySelector("#time");
                timeElement.innerHTML = ''; // Clear existing content
                const textNode = document.createTextNode("Timmer Is Up !");
                timeElement.appendChild(textNode);
                timeElement.style.color = "rgba(52, 52, 74, 1)";
                timeElement.style.fontSize = "20px";
    
                // Attach the click event listener to the "Stop" button
                stopButton.addEventListener("click", function () {
                    stopCountdown(form);
                    alarms.removeChild(form);
                    removeFromArray(form);
                });
    
                playBuzzerSound(audio); // Pass the audio element to play the sound
            } else {
                // Update the time left in the form
                const timeElement = form.querySelector("#time");
                timeElement.innerText = formatTimeDifference(timeDifference);
            }
        }, 1000);
    }
    
    
    

    function playBuzzerSound(audio) {
        audio.play();
    }

    function stopCountdown(form) {
        const buzzerAudio = form.querySelector("audio");
        if (buzzerAudio) {
            buzzerAudio.pause();
            buzzerAudio.currentTime = 0;
        }
        // Stop the countdown (if needed)
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
