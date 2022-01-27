import { ColourCodes, qwertyKeyRows } from '../resources/constants'

export interface LetterBoxProps {
    letter?: string
    isActive?: boolean
}

const LetterBox = ({ letter = '', isActive = false }: LetterBoxProps) => {
    let match: ColourCodes = ColourCodes.unchecked
    qwertyKeyRows.find((row) => {
        const found = row.find((letterMatch) => letter === letterMatch.letter)
        found && (match = found.match)
        return found
    })
    const backgroundColor = isActive ? ColourCodes.unchecked : (letter === '' ? ColourCodes.empty : match)
    return (
        <div className={`letterBox${ isActive ? ' active' : ''}`} style={{ backgroundColor }}>
            <p style={{ color: (isActive ? 'black' : 'white') }}>{letter}</p>
        </div>
    )
}

export default LetterBox