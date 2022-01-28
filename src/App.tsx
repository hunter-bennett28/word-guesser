import React, { useReducer } from 'react'
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

// Constants
const WORD_LENGTH_OFFSET = 3; // Offset of number of letters in words array
const TOAST_TIME = 3000; // Duration of toast visibility

/**
 * Main component for the game. This game selects a random English word based on
 * user preferences and has the user guess it. Users can enter words one at a time
 * up to a set amount of attempts and entered letters will either turn green if they
 * are in the right spot, yellow if they are in the word but in the wrong spot, or
 * gray if they are not in the word at all. This game is inspired by the game Wordle
 * but is an infinite and configurable version.
 * @returns {JSX.Element}
 */
const App = () => {
    /* Hooks */

    const reducer = (oldState: AppState, newState: Object): AppState => ({
        ...oldState,
        ...newState,
    })
    const [state, setState] = useReducer(reducer, initialState)

    /* Functions */

    /**
     * Creates an array of Word components with the correct length and quantity,
     * as well as passes required information for rendering like whether the
     * word is actively being entered or not
     * @returns {JSX.Element[]} - All Word components to render
     */
    const getWordComponents = (): JSX.Element[] => {
        const wordComponents: JSX.Element[] = []
        for (let i = 0; i < state.numAttempts; i++) {
            // Determine whether Word is actively being entered
            const isActive = i === state.attempts.length && !state.finished
            wordComponents.push(
                <Word
                    word={isActive ? state.currentInput : state.attempts[i] }
                    wordLength={ state.wordLength }
                    correctWord={state.word}
                    isActive={isActive}
                    key={`word${i}`}
                />
            )
        }
        return wordComponents
    }

    /**
     * Begins the round, resetting all state values to defaults including Keyboard data. It
     * will also pick the word for the user to guess from the words.json file based on length
     * of word chosen by user
     * @param {number} wordLength - The length of the word to select and have the user guess
     * @param {number} numAttempts - The number of attempts to allow the user to make at guessing
     */
    const startGame = (wordLength = state.wordLength, numAttempts = state.numAttempts): void => {
        // Reset state of each letter
        qwertyKeyRows.forEach((row) => {
            row.forEach((letter) => letter.match = ColourCodes.unchecked)
        })

        // Choose a word
        const wordsArray = WordData.words[wordLength - WORD_LENGTH_OFFSET]
        const word = wordsArray[Math.floor(Math.random() * wordsArray.length)]

        // Set word and default state values
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

    /**
     * Temporarily shows an animated box containing the passed message for a set amount
     * of seconds before removing it and resetting its relevant state
     * @param {string} message - The message to show in the Toast component 
     */
    const showToastMessage = (message: string): void => {
        if (!state.showToast) {
            setState({ showToast: true, toastMessage: message })
            setTimeout(() => setState({ showToast: false, toastMessage: '' }), TOAST_TIME)
        }
    }

    /**
     * Tests the user input, assigning match state of each entered letter in the Word
     * box and keyboard keys. A letter will be green if it is in the correct spot in the
     * word, yellow if it exists in the word but is in the wrong spot, or a gray colour
     * if the letter is not in the word at all. It will then return whether the word is
     * a complete correct match or not.
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
     * Finds the user-entered letter in the QWERTY row data and sets its match result against the word
     * @param {string} char - the character to set the result of
     * @param {ColourCodes} result - the colour to set the letter box and keyboard key to
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

    /**
     * Closes the Tutorial modal
     */
    const closeTutorial = (): void => { setState({ showTutorial: false }) }

    /**
     * Opens the Tutorial modal
     */
    const openTutorial = (): void => { setState({ showTutorial: true }) }

    /**
     * Opens the Menu modal
     */
    const openMenu = (): void => { setState({ showMenu: true }) }

    /* Keyboard Handlers */

    /**
     * Handler for user entering a key by clicking on the virtual keyboard
     * @param {string} key - The letter clicked 
     */
    const handleLetterClick = (key: string): void => {
        if (state.currentInput.length !== state.wordLength)
            setState({ currentInput: state.currentInput + key })
    }

    /**
     * Handler for user clicking the submit key on the virtual keyboard
     */
    const handleSubmitClick = (): void => {
        // Only process button if user entry is still allowed and complete
        if (state.currentInput.length === state.wordLength && state.attempts.length < state.numAttempts) {
            const wordPool = WordData.words[state.wordLength - WORD_LENGTH_OFFSET]
            // Ensure word is valid
            if (!wordPool.includes(state.currentInput.toLowerCase())) {
                showToastMessage('Not A Valid Word!')
                return
            }
            
            // Test for success and append attempt
            const correctWord = testUserInput()
            const attempts = [...state.attempts, state.currentInput]
            setState({ attempts, currentInput: '', finished: correctWord || attempts.length === state.numAttempts })
        }
        else if (state.currentInput.length !== state.wordLength)
            showToastMessage('Word Too Short!')
    }

    /**
     * Handler for user clicking the backspace key on the virtual keyboard
     */
    const handleBackspaceClick = (): void => {
        if (state.currentInput.length) {
            const newInput = state.currentInput.slice(0, state.currentInput.length - 1)
            setState({ currentInput: newInput })
        }
    }

    /**
     * Handler for the user typing with their physical keyboard. Keys will be filtered
     * to only handle acceptable ones, including alpha characters, enter, and backspace.
     * These keys will be passed to their respective handlers to manipulate the entered
     * text.
     * @param {React.KeyboardEvent} event 
     */
    const handleKeyPress = (event: React.KeyboardEvent) => {
        const key = event.key.toUpperCase()
        if (key.match(/^[A-Z]$/i))
            handleLetterClick(key)
        else if (key === 'BACKSPACE')
            handleBackspaceClick()
        else if (key === 'ENTER')
            handleSubmitClick()
    }

    return (
        <div className='App' tabIndex={0} onKeyDown={handleKeyPress}>
            <div className='gameWindow'>
                { state.showToast &&
                    <div className='toastContainer'>
                        { state.toastMessage }
                    </div>
                }
                { state.showTutorial &&
                    <Tutorial close={closeTutorial} />
                }
                { state.showMenu && !state.showTutorial &&
                    <Menu startGame={startGame} showTutorial={openTutorial} />
                }
                <div className='wordsContainer'>
                    <div className='wordsBox'>
                        { getWordComponents() }
                    </div>
                </div>
                { state.finished ? (
                        <EndOptions
                            success={state.attempts[state.attempts.length - 1]?.toLowerCase() === state.word}
                            changeSettings={openMenu}
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
            </div>
        </div>
    )
}

export default App
