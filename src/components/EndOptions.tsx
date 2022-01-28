export interface EndOptionsProps {
    success: boolean
    changeSettings: () => void
    replay: () => void
}

/**
 * A container component for displaying the results of a round. It will render either a green
 * checkmark or a red X based on the outcome of the game, and will present options for
 * continuation, including a settings button to alter the settings of the game or a 'play again' button
 * for restarting the game with the same settings and a new word.
 * @param {boolean} param0.success - Wether the result of the game was a success or not
 * @param {Function} param0.changeSettings - Callback function for the user pressing the Settings button
 * @param {Function} param0.replay - Callback function for the user pressing the Play Again button
 * @returns {JSX.Element}
 */
const EndOptions = ({ success, changeSettings, replay }: EndOptionsProps) => {
    return (
        <div className='endOptionsContainer'>
            <div className='iconButton' onClick={() => changeSettings()}>
                <img src='settings.svg' alt='Game settings button' className='iconButtonImage' />
                <p>Settings</p>
            </div>
            <div className={`resultIconContainer ${success ? 'success' : 'failure'}`}>
                {/* Render the result icon based on the success of the game */}
                {success ? (
                    <svg className='checkmark' viewBox='0 0 25 30'>
                        <path d='M2,19.2C5.9,23.6,9.4,28,9.4,28L23,2' />
                    </svg>
                ) : (
                    <svg
                        className='failureX'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                    >
                        <path d='M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z' />
                    </svg>
                )}
            </div>
            <div className='iconButton' onClick={() => replay()}>
                <img src='replay.svg' alt='Play again button' className='iconButtonImage' />
                <p>Play Again</p>
            </div>
        </div>
    )
}

export default EndOptions
