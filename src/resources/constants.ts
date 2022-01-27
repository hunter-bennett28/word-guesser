export const enum ColourCodes {
    unchecked = 'white',
    match = '#11d411',
    noMatch = '#444',
    misplaced = '#d8c628',
    empty = '#333'
}

export interface LetterMatch {
    letter: string
    match: ColourCodes
}


export const qwertyKeyRows: Array<LetterMatch[]> = [
    [
        { letter: 'Q', match: ColourCodes.unchecked },
        { letter: 'W', match: ColourCodes.unchecked },
        { letter: 'E', match: ColourCodes.unchecked },
        { letter: 'R', match: ColourCodes.unchecked },
        { letter: 'T', match: ColourCodes.unchecked },
        { letter: 'Y', match: ColourCodes.unchecked },
        { letter: 'U', match: ColourCodes.unchecked },
        { letter: 'I', match: ColourCodes.unchecked },
        { letter: 'O', match: ColourCodes.unchecked },
        { letter: 'P', match: ColourCodes.unchecked },
    ],
    // ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    [
        { letter: 'A', match: ColourCodes.unchecked },
        { letter: 'S', match: ColourCodes.unchecked },
        { letter: 'D', match: ColourCodes.unchecked },
        { letter: 'F', match: ColourCodes.unchecked },
        { letter: 'G', match: ColourCodes.unchecked },
        { letter: 'H', match: ColourCodes.unchecked },
        { letter: 'J', match: ColourCodes.unchecked },
        { letter: 'K', match: ColourCodes.unchecked },
        { letter: 'L', match: ColourCodes.unchecked },
    ],
        // ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    [
        { letter: 'Z', match: ColourCodes.unchecked },
        { letter: 'X', match: ColourCodes.unchecked },
        { letter: 'C', match: ColourCodes.unchecked },
        { letter: 'V', match: ColourCodes.unchecked },
        { letter: 'B', match: ColourCodes.unchecked },
        { letter: 'N', match: ColourCodes.unchecked },
        { letter: 'M', match: ColourCodes.unchecked },
    ],
    // ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
]