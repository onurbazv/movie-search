import { NOT_FOUND_IMAGE, BASE_POSTER_PATH } from '../../constants/config'
import { STRINGS } from '../../constants/strings'
import { readableDate } from '../../helpers/dates'
import { limitTextSize } from '../../helpers/text'

const TvPreview = ({media, language, handleClick}) => {
    return (
        <div className="flex gap-4 p-4 bg-gray-200 rounded shadow-md" onClick={handleClick}>
            <img 
                src={media.poster_path === null ? NOT_FOUND_IMAGE : BASE_POSTER_PATH.replace("PATH", media.poster_path)} 
                alt={`${media.name} poster`}
                className="h-72 w-48 object-cover rounded self-center"/>
            <div className="flex flex-col gap-1">
                <p className="text-2xl">
                    {media.name}
                </p>
                {
                    media.first_air_date && 
                    <p className="italic mb-2">
                        {readableDate(media.first_air_date, language)}
                    </p>
                }
                <p>
                    {media.overview ? 
                    media.overview.length > 600 ? limitTextSize(media.overview) : media.overview 
                    : STRINGS[language]['NO_DESCRIPTION']}
                </p>
            </div>
        </div>
        )
}

export default TvPreview