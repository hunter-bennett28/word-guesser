import { ColourCodes } from '../resources/constants'

export enum KeyContentType {
    Text,
    Icon,
}

export interface KeyboardKeyProps {
    content: string
    colour?: ColourCodes
    clickHandler: (content: string) => void
    type?: KeyContentType
    description?: string
}

/**
 *
 * @param {string} param0.content - The content of the key, either text or a path if its an icon
 * @param {ColourCodes?} param0.colour - The colour to make the background of the key
 * @param {Function} param0.clickHandler - The callback function for when the key is pressed
 * @param {KeyContentType?} param0.type - The type of the key's content, either Text or Icon
 * @param {string?} param0.description - The description to use as the 'alt' attribute if content is an Icon
 * @returns {JSX.Element}
 */
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
            style={{ backgroundColor: colour }}>
            {type === KeyContentType.Text ? (
                <p
                    className='keyboardKeyText'
                    style={{
                        color: colour === ColourCodes.unchecked ? ColourCodes.noMatch : 'white',
                    }}>
                    {content}
                </p>
            ) : (
                <img className='keyboardKeyIcon' src={content} alt={description} />
            )}
        </div>
    )
}

export default KeyboardKey
