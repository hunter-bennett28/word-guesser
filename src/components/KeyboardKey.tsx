import { ColourCodes } from '../resources/constants'

export enum KeyContentType {
    Text,
    Icon,
}

export interface KeyboardKeyProps {
    content: string
    colour?: ColourCodes
    clickHandler: Function
    type?: KeyContentType
    description?: string
}

const KeyboardKey = ({
    content,
    colour = ColourCodes.unchecked,
    clickHandler,
    type = KeyContentType.Text,
    description,
}: KeyboardKeyProps) => {
    return (
        <div
            className={`keyboardKey` + (type === KeyContentType.Icon ? ' keyboardIcon' : '')}
            onClick={() => clickHandler(content)}
            style={{ backgroundColor: colour }}
        >
            {
                type === KeyContentType.Text
                    ? (
                        <p
                            className='keyboardKeyText'
                            style={{ color: colour === ColourCodes.unchecked ? ColourCodes.noMatch : 'white' }}
                        >
                            {content}
                        </p>
                    ) : (
                        <img className='keyboardKeyIcon' src={content} alt={description} />
                    )
            }
        </div>
    )
}

export default KeyboardKey
