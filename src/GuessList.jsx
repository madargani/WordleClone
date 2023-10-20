export function GuessList({ guesses, answer, numGuesses }) {
    return (
        <ul className="guess-list">
            {guesses.map((guess, index) => {
                return <GuessRow
                    guess={guess}
                    answer={answer} 
                    pastGuess={index < numGuesses} 
                    key={index} 
                    />
            })}
        </ul>
    )
}

function GuessRow({ guess, answer, pastGuess }) {
    guess = guess.padEnd(5, ' ')
    guess = guess.split('')
    return (
        <ul className="guess-row">
            {guess.map((letter, index) => {
                let color = 'empty'
                if (pastGuess) {
                    if (letter === answer[index])
                        color = 'green'
                }
                return <li className={"guess-letter " + color} key={index}>{letter}</li>
            })}
        </ul>
    )
}