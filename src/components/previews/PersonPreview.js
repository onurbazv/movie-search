import { NOT_FOUND_IMAGE, BASE_IMAGE_PATH } from '../../constants/config'
import { STRINGS } from '../../constants/strings'

const PersonPreview = ({media, language}) => {
    return (
        <div className="flex gap-4 p-4 bg-gray-300 rounded">
            <img 
                src={media.profile_path === null ? NOT_FOUND_IMAGE : BASE_IMAGE_PATH.replace("IMAGE_PATH", media.profile_path)} 
                alt={`${media.name} poster`}
                className="h-72 w-48 object-cover rounded self-center"/>
            <div className="flex flex-col gap-4">
                <p className="text-2xl">{media.name}</p>
                <p>Known for: {
                    (media.known_for.length > 0 && `${media.known_for.map(kf => (
                        kf.media_type === "tv" ? kf.name : kf.title
                    )).join(", ")}.`) || STRINGS[language]['NO_DESCRIPTION']
                }</p>
            </div>
        </div>
    )
}

export default PersonPreview