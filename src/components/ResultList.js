import MoviePreview from './previews/MoviePreview'
import TvPreview from './previews/TvPreview'
import PersonPreview from './previews/PersonPreview'

const ResultList = ({results, category, language, refProp}) => {
    return (
        <div ref={refProp} className="flex flex-col gap-4 mb-4">
            {results.length > 0 && results.map((media, index) => {
                if (media.media_type === "tv" || category === "tv") {
                    return (
                        <TvPreview media={media} language={language} key={index}/>
                    )
                } else if (media.media_type === "movie" || category === "movie") {
                    return (
                        <MoviePreview media={media} language={language} key={index}/>
                    )
                } else if (media.media_type === "person" || category === "person") {
                    return (
                        <PersonPreview media={media} language={language} key={index}/>
                    )
                } else {
                    return null
                }
            })}
        </div>
    )
}

export default ResultList