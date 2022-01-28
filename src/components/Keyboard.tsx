import { qwertyKeyRows } from '../resources/constants'
import KeyboardKey, { KeyContentType } from './KeyboardKey'

const [rowOne, rowTwo, rowThree] = qwertyKeyRows;

export interface KeyboardProps {
    onLetterClick: (letter: string) => void
    onSubmit: () => void
    onBackspace: () => void
}

/**
 * A virtual keyboard component the user can enter words by clicking that will change
 * colours on user entry to reflect the result of matching entered letters to the
 * word being guessed.
 * @param {Function} param0.onLetterClick - Callback for a user clicking an alpha key
 * @param {Function} param0.onSubmit - Callback for a user clicking the 'ENTER' key
 * @param {Function} param0.onBackspace - Callback for a user clicking the backspace key
 * @returns {JSX.Element}
 */
const Keyboard = ({ onLetterClick, onSubmit, onBackspace }: KeyboardProps) => {
    return (
        <div className='keyboardContainer'>
            <div className='keyboardRow keyboardRowOne'>
                {
                    rowOne.map((key, i) =>
                        <KeyboardKey content={key.letter} colour={key.match} clickHandler={onLetterClick} key={`row1key${i}`} />
                    )
                }
            </div>
            <div className='keyboardRow keyboardRowTwo'>
                {
                    rowTwo.map((key, i) =>
                    <KeyboardKey content={key.letter} colour={key.match} clickHandler={onLetterClick} key={`row2key${i}`} />
                )
                }
            </div>
            <div className='keyboardRow keyboardRowThree'>
                <KeyboardKey content='ENTER' clickHandler={onSubmit}/>
                {
                    rowThree.map((key, i) =>
                    <KeyboardKey content={key.letter} colour={key.match} clickHandler={onLetterClick} key={`row3key${i}`} />
                )
                }
                <KeyboardKey
                    content='backspace.svg'
                    clickHandler={onBackspace}
                    type={KeyContentType.Icon}
                    description='Backspace Key'
                />
            </div>
        </div>
    )
}

export default Keyboard