import { ColourCodes } from '../resources/constants'

export interface LetterBoxProps {
    letter?: string
    colour: ColourCodes
    count: number
    isActive?: boolean
}

/**
 * A single letter component within a word that will display a user input character and
 * have a background colour portraying its match state.
 * @param {string?} param0.letter - The letter to be displayed
 * @param {ColourCodes} param0.colour - The background colour to use
 * @param {number} param0.count - The total number of letters in the word
 * @param {boolean?} param0.isActive - Whether the letter is in a Word component that is being entered
 * @returns {JSX.Element}
 */
const LetterBox = ({ letter = '', colour, count, isActive = false }: LetterBoxProps) => {
    const isMatch = colour === ColourCodes.match || colour === ColourCodes.misplaced
    let className = 'letterBox'
    className += isActive ? ' active' : ''
    className += isMatch ? ' match' : ''
    const maxWidth = count > 0 ? `${100 / count}vw` : '10vw';
    return (
        <div className={className} style={{ backgroundColor: colour, maxWidth }}>
            <p style={{ color: (isActive ? 'black' : 'white') }}>{letter}</p>
        </div>
    )
}

export default LetterBox