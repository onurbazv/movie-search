import { useState } from 'react'
import { ARROW_LEFT, ARROW_RIGHT } from '../../../constants/icons'
import { SMALL_POSTER_PATH, NOT_FOUND_IMAGE } from '../../../constants/config'
import MovieDetails from '../MovieDetails'
import TvDetails from '../TvDetails'

const CombinedCredits = ({credits, setFocusComponent, language}) => {
    const [page, setPage] = useState(1)

    return (
        <>
            <p className="text-lg font-medium mt-4">Known For:</p>
            <div className="flex w-full h-48 mt-2">
                <div className={`mr-1 flex items-center ${page <= 1 ? "cursor-not-allowed" : ""}`}
                     onClick={() => page > 1 && setPage(prev => prev - 1)}>
                    {ARROW_LEFT}
                </div>
                <div className="w-full grid grid-cols-5 gap-2">
                    {credits.slice((page * 5) - 5, (page * 5)).map((credit, index) => (
                        <div key={index} onClick={() => {
                            if (credit.media_type === "tv") {
                                setFocusComponent(<TvDetails mediaId={credit.id} language={language} />)
                            } else if (credit.media_type === "movie") {
                                setFocusComponent(<MovieDetails mediaId={credit.id} language={language} />)
                            }
                        }}>
                            <img className="rounded mb-1"
                                 src={credit.poster_path ? SMALL_POSTER_PATH.replace("PATH", credit.poster_path) : NOT_FOUND_IMAGE} alt={`${credit.name} poster`}/>
                            <p className="text-sm text-center">{credit.name || credit.title}</p>
                        </div>
                    ))}
                </div>
                <div className={`ml-1 flex items-center ${page >= Math.ceil(credits.length / 5) ? "cursor-not-allowed" : ""}`}
                     onClick={() => page < Math.ceil(credits.length / 5) && setPage(prev => prev + 1)}>
                    {ARROW_RIGHT}
                </div>
            </div>
        </>
    )
}

export default CombinedCredits