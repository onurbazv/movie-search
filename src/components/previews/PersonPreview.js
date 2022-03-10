import { NOT_FOUND_IMAGE, BASE_POSTER_PATH } from '../../constants/config'
import { STRINGS } from '../../constants/strings'

const PersonPreview = ({media, language, handleClick}) => {

    return (
        <div className="flex gap-4 p-4 bg-gray-200 rounded shadow-md" onClick={handleClick}>
            <img 
                src={media.profile_path === null ? NOT_FOUND_IMAGE : BASE_POSTER_PATH.replace("PATH", media.profile_path)} 
                alt={`${media.name} poster`}
                className="h-72 w-48 object-cover rounded self-center"/>
            <div className="flex flex-col gap-4">
                <p className="text-2xl">{media.name}</p>
                <p>Known for: {
                    (media.known_for.length > 0 && `${media.known_for.map(gig => (
                        gig.media_type === "tv" ? gig.name : gig.title
                    )).join(", ")}.`) || STRINGS[language]['NO_DESCRIPTION']
                }</p>
            </div>
        </div>
    )
}

export default PersonPreview