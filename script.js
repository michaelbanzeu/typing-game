window.addEventListener('load', init);

// Globals variables

// Available levels
const levels = {
    easy: 5,
    medium: 3,
    hard: 2
}

// To change level
const currentLevel = levels.easy;

var time = currentLevel;
var score = 0;
var isPlaying;

// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = ["my", "oh", "dog", "few", "bird", "dual", "know", "ring", "about", "hello", "lucky", "union", "carbon", "enough", "league", "racing", "between", "example", "journey", "license", "audience", "discount", "normally", "ultimate", "celebrate", "immediate", "represent", "satellite", "basketball", "everywhere", "historical", "understand", "immediately", "residential", "significant", "transaction", "demonstrated", "headquarters", "implications", "satisfaction"];

// Initialize game
function init() {
    // Show number of seconds in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    //Start matching on word input
    wordInput.addEventListener('input', startMatch);
    // Call coutdown every second
    setInterval(countDown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
}

function startMatch() {
    if (matchWords()) {
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = "";
        score++;
    }

    // Display 0 if the score is -1 (the player restart a new game) 
    if (score === -1) {
        scoreDisplay.innerHTML = 0;
    } else {
        scoreDisplay.innerHTML = score;
    }
}

// Match currentWord to wordInput
function matchWords() {
    if (wordInput.value === currentWord.innerHTML) {
        message.innerHTML = "Correct!";
        return true;
    } else {
        message.innerHTML = "";
        return false;
    }
}

// Pick & show random word
function showWord(words) {
    // Generate random array index
    const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[randIndex];
}

// Countdown timer
function countDown() {
    // Make sure time is not run out
    if (time > 0) {
        // Decrement
        time--;
    } else if (time === 0) {
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
    if (!isPlaying && time === 0) {
        message.innerHTML = "Game Over!";
        score = -1;
    }
}