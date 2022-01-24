import { useReducer } from 'react'
import './App.scss'
import Keyboard from './components/Keyboard'
import Menu from './components/Menu'
import Tutorial from './components/Tutorial'
import Word from './components/Word'
import WordData from './resources/words.json'
import { qwertyKeyRows, ColourCodes } from './resources/constants'
import { toast, ToastContainer } from 'react-toastify'

interface AppState {
    wordLength: number
    numAttempts: number
    attempts: string[]
    currentInput: string
    word?: string
    showTutorial: boolean
    showMenu: boolean
    showToast: boolean
    toastMessage: string
}

const initialState: AppState = {
    wordLength: 5,
    numAttempts: 6,
    attempts: [],
    currentInput: '',
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
            const isActive = i === state.attempts.length
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

    const startGame = () => {
        // Reset state of each letter
        qwertyKeyRows.forEach((row) => {
            row.forEach((letter) => letter.match = ColourCodes.unchecked)
        })

        // Choose a word
        const wordsArray = WordData.words[state.wordLength - WORD_LENGTH_OFFSET]
        const word = wordsArray[Math.floor(Math.random() * wordsArray.length)]
        setState({ showTutorial: false, showMenu: false, word, attempts: [], currentInput: '' })
    }

    const finishGame = () => {

    }

    /* Configuration Handlers */

    const setWordLength = (count: number): void => { setState({ wordLength: count }) }
    
    const setNumAttempts = (count: number): void => { setState({ numAttempts: count }) }

    /* Keyboard Handlers */
    // Handler for user entering a key by clicking on the virtual keyboard
    const handleLetterClick = (key: string): void => {
        if (state.currentInput.length !== state.wordLength)
            setState({ currentInput: state.currentInput + key })
    }

    // Handler for user clicking the submit key on the virtual keyboard
    const handleSubmitClick = (): void => {
        if (state.attempts.length < state.numAttempts) {
            const wordPool = WordData.words[state.wordLength - WORD_LENGTH_OFFSET]
            if (!wordPool.includes(state.currentInput) && !state.showToast) {
                setState({ showToast: true, toastMessage: 'Not A Valid Word!' })
                setTimeout(() => setState({ showToast: false, toastMessage: '' }), TOAST_TIME)
                return
            }
            if (state.currentInput === state.word)
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
                <Menu isOpen={state.showMenu} startGame={startGame} setWordLength={setWordLength} setAttempts={setNumAttempts} />
            }
            <div className='wordsContainer'>
                { getWordComponents() }
            </div>
            <Keyboard
                onLetterClick={handleLetterClick}
                onSubmit={handleSubmitClick}
                onBackspace={handleBackspaceClick}
            />

        </div>
    )
}

export default App
