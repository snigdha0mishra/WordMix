const welcomeScene = document.getElementById('welcome-scene');
const gameScene = document.getElementById('game-scene');
const gameOverScene = document.getElementById('game-over-scene');
const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');
const gameScore = document.getElementById('game-score');

let selectedWord = '';
let guessedWords = [[]];
let availableSpace = 1;
let currentWordArray = [];
let validWords = [];

startButton.onclick = function () {
    if (welcomeScene && gameScene && gameContainer) {
        welcomeScene.style.display = 'none';
        gameScene.style.display = 'flex';
        gameContainer.style.display = 'flex';
        
        
    } else {
        console.error('Missing elements!');
    }
    
    
    gameLoop();
}



function gameLoop(){
    gridContainer();
    getKeyboardInput();
    fetchRandomWord();
    
}

function gridContainer(){
    const gridContainer = document.getElementById('grid-container');
    const rows = 6;
    const columns = 5;
    
    
    for (let index = 0; index < rows * columns; index++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridSquare.setAttribute('id', index+1);
        gridContainer.appendChild(gridSquare);
    }
}

function getKeyboardInput() {
    const keys = document.querySelectorAll(".keyboard-row button");
    keys.forEach(key => {
        key.removeEventListener("click", handleKeyPress); // Remove any previously attached listeners
        key.addEventListener("click", handleKeyPress); // Attach the new listener
    });
}

function handleKeyPress({ target }) {
    const letter = target.getAttribute("data-key");
    console.log(letter);

    // Check if user hit enter
    if (letter === 'enter') {
        handleSubmitWord();
        return;
    }

    // Check if user hit delete
    if (letter === 'delete') {
        handleDeleteLetter();
        return;
    }

    updateGuessedWords(letter);
}

function handleSubmitWord(){

    currentWordArray = getCurrentWordArray();
    if (currentWordArray.length === 5) {
        const currentWord = currentWordArray.join('');
        if (!isValidWord(currentWord)) {
            // If the word is not valid, trigger vibration
            triggerRowVibration();
            return;
        }
        console.log(currentWord);
        guessedWords.push([]);
        availableSpace = (guessedWords.length-1) * 5 + 1;
        // If the word is valid, check and color the letters
        colorGuessedWord(currentWord);
    }else {
        triggerRowVibration();
        return;
    }
    
}

function handleDeleteLetter(){
    currentWordArray = getCurrentWordArray();
    if (currentWordArray.length > 0){
        const lastLetter = currentWordArray.pop();
        const availableSpaceEl = document.getElementById(String(availableSpace - 1));
        availableSpace = availableSpace - 1;
        availableSpaceEl.textContent = '';
        }
}

function isValidWord(word) {
    // Check against the database of valid FIVE LETTER words 
    let isValid = validWords.includes(word.toLowerCase()) && word.length === 5;

    if (!isValid){
        triggerRowVibration();
    }
    return isValid
}

// Helper function to trigger vibration (shake) effect on the current row
function triggerRowVibration() {
    const start = (guessedWords.length - 1) * 5 + 1;
    const end = start + 5; 

    // Add the 'shake' class to each square in the current row
    for (let i = start; i < end; i++) {
        const square = document.getElementById(i.toString());
        if (square) {
            square.classList.add('shake');
        }
    }

    // Remove the 'shake' class after the animation completes (500ms in this case)
    setTimeout(() => {
        for (let i = start; i < end; i++) {
            const square = document.getElementById(i.toString());
            if (square) {
                square.classList.remove('shake');
            }
        }
    }, 500); // Match this duration with your animation time
}

function getCurrentWordArray(){
    const numOfGuessedWords = guessedWords.length;
    return guessedWords[numOfGuessedWords - 1];
}

function updateGuessedWords(letter){
    currentWordArray = getCurrentWordArray();

    if(currentWordArray && currentWordArray.length < 5){
        currentWordArray.push(letter);

        const availableSpaceEl = document.getElementById(String(availableSpace));
        availableSpace = availableSpace + 1;  

        availableSpaceEl.textContent = letter;
    } else if (currentWordArray.length >= 5) {
        // Trigger vibration if the user tries to add more than 5 letters
        triggerRowVibration();
        return;
    }
}

function fetchRandomWord(){
    fetch('http://localhost:3001/solutions')
        .then(response => response.json())
        .then(json => {
            validWords = json.map(wordObj => wordObj.word); // Store valid words

            const randomIndex = Math.floor(Math.random() * json.length);
            selectedWord = json[randomIndex].word;
            console.log(selectedWord);
            
        })
        .catch(error => console.error('Error fetching random word:', error));
}

function colorGuessedWord(currentWord){
    const selectedWordArray = Array.from(selectedWord); 
    const currentWordArray = Array.from(currentWord); 

    const startIdx = (guessedWords.length - 1) * 5 + 1; 

    // Check each letter in the guessed word
    currentWordArray.forEach((letter, index) => {
        const squareId = String(startIdx + index);
        const square = document.getElementById(squareId);
        
        // Check if the square exists
        if (square) {
            if (letter === selectedWordArray[index]) {
                // Letter is in the correct position
                square.style.backgroundColor = "green";
            } else if (selectedWordArray.includes(letter)) {
                // Letter is in the word but in the wrong position
                square.style.backgroundColor = "orange";
            } else {
                // Letter is not in the word at all
                square.style.backgroundColor = "black";
            }
        } else {
            console.error(`Square with id ${squareId} not found`);
        }
    });
}