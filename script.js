const words = ["apple", "bread", "grape", "peach", "berry"];
const targetWord = words[Math.floor(Math.random() * words.length)];
const maxAttempts = 6;
let attempts = 0;
let currentGuess = '';
let currentIndex = 0;

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (currentGuess.length === 5) {
            attempts++;
            displayGuess(currentGuess);
            evaluateGuess(currentGuess);

            if (currentGuess === targetWord) {
                document.getElementById('message').textContent = "Congratulations! You've guessed the word!";
                document.getElementById('restart').style.display = "block";
            } else if (attempts === maxAttempts) {
                document.getElementById('message').textContent = `Sorry, you've used all attempts! The word was "${targetWord}".`;
                document.getElementById('restart').style.display = "block";
            }

            resetCurrentGuess();
        }
    } else if (event.key === 'Backspace') {
        if (currentIndex > 0) {
            currentIndex--;
            currentGuess = currentGuess.slice(0, -1);
            updateCurrentGuessDisplay();
        }
    } else if (/^[a-zA-Z]$/.test(event.key) && currentGuess.length < 5) {
        currentGuess += event.key.toLowerCase();
        currentIndex++;
        updateCurrentGuessDisplay();
        console.log(`Current guess: ${currentGuess}`);
    }
});

document.getElementById('restart').addEventListener('click', () => {
    location.reload();
});

function displayGuess(guess) {
    const guessContainer = document.getElementById('guessContainer');
    const guessRow = document.createElement('div');
    guessRow.classList.add('guess-row');

    for (let i = 0; i < guess.length; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.textContent = guess[i];
        guessRow.appendChild(cell);
    }

    guessContainer.appendChild(guessRow);
}

function updateCurrentGuessDisplay() {
    const currentGuessContainer = document.getElementById('currentGuessContainer');
    const cells = currentGuessContainer.querySelectorAll('.cell');

    cells.forEach((cell, index) => {
        cell.textContent = currentGuess[index] || '';
    });
}

function resetCurrentGuess() {
    currentGuess = '';
    currentIndex = 0;
    updateCurrentGuessDisplay();
}

function evaluateGuess(guess) {
    const result = Array(5).fill('absent');

    for (let i = 0; i < guess.length; i++) {
        if (guess[i] === targetWord[i]) {
            result[i] = 'correct';
        } else if (targetWord.includes(guess[i])) {
            result[i] = 'present';
        }
    }

    const cells = document.querySelectorAll('.guess-row:last-child .cell');
    cells.forEach((cell, index) => {
        cell.classList.add(result[index]);
    });
}