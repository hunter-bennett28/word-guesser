import { qwertyKeyRows } from '../resources/constants'
import KeyboardKey, { KeyContentType } from './KeyboardKey'

const [rowOne, rowTwo, rowThree] = qwertyKeyRows;

export interface KeyboardProps {
    onLetterClick: Function
    onSubmit: Function
    onBackspace: Function
}

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