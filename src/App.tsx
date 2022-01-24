import { useEffect, useReducer, useRef } from 'react'
import './App.scss'
import Keyboard from './components/Keyboard'
import Menu from './components/Menu'
import Tutorial from './components/Tutorial'
import Word from './components/Word'
import { words } from './resources/words.json'

interface AppState {
    words?: string[]
    wordLength: number
    numAttempts: number
    attempts: Array<string[]>
    currentInput: string
    word?: string
    showTutorial: boolean
    showMenu: boolean
}

const initialState: AppState = {
    wordLength: 5,
    numAttempts: 6,
    attempts: [],
    currentInput: '',
    showTutorial: true,
    showMenu: true
}

function App() {
    /* Hooks */
    const reducer = (oldState: AppState, newState: Object): AppState => ({
        ...oldState,
        ...newState,
    })
    const [state, setState] = useReducer(reducer, initialState)
    const currentAttempt = useRef({})

    // useEffect(() => {

    // }, [])

    /* Functions */

    const startGame = () => {

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
    const handleSubmitClick = (): void => {}

    // Handler for user clicking the backspace key on the virtual keyboard
    const handleBackspaceClick = (): void => {
        if (state.currentInput.length) {
            const newInput = state.currentInput.slice(0, state.currentInput.length - 1)
            setState({ currentInput: newInput })
        }
    }

    return (
        <div className='App'>
            <Tutorial />
            <Menu isOpen={state.showMenu} startGame={startGame} setWordLength={setWordLength} setAttempts={setNumAttempts} />
            <div className='wordsContainer'>
                <Word word={state.currentInput} wordLength={state.wordLength}/>
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
