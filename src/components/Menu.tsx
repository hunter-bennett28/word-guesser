import { useState } from 'react'
import Select, { ActionMeta, SingleValue } from 'react-select'
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';

// Constants
const DEFAULT_WORD_LENGTH = 5
const DEFAULT_ATTEMPTS = 6

// Select Component Configuration 
const selectOptions = [
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
]

export interface MenuProps {
    startGame: (wordLength?: number, attempts?: number) => void
    showTutorial: () => void
}

/**
 * A Menu modal for changing the settings of a game including the length of word to guess
 * and the number of allowed attempts and then running the game itself.
 * @param {Function} param0.startGame - The callback to use when the user choses to start the game
 * @param {Function} param0.showTutorial - The callback for the user clicking the info icon
 * @returns {JSX.Element}
 */
const Menu = ({ startGame, showTutorial }: MenuProps) => {
    const [wordLength, setWordLength] = useState<number>(DEFAULT_WORD_LENGTH)
    const [attempts, setAttempts] = useState<number>(DEFAULT_ATTEMPTS)

    // Updates the new value for the word length selected from the Select component
    const handleWordLengthChange = (
        newValue: SingleValue<{ value: number; label: string }>,
        _: ActionMeta<{ value: number; label: string }>
    ): void => {
        newValue?.value && setWordLength(newValue.value)
    }

    // Updates the new value for the allowed attempts selected from the Select component
    const handleAttemptsChange = (
        newValue: SingleValue<{ value: number; label: string }>,
        _: ActionMeta<{ value: number; label: string }>
    ): void => {
        newValue?.value && setAttempts(newValue.value)
    }

    return (
        <div className='modalContainer'>
            <div className='menuShowTutorial'>
                <IconButton onClick={showTutorial}>
                    <InfoIcon fontSize='large' />
                </IconButton>
            </div>
            <div className='menu'>
                <div className='titleContainer'>
                    <h1>WORD G
                        <span className='warning'>U</span>
                        E
                        <span className='secondary'>SS</span>
                        <span className='warning'>E</span>
                        R GAME</h1>
                    <p>By Hunter Bennett</p>
                    <p>hunter.ben28@outlook.com</p>
                </div>
                <div className='numericOptionContainer'>
                    <p className='menuSetting'>Letters:</p>
                    <Select
                        className='numberSelector'
                        options={selectOptions}
                        defaultValue={selectOptions[2]}
                        onChange={handleWordLengthChange}
                    />
                </div>
                <div className='numericOptionContainer'>
                    <p className='menuSetting'>Attempts:</p>
                    <Select
                        className='numberSelector'
                        options={selectOptions}
                        defaultValue={selectOptions[3]}
                        onChange={handleAttemptsChange}
                    />
                </div>
                <div className='button' onClick={() => startGame(wordLength, attempts)}>
                    <p>BEGIN</p>
                </div>
            </div>
            <p className='footnote'>Inspired by and credit to <a href='https://www.powerlanguage.co.uk/wordle/'>Wordle</a></p>
        </div>
    )
}

export default Menu
