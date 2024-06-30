import {useEffect, useState} from "react";

const API_URL = "https://random-word-api.vercel.app/api?words=1&length=5";

export default function Keyboard() {
    const [solution, setSolution] = useState("");
    const [guesses, setGuesses] = useState(Array(6).fill(null));
    const [currGuess, setCurrGuess] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [key, setKey] = useState('');
    const allowedLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

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
                setKey('');
                if (isCorrect)
                    setGameOver(true);
            }
            if (event.key === 'Backspace') {
                setCurrGuess(currGuess.slice(0, -1));
                setKey('');
                return;
            }
            if (!allowedLetters.includes(event.key))
                return;
            if (currGuess.length >= 5)
                return;
            setCurrGuess(g => g + event.key);
            setKey('');
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currGuess, gameOver, solution, guesses]);

    useEffect(() => {
        const handleButtonPress = (event) => {
            if (gameOver)
                return;
            if (key === 'Enter') {
                if (currGuess.length !== 5)
                    return;
                let tempGuess = currGuess;
                const isCorrect = solution === tempGuess.toLowerCase();
                console.log(isCorrect);
                const newGuesses = [...guesses];
                newGuesses[guesses.findIndex(val => val == null)] = currGuess;
                setKey('');
                setGuesses(newGuesses);
                setCurrGuess('');
                if (isCorrect)
                    setGameOver(true);
            }
            if (key === 'Backspace') {
                setCurrGuess(currGuess.slice(0, -1));
                setKey('');
                return;
            }
            if (!allowedLetters.includes(key))
                return;
            if (currGuess.length >= 5)
                return;
            setCurrGuess(g => g + key);
            setKey('');
        }
        window.addEventListener('click', handleButtonPress);
        return () => window.removeEventListener('click', handleButtonPress);
    }, [key]);

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
                    <button className="key q" onClick={() => setKey('q')}>Q</button>
                    <button className="key w" onClick={() => setKey('w')}>W</button>
                    <button className="key e" onClick={() => setKey('e')}>E</button>
                    <button className="key r" onClick={() => setKey('r')}>R</button>
                    <button className="key t" onClick={() => setKey('t')}>T</button>
                    <button className="key y" onClick={() => setKey('y')}>Y</button>
                    <button className="key u" onClick={() => setKey('u')}>U</button>
                    <button className="key i" onClick={() => setKey('i')}>I</button>
                    <button className="key o" onClick={() => setKey('o')}>O</button>
                    <button className="key p" onClick={() => setKey('p')}>P</button>
                </div>
                <div className="keyboard-row2">
                    <button className="key a" onClick={() => setKey('a')}>A</button>
                    <button className="key s" onClick={() => setKey('s')}>S</button>
                    <button className="key d" onClick={() => setKey('d')}>D</button>
                    <button className="key f" onClick={() => setKey('f')}>F</button>
                    <button className="key g" onClick={() => setKey('g')}>G</button>
                    <button className="key h" onClick={() => setKey('h')}>H</button>
                    <button className="key j" onClick={() => setKey('j')}>J</button>
                    <button className="key k" onClick={() => setKey('k')}>K</button>
                    <button className="key l" onClick={() => setKey('l')}>L</button>
                </div>
                <div className="keyboard-row3">
                    <button className="enter" onClick={() => setKey('Enter')}>ENTER</button>
                    <button className="key z" onClick={() => setKey('z')}>Z</button>
                    <button className="key x" onClick={() => setKey('x')}>X</button>
                    <button className="key c" onClick={() => setKey('c')}>C</button>
                    <button className="key v" onClick={() => setKey('v')}>V</button>
                    <button className="key b" onClick={() => setKey('b')}>B</button>
                    <button className="key n" onClick={() => setKey('n')}>N</button>
                    <button className="key m" onClick={() => setKey('m')}>M</button>
                    <button className="delete" onClick={() => setKey('Backspace')}>
                        <i className="material-icons">backspace</i>
                    </button>
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