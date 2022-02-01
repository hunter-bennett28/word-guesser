import { ColourCodes } from '../resources/constants'

export interface LetterBoxProps {
    letter?: string
    colour: ColourCodes
    isActive?: boolean
}

/**
 * A single letter component within a word that will display a user input character and
 * have a background colour portraying its match state.
 * @param {string?} param0.letter - The letter to be displayed
 * @param {ColourCodes} param0.colour - The background colour to use
 * @param {boolean?} param0.isActive - Whether the letter is in a Word component that is being entered
 * @returns {JSX.Element}
 */
const LetterBox = ({ letter = '', colour, isActive = false }: LetterBoxProps) => {
    const isMatch = colour === ColourCodes.match || colour === ColourCodes.misplaced
    let className = 'letterBox'
    className += isActive ? ' active' : ''
    className += isMatch ? ' match' : ''
    return (
        <div className={className} style={{ backgroundColor: colour }}>
            <p style={{ color: (isActive ? 'black' : 'white') }}>{letter}</p>
        </div>
    )
}

export default LetterBox