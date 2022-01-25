import { useState } from 'react'
import { ColourCodes, qwertyKeyRows } from '../resources/constants'

export interface LetterBoxProps {
    letter?: string
    isActive?: boolean
}

const LetterBox = ({ letter = '', isActive = false }: LetterBoxProps) => {
    const [colour, setColour] = useState<string>()
    let match: ColourCodes = ColourCodes.unchecked
    qwertyKeyRows.find((row) => {
        const found = row.find((letterMatch) => letter === letterMatch.letter)
        found && (match = found.match)
        return found
    })
    const backgroundColor = isActive ? ColourCodes.unchecked : (letter === '' ? ColourCodes.empty : match)
    return (
        <div className={`letterBox${ isActive ? ' active' : ''}`} style={{ backgroundColor }}>
            <p className='letterBoxLetter'>{letter}</p>
        </div>
    )
}

export default LetterBox