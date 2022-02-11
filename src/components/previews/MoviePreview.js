import { NOT_FOUND_IMAGE, BASE_IMAGE_PATH } from '../../constants/config'
import { STRINGS } from '../../constants/strings'

const MoviePreview = ({media, language}) => {
    return (
        <div className="flex gap-4 p-4 bg-gray-300 rounded">
            <img 
                src={media.poster_path === null ? NOT_FOUND_IMAGE : BASE_IMAGE_PATH.replace("IMAGE_PATH", media.poster_path)} 
                alt={`${media.title} poster`}
                className="h-72 w-48 object-cover rounded self-center"/>
            <div className="flex flex-col gap-4">
                <p className="text-2xl">{media.title}</p>
                <p>{media.overview || STRINGS[language]['NO_DESCRIPTION']}</p>
            </div>
        </div>
    )
}

export default MoviePreview