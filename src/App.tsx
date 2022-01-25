import { useReducer } from 'react'
import './App.scss'
import Keyboard from './components/Keyboard'
import Menu from './components/Menu'
import Tutorial from './components/Tutorial'
import Word from './components/Word'
import WordData from './resources/words.json'
import { qwertyKeyRows, ColourCodes } from './resources/constants'
import EndOptions from './components/EndOptions'

interface AppState {
    wordLength: number
    numAttempts: number
    attempts: string[]
    finished: boolean
    currentInput: string
    word: string
    showTutorial: boolean
    showMenu: boolean
    showToast: boolean
    toastMessage: string
}

const initialState: AppState = {
    wordLength: 5,
    numAttempts: 6,
    attempts: [],
    finished: false,
    currentInput: '',
    word: '',
    showTutorial: true,
    showMenu: true,
    showToast: false,
    toastMessage: ''
}

const WORD_LENGTH_OFFSET = 3; // Offset of number of letters in words array
const TOAST_TIME = 3000;

function App() {
    /* Hooks */
    const reducer = (oldState: AppState, newState: Object): AppState => ({
        ...oldState,
        ...newState,
    })
    const [state, setState] = useReducer(reducer, initialState)

    /* Functions */

    const getWordComponents = (): JSX.Element[] => {
        const wordComponents: JSX.Element[] = []
        for (let i = 0; i < state.numAttempts; i++) {
            const isActive = i === state.attempts.length && !state.finished
            wordComponents.push(
                <Word
                    word={isActive ? state.currentInput : state.attempts[i] }
                    wordLength={ state.wordLength }
                    isActive={isActive}
                />
            )
        }
        return wordComponents
    }

    /**
     * 
     */
    const startGame = (wordLength = state.wordLength, numAttempts = state.numAttempts): void => {
        // Reset state of each letter
        qwertyKeyRows.forEach((row) => {
            row.forEach((letter) => letter.match = ColourCodes.unchecked)
        })

        // Choose a word
        const wordsArray = WordData.words[wordLength - WORD_LENGTH_OFFSET]
        const word = wordsArray[Math.floor(Math.random() * wordsArray.length)]
        setState({
            showTutorial: false,
            showMenu: false,
            word,
            attempts: [],
            numAttempts,
            wordLength,
            currentInput: '',
            finished: false
        })
    }

    const finishGame = (): void => {
        setState({ finished: true, })
    }

    /**
     * Tests the user input, assigning match state of each entered letter in the Word
     * bow and keyboard keys
     * @returns {boolean} - true if the user-entered word matches the selected word
     */
    const testUserInput = (): boolean => {
        const { currentInput: userWord, word } = state
        for (let i = 0; i < state.wordLength; i++) {
            const ch: string = userWord[i].toLowerCase()
            let result: ColourCodes = ColourCodes.noMatch
            if (word[i] === ch)
                result = ColourCodes.match
            else if (word.includes(ch))
                result = ColourCodes.misplaced
            setCharacterResult(ch.toUpperCase(), result)
        }
    
        return userWord.toLowerCase() === word
    }

    /**
     * Finds the user-entered letter in the qwerty row data and sets its match result against the word
     * @param char - the character to set the result of
     * @param result - the colour to set the letter box and keyboard key to
     */
    const setCharacterResult = (char: string, result: ColourCodes): void => {
        qwertyKeyRows.find((wordArray, i) => {
            return wordArray.find(({ letter }, j) => {
                const match = letter === char
                match && (qwertyKeyRows[i][j].match = result)
                return match
            })
        })
    }

    const openSettings = (): void => { setState({ showMenu: true }) }

    /* Keyboard Handlers */
    // Handler for user entering a key by clicking on the virtual keyboard
    const handleLetterClick = (key: string): void => {
        if (state.currentInput.length !== state.wordLength)
            setState({ currentInput: state.currentInput + key })
    }

    // Handler for user clicking the submit key on the virtual keyboard
    const handleSubmitClick = (): void => {
        // Only process button if user entry is still allowed and complete
        if (state.currentInput.length === state.wordLength && state.attempts.length < state.numAttempts) {
            const wordPool = WordData.words[state.wordLength - WORD_LENGTH_OFFSET]
            // Ensure word is valid
            if (!wordPool.includes(state.currentInput.toLowerCase()) && !state.showToast) {
                setState({ showToast: true, toastMessage: 'Not A Valid Word!' })
                setTimeout(() => setState({ showToast: false, toastMessage: '' }), TOAST_TIME)
                return
            }
            
            testUserInput()
            const attempts = [...state.attempts, state.currentInput]
            setState({ attempts, currentInput: '', finished: attempts.length === state.numAttempts })

            
            // Check for success
            if (state.currentInput.toLowerCase() === state.word) 
                finishGame()
        }
    }

    // Handler for user clicking the backspace key on the virtual keyboard
    const handleBackspaceClick = (): void => {
        if (state.currentInput.length) {
            const newInput = state.currentInput.slice(0, state.currentInput.length - 1)
            setState({ currentInput: newInput })
        }
    }

    return (
        <div className='App'>
            { state.showToast &&
                <div className='toastContainer'>
                    { state.toastMessage }
                </div>
            }
            <Tutorial />
            { state.showMenu && 
                <Menu isOpen={state.showMenu} startGame={startGame} />
            }
            {/* { state.finished &&
                <EndModal
                    success={state.attempts[state.attempts.length - 1] === state.word}
                    words={getWordComponents()}
                />
            } */}
            <div className='wordsContainer'>
                { getWordComponents() }
            </div>
            { state.finished ? (
                    <EndOptions
                        success={state.attempts[state.attempts.length - 1] === state.word}
                        changeSettings={openSettings}
                        replay={startGame}
                    />
                ) : (
                    <Keyboard
                        onLetterClick={handleLetterClick}
                        onSubmit={handleSubmitClick}
                        onBackspace={handleBackspaceClick}
                    />
                )
            }
            {/* <p>{state.word}</p> */}
        </div>
    )
}

export default App
