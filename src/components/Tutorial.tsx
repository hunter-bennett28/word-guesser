export interface TutorialProps {
    close: () => void
}

/**
 * A modal for giving simple instruction on how to play the game.
 * @param {Function} param0.close - The callback for the user closing the Tutorial
 * @returns {JSX.Element}
 */
const Tutorial = ({ close }: TutorialProps) => {
    return (
        <div className='modalContainer'>
            <div className='tutorialContainer'>
                <div className='closeTutorialButton' onClick={close}>X</div>
                <h3>Try to guess the secret word!</h3>
                <p>After submitting a word, the letter colours will change to show how close you are.</p>
                <hr />
                <img src='one-match-word.png' alt='Word showing one matching letter in green' className='tutorialImage' />
                <p>Letters that are in the correct spot in the word will appear in green.</p>
                <img src='one-misplaced-word.png' alt='Word showing one misplaced letter in yellow' className='tutorialImage' />
                <p>Letters that are in the word but in the wrong spot will appear in yellow.</p>
            </div>
        </div>
    )
}

export default Tutorial