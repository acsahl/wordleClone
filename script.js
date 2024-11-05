const words = ["apple", "bread", "grape", "peach", "berry"]; // Add more words as needed
const targetWord = words[Math.floor(Math.random() * words.length)];
const maxAttempts = 6;
let attempts = 0;

document.getElementById('submitGuess').addEventListener('click', () => {
    const guessInput = document.getElementById('guessInput');
    const guess = guessInput.value.toLowerCase();

    if (guess.length !== 5) {
        alert("Please enter a 5-letter word.");
        return;
    }

    attempts++;
    displayGuess(guess);
    evaluateGuess(guess);

    guessInput.value = '';
    if (guess === targetWord) {
        document.getElementById('message').textContent = "Congratulations! You've guessed the word!";
        document.getElementById('restart').style.display = "block";
    } else if (attempts === maxAttempts) {
        document.getElementById('message').textContent = `Sorry, you've used all attempts! The word was "${targetWord}".`;
        document.getElementById('restart').style.display = "block";
    }
});

document.getElementById('restart').addEventListener('click', () => {
    location.reload(); // Reload the page to start a new game
});

function displayGuess(guess) {
    const guessContainer = document.getElementById('guessContainer');
    const guessRow = document.createElement('div');

    for (let i = 0; i < guess.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = guess[i];
        guessRow.appendChild(cell);
    }

    guessContainer.appendChild(guessRow);
}

function evaluateGuess(guess) {
    const result = Array(5).fill('absent');

    // Check for correct letters
    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === targetWord[i]) {
            result[i] = 'correct';
        } else if (targetWord.includes(guess[i])) {
            result[i] = 'present';
        }
    }

    // Update the cells with the appropriate class
    const cells = document.querySelectorAll('.cell');
    const rowCells = Array.from(cells).slice(-5);
    rowCells.forEach((cell, index) => {
        cell.classList.add(result[index]);
    });
}

function displayCurrentGuess(guess) {
    const currentGuessContainer = document.getElementById('currentGuessContainer');
    currentGuessContainer.innerHTML = ''; // Clear previous guess display

    for (let i = 0; i < guess.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = guess[i];
        currentGuessContainer.appendChild(cell);
    }
}