const welcomeScene = document.getElementById('welcome-scene');
const gameScene = document.getElementById('game-scene');
const gameOverScene = document.getElementById('game-over-scene');
const startButton = document.getElementById('start-button');
const gameContainer = document.getElementById('game-container');
const gameScore = document.getElementById('game-score');

let selectedWord = '';

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
    
    fetchRandomWord();
    
}

function gridContainer(){
    const gridContainer = document.getElementById('grid-container');
    const rows = 6;
    const columns = 5;
    
    
    for (let i = 0; i < rows * columns; i++) {
        const gridSquare = document.createElement('div');
        gridSquare.classList.add('grid-square');
        gridContainer.appendChild(gridSquare);
    }
}

function fetchRandomWord(){
    fetch('http://localhost:3001/solutions')
        .then(response => response.json())
        .then(json => {
            const randomIndex = Math.floor(Math.random() * json.length);
            selectedWord = json[randomIndex].word;
            console.log(selectedWord);
            
        })
        .catch(error => console.error('Error fetching random word:', error));
}

