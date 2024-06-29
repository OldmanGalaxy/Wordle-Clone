import {useEffect, useState} from "react";

const API_URL = "https://random-word-api.vercel.app/api?words=1&length=5";

export default function Keyboard() {
    const [solution, setSolution] = useState("");
    const [guesses, setGuesses] = useState(Array(6).fill(null));
    const [currGuess, setCurrGuess] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const allowedLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    console.log(solution);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (gameOver)
                return;
            if (event.key === 'Enter') {
                if (currGuess.length !== 5)
                    return;
                let tempGuess = currGuess;
                const isCorrect = solution === tempGuess.toLowerCase();
                console.log(isCorrect);
                const newGuesses = [...guesses];
                newGuesses[guesses.findIndex(val => val == null)] = currGuess;
                setGuesses(newGuesses);
                setCurrGuess('');
                if (isCorrect)
                    setGameOver(true);
            }
            if (event.key === 'Backspace') {
                setCurrGuess(currGuess.slice(0, -1));
                return;
            }
            if (!allowedLetters.includes(event.key))
                return;
            if (currGuess.length >= 5)
                return;
            setCurrGuess(g => g + event.key);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currGuess, gameOver, solution, guesses]);

    useEffect(() => {
        const fetchWord = async () => {
            const response = await fetch(API_URL);
            const word = await response.json();
            setSolution(word[0].toString());
        }
        fetchWord();
    }, []);

    return (
        <>
        <div className="guesses-container">
            {guesses.map((guess, i) => {
                const isCurrGuess = i === guesses.findIndex(val => val == null);
                return (<Row guess={isCurrGuess ? currGuess : guess ?? ""} isGuessed={!isCurrGuess && guess != null} solution={solution}/>);
            })}
        </div>
        <div className='keyboard-container'>
            <div className='keyboard-display'>
                <div className="keyboard-row1">
                    <div className="key q">Q</div>
                    <div className="key w">W</div>
                    <div className="key e">E</div>
                    <div className="key r">R</div>
                    <div className="key t">T</div>
                    <div className="key y">Y</div>
                    <div className="key u">U</div>
                    <div className="key i">I</div>
                    <div className="key o">O</div>
                    <div className="key p">P</div>
                </div>
                <div className="keyboard-row2">
                    <div className="key a">A</div>
                    <div className="key s">S</div>
                    <div className="key d">D</div>
                    <div className="key f">F</div>
                    <div className="key g">G</div>
                    <div className="key h">H</div>
                    <div className="key j">J</div>
                    <div className="key k">K</div>
                    <div className="key l">L</div>
                </div>
                <div className="keyboard-row3">
                    <div className="enter">ENTER</div>
                    <div className="key z">Z</div>
                    <div className="key x">X</div>
                    <div className="key c">C</div>
                    <div className="key v">V</div>
                    <div className="key b">B</div>
                    <div className="key n">N</div>
                    <div className="key m">M</div>
                    <div className="delete">
                        <i className="material-icons">backspace</i>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

function Row({guess, isGuessed, solution}) {
    const cells = [];
    let class_name = 'cell';
    let tempGuess = guess.toLowerCase();

    for (let i = 0; i < 5; i++) {
        const char = tempGuess[i];
        if (isGuessed) {
            if (char === solution[i])
                class_name += ' correct';
            else if (solution.includes(char))
                class_name += ' misplaced';
            else
                class_name += ' wrong';
        }    
        cells.push(<div key={i} className={class_name}>{char}</div>)
    }
    return (
        <div className="row">
            {cells}
        </div>
    );
};