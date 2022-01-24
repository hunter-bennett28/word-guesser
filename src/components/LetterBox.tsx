import { ColourCodes } from '../resources/constants'

export interface LetterBoxProps {
    letter?: string
    match?: ColourCodes
    isActive?: boolean
}

const LetterBox = ({ letter = '', match = ColourCodes.unchecked, isActive = false }) => {
    const backgroundColor = match === ColourCodes.unchecked && isActive ? ColourCodes.unchecked : '#333'
    return (
        <div className={`letterBox${ isActive ? ' active' : ''}`} style={{ backgroundColor }}>
            <p className='letterBoxLetter'>{letter}</p>
        </div>
    )
}

export default LetterBox