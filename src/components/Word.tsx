import { useEffect, useState } from 'react'
import LetterBox from './LetterBox'

export interface WordProps {
    wordLength: number
    word: string
}

const Word = ({ word, wordLength }: WordProps) => {

    const [letterBoxes, setLetterBoxes] = useState<JSX.Element[]>()
    
    const getBoxes = (): void => {
        const boxes: JSX.Element[] = []
        for (let index = 0; index < wordLength; index++)
            boxes.push(<LetterBox letter={word[index]} key={`letterBox${index}`}/>)
        setLetterBoxes(boxes)
    }

    useEffect(getBoxes, [])
    useEffect(getBoxes, [wordLength, word])

    return (
        <div className='wordContainer'>
            { letterBoxes }
        </div>
    )
}

export default Word