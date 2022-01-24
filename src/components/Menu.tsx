import Select, { ActionMeta, SingleValue } from 'react-select'

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
    isOpen: boolean
    startGame: () => void
    setWordLength: (length: number) => void
    setAttempts: (attempts: number) => void
}

const Menu = ({ isOpen, startGame, setWordLength, setAttempts }: MenuProps) => {
    const handleWordLengthChange = (
        newValue: SingleValue<{ value: number; label: string }>,
        _: ActionMeta<{ value: number; label: string }>
    ): void => {
        newValue?.value && setWordLength(newValue.value)
    }

    const handleAttemptsChange = (
        newValue: SingleValue<{ value: number; label: string }>,
        _: ActionMeta<{ value: number; label: string }>
    ): void => {
        newValue?.value && setAttempts(newValue.value)
    }

    return (
        <div className='menuContainer'>
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
                <div className='button' onClick={() => startGame()}>
                    <p>BEGIN</p>
                </div>
            </div>
            <p className='footnote'>Inspired by and credit to <a href='https://www.powerlanguage.co.uk/wordle/'>Wordle</a></p>
        </div>
    )
}

export default Menu
