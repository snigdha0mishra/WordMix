import { useState } from 'react';

const useWords = (selectedWord) => {
    // setting the current turn
    const [turn, setTurn] = useState(0);
    // setting the current guess
    const [currentGuess, setCurrentGuess] = useState('');
    // setting guessed words as an array to avoid duplicates
    const [guessedWords, setGuessedWords] = useState([]);
    // setting guessed words as a String to avoid duplicates
    const [guessHistory, setGuessHistory] = useState('');
    // determining if guess is correct
    const [isCorrect, setIsCorrect] = useState(false);

    // format the guessed word into an array 
    const formatGuess = () => {
        


    }

    // add a new guessed word
    const addGuess = () => {
    }

    // keyUp event handler
    const handleKeyUp = () => {
    }

    
    // return the values
    return { turn, currentGuess, guessHistory, isCorrect, handleKeyUp };
}


export default useWords;