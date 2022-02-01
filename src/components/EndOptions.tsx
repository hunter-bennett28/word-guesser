import { CheckMark, FailureX, SettingsIcon, ReplayIcon } from '../resources/svgs'

export interface EndOptionsProps {
    success: boolean
    word: string
    changeSettings: () => void
    replay: () => void
}

/**
 * A container component for displaying the results of a round. It will render either a green
 * checkmark or a red X based on the outcome of the game, and will present options for
 * continuation, including a settings button to alter the settings of the game or a 'play again' button
 * for restarting the game with the same settings and a new word.
 * @param {boolean} param0.success - Wether the result of the game was a success or not
 * @param {string} param0.word - The word that was to be guessed
 * @param {Function} param0.changeSettings - Callback function for the user pressing the Settings button
 * @param {Function} param0.replay - Callback function for the user pressing the Play Again button
 * @returns {JSX.Element}
 */
const EndOptions = ({ success, word, changeSettings, replay }: EndOptionsProps) => {
    return (
        <div className='endOptionsContainer'>
            <div className='iconButton' onClick={() => changeSettings()}>
                { SettingsIcon }
                <p>Settings</p>
            </div>
            <div className='result'>
                <div className={`resultIconContainer ${success ? 'success' : 'failure'}`}>
                    {/* Render the result icon based on the success of the game */}
                    { success ? CheckMark : FailureX }
                </div>
                {!success && <p>{word.toUpperCase()}</p>}
            </div>
            <div className='iconButton' onClick={() => replay()}>
                { ReplayIcon }
                <p>Play Again</p>
            </div>
        </div>
    )
}

export default EndOptions
