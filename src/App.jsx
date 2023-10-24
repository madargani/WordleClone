import { useEffect, useState } from 'react'
import { GuessList } from './guessList'
import './reset.css'
import './style.css'

const MAX_GUESSES = 6;
const WORD_LENGTH = 5;

export default function App() {
  const [wordList, setWordList] = useState([])
  const [answer, setAnswer] = useState('')
  const [guessList, setGuessList] = useState(Array(MAX_GUESSES).fill(''));
  const [numGuesses, setNumGuesses] = useState(0);
  const [curGuess, setCurGuess] = useState('');
  const [won, setWon] = useState(false);
  
  useEffect(() => {
    (async () => {
      // intialize word list
      const words = await fetch('/wordlist.txt')
        .then(res => res.text())
        .then(text => text.split('\n'))
        .then(words => words.map(word => word.trim()))
        .then(words => words.filter(word => word.length == WORD_LENGTH))
      setWordList(words)
      
      // initialize answer
      const date = new Date()
      const seed = date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate()
      const rand = seed * 9301 + 49297 % 233280
      const index = Math.abs(rand % words.length)
      setAnswer(words[index].toUpperCase())
    })()
  }, [])

  const handleCurGuessChange = (e) => {
    if (won) return

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
      if (wordList.includes(curGuess.toLowerCase())) {
        setNumGuesses(numGuesses + 1)
        setCurGuess('')
        if (curGuess == answer) setWon(true)
      }
    }
  }

  return (
    <>
    <h1>Wordie</h1>
    <GuessList guesses={guessList} answer={answer} numGuesses={numGuesses} />
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
