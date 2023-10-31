export function GuessList({ guesses, answer, numGuesses }) {
    return (
        <ul className="guess-list">
            {guesses.map((guess, index) => {
                return <GuessRow
                    guess={guess}
                    answer={answer} 
                    isOldGuess={index < numGuesses} 
                    key={index} 
                    />
            })}
        </ul>
    )
}

function GuessRow({ guess, answer, isOldGuess }) {
    guess = guess.padEnd(answer.length, ' ')
    guess = guess.split('')
    answer = answer.split('')

    const colors = calcColors(guess, answer)

    return (
        <ul className="guess-row">
            {guess.map((letter, index) => {
                let color = 'empty'
                if (isOldGuess)
                    color = colors[index]
                return <li className={"guess-letter " + color} key={index}>{letter}</li>
            })}
        </ul>
    )
}

function calcColors(guess, answer) {
    let colors = Array(answer.length).fill('gray')
    // green
    for (let i = 0; i < answer.length; i++) {
        if (answer[i] === guess[i]) {
            colors[i] = 'green'
            answer[i] = ' '
        }
    }
    // yellow
    for (let i = 0; i < answer.length; i++) {
        if (colors[i] === 'green')
            continue
        if (answer.includes(guess[i])) {
            colors[i] = 'yellow'
            answer[answer.indexOf(guess[i])] = ' '
        }
    }
    return colors
}