import { useCallback, useEffect, useState } from 'react'
import { ColourCodes } from '../resources/constants'
import LetterBox from './LetterBox'

export interface WordProps {
    word?: string
    wordLength: number
    correctWord: string
    isActive?: boolean

}

/**
 * A container component for displaying a user-defined amount of LetterBoxes and ensuring
 * they are the correct colour.
 * @param param0 
 * @returns 
 */
const Word = ({ word = '', wordLength, correctWord, isActive = false }: WordProps) => {
    const [letterBoxes, setLetterBoxes] = useState<JSX.Element[]>()
    
    /**
     * Tests the user input, assigning colour to the letter based on the match type
     * @param {number} index - The index of the letter to text against the correct word 
     * @returns {ColourCodes} - the CSS viable colour string
     */
    const getLetterColour = useCallback((index: number): ColourCodes => {
        const ch: string = word[index]?.toLowerCase()
        if (!ch)
            return ColourCodes.empty
        else if (correctWord[index] === ch)
            return ColourCodes.match
        else if (correctWord.includes(ch))
            return ColourCodes.misplaced
        return ColourCodes.noMatch
    }, [word, correctWord])

    /**
     * A memoized function that creates an array of LetterBox components based on the passed in
     * word and wordLength, selecting the colour it should be based on its activity and match
     * state
     */
    const getBoxes = useCallback((): void => {
        const boxes: JSX.Element[] = []
        for (let i = 0; i < wordLength; i++) {
            const letterColour: ColourCodes = isActive ? ColourCodes.unchecked : getLetterColour(i)
            boxes.push(<LetterBox
                letter={word[i]}
                colour={letterColour}
                count={wordLength}
                isActive={isActive}
                key={`letterBox${i}`}/>)
        }
        setLetterBoxes(boxes)
    }, [getLetterColour, wordLength, isActive, word])


    useEffect(getBoxes, [wordLength, word, isActive, getBoxes])

    return (
        <div className='wordContainer'>
            { letterBoxes }
        </div>
    )
}

export default Word