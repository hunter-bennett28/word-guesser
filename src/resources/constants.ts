// The colours used to represent different states of an entered letter
export const enum ColourCodes {
    unchecked = 'white',
    match = '#11d411',
    noMatch = '#444',
    misplaced = '#d8c628',
    empty = '#333'
}

// Interface for letters and their corresponding colours in Keyboard
export interface LetterMatch {
    letter: string
    match: ColourCodes
}

// 2D Array of letters to be rendered in the virtual Keyboard component and the
// colours they should be
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
    [
        { letter: 'Z', match: ColourCodes.unchecked },
        { letter: 'X', match: ColourCodes.unchecked },
        { letter: 'C', match: ColourCodes.unchecked },
        { letter: 'V', match: ColourCodes.unchecked },
        { letter: 'B', match: ColourCodes.unchecked },
        { letter: 'N', match: ColourCodes.unchecked },
        { letter: 'M', match: ColourCodes.unchecked },
    ]
]
