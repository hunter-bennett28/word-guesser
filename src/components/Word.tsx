import { useEffect, useState } from 'react'
import LetterBox from './LetterBox'

export interface WordProps {
    word?: string
    wordLength: number
    isActive?: boolean
}

const Word = ({ word = '', wordLength, isActive = false }: WordProps) => {

    const [letterBoxes, setLetterBoxes] = useState<JSX.Element[]>()
    
    const getBoxes = (): void => {
        const boxes: JSX.Element[] = []
        for (let index = 0; index < wordLength; index++)
            boxes.push(<LetterBox letter={word[index]} isActive={isActive} key={`letterBox${index}`}/>)
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