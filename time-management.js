let countdown; // Store the setInterval reference
let totalTime = 0; // Track remaining time
let isPaused = false; // Track pause state
let notification = "";
let notifying;

// When the Set Timer button is pressed
async function setTimer(event) {
    event.preventDefault(); // Prevent form refresh

    // Retrieve the hours, minutes and seconds and calculate total time in seconds
    let hours = parseInt(document.getElementById('hours').value) || 0;
    let minutes = parseInt(document.getElementById('minutes').value) || 0;
    let seconds = parseInt(document.getElementById('seconds').value) || 0;
    notification = document.getElementById('notification').value || "";
    totalTime = seconds + minutes * 60 + hours * 3600;

    document.getElementById('timerForm').reset(); // Reset the form

    if (totalTime <= 0) {
        console.log("Invalid time");
        return;
    }

    clearInterval(countdown); // Clear any existing timer
    startCountdown(); // Start the countdown

}

function startCountdown() {
    countdown = setInterval(function () {
        if (totalTime <= 0) {
            if (notification !== ""){
                showNotification(); // Show notification once and then, 
                notifying = setInterval(showNotification, 30000); // Notification will display every 30 seconds
            }
            clearInterval(countdown);
            console.log("Timer finished!");
            return;
        }
        
        // If the timer is not paused keep counting down every second
        if (!isPaused) {
            totalTime--;

            // Calculate hours, minutes, seconds
            const hours = Math.floor(totalTime / 3600);
            const minutes = Math.floor((totalTime % 3600) / 60);
            const seconds = totalTime % 60;

            // Update the timer
            updateTimer(hours, minutes, seconds);
        }
    }, 1000);
}

// When the Pause button is pressed
function pauseTimer() {
    // Reset the state which will stop the timer
    isPaused = !isPaused;
    // Change the button display to the opposite
    const pauseBtn = document.getElementById('pauseBtn');
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

// When the Reset button is pressed
function resetTimer() {
    // Clear the interval and set the time to 0
    clearInterval(countdown);
    totalTime = 0;
    updateTimer(0, 0, 0);

    // Reset button text and pause state
    isPaused = false;
    document.getElementById('pauseBtn').textContent = 'Pause';
}

// To update the timer with the new value
async function updateTimer(hours, minutes, seconds) {
    const timer = document.getElementById("timer");

    // Make sure these are two digits
    hours = hours.toString().padStart(2, "0");
    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    // Display in the format HH:MM:SS
    timer.textContent = `${hours}:${minutes}:${seconds}`;
}

// When the Stop Notifications button is pressed
function stopNotification(){
    clearInterval(notifying);
    notification="";
    document.getElementById('notificationContainer').textContent = ""; // Clear the notification container
    document.getElementById('notificationButtonContainer').innerHTML = ""; // Remove the button
}

// Display the notification when the timer reaches 0.
function showNotification(){
    // Retrieve the container
    const notificationContainer = document.getElementById('notificationContainer');
    // Display notification
    notificationContainer.textContent = notification;
    // Display button to stop notifications
    document.getElementById('notificationButtonContainer').innerHTML = `<center><button id="notificationButton" class="btn btn-secondary" onclick="stopNotification()">Stop Notifications</button></center>`;
    // Only display notification for 3 seconds and then remove it
    setTimeout(()=>{
        notificationContainer.textContent="";
    }, 3000);
}

// DELAYED JOKE SECTION

// Function to fetch the joke
async function fetchJoke(callback) {
    try {
        const apiUrl = `https://v2.jokeapi.dev/joke/Any?type=twopart`; // Retrieve the joke from the api
        const response = await fetch(apiUrl);
        const jokeData = await response.json();
        callback(jokeData); // Callback function to handle the data
    }catch(error){
        console.log('Error retrieving joke from the API: ', error);
    }
}

const handleJokeData = (jokeData) => {
    // Retrieve the containers
    const setupContainer = document.getElementById('setup');
    const punchlineContainer = document.getElementById('punchline');
    // Empty the containers
    setupContainer.innerHTML = "";
    punchlineContainer.innerHTML = "";
    // Retrieve the delay requested by user
    let delay = parseInt(document.getElementById('delayTime').value) || 0;
    try {
        // Display the setup
        setupContainer.innerHTML = `<strong>Setup</strong>: ${jokeData.setup}`;
        // Display the punchline after the requested delay
        setTimeout(()=>{
            punchlineContainer.innerHTML = `<strong>Punchline</strong>: ${jokeData.delivery}`;
    }, delay);
        // Reset the form
        document.getElementById('delayForm').reset();
    }catch(error){
        console.log('Error handling joke: ', error); 
    }
};

// When the click the New Joke button 
function newJoke(event){
    event.preventDefault();
    fetchJoke(handleJokeData);
}