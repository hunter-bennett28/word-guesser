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
        for (let i = 0; i < wordLength; i++)
            boxes.push(<LetterBox letter={word[i]} isActive={isActive} key={`letterBox${i}`}/>)
        setLetterBoxes(boxes)
    }

    useEffect(getBoxes, [])
    useEffect(getBoxes, [wordLength, word, isActive])

    return (
        <div className='wordContainer'>
            { letterBoxes }
        </div>
    )
}

export default Word