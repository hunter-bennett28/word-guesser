export interface EndOptionsProps {
    success: boolean
    changeSettings: () => void
    replay: () => void
}

const EndOptions = ({ success, changeSettings, replay }: EndOptionsProps) => {
    return (
        <div className='endOptionsContainer'>
            <div className='iconButton' onClick={() => changeSettings()}>
                <img src='settings.svg' alt='Game settings button' className='iconButtonImage' />
                <p>Settings</p>
            </div>
            <div className={`resultIconContainer ${success ? 'success' : 'failure'}`}>
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
