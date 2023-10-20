import { useState } from 'react'
import { GuessList } from './guessList'
import './reset.css'
import './style.css'

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export default function App() {
  const [wordList, setWordList] = useState([])

  const [guessList, setGuessList] = useState(Array(MAX_GUESSES).fill(''));
  const [numGuesses, setNumGuesses] = useState(0);
  const [curGuess, setCurGuess] = useState('');
  
  const handleCurGuessChange = (e) => {
    let guess = e.target.value;
    guess = guess.toUpperCase();
    guess = guess.replace(/[^A-Z]/g, '');
    if (guess.length > WORD_LENGTH) guess = guess.slice(0, WORD_LENGTH);
    
    setCurGuess(guess);
    
    setGuessList(() => guessList.map((g, index) => {
      if (index == numGuesses) return guess;
      return g;
    })
    )
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && curGuess.length == WORD_LENGTH) {
      setNumGuesses(numGuesses + 1);
      setCurGuess('');
    }
  }

  fetch('/wordlist.txt')
    .then(res => res.text())
    .then(text => text.split('\n'))
    .then(words => words.map(word => word.trim()))
    .then(words => words.filter(word => word.length == WORD_LENGTH))
    .then(words => setWordList(words))

  return (
    <>
    <GuessList guesses={guessList} answer={"SLATE"} numGuesses={numGuesses} />
    <input
      className='guess-input'
      type="text"
      value={curGuess} 
      onChange={handleCurGuessChange}
      onKeyDown={handleKeyDown}
      onBlur={({ target }) => target.focus()} 
      autoFocus
      />
    </>
  )
}
