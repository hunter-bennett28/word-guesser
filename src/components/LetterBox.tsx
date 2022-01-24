import { ColourCodes } from '../resources/constants'

export interface LetterBoxProps {
    letter?: string
    match?: ColourCodes
}

const LetterBox = ({ letter = '', match = ColourCodes.unchecked }) => {
    return (
        <div className='letterBox' style={{ backgroundColor: match }}>
            <p className='letterBoxLetter'>{letter}</p>
        </div>
    )
}

export default LetterBox