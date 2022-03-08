import { useState, useEffect } from 'react'
import { readableMoney } from '../../helpers/text'
import { BASE_BACKDROP_PATH, BASE_POSTER_PATH, NOT_FOUND_IMAGE } from '../../constants/config'
import { fetchDetailsById } from '../../services/tmdb'
import Ratings from './Ratings'

const MovieDetails = ({mediaId, language}) => {

  const [details, setDetails] = useState(null)

  useEffect(() => {
    fetchDetailsById(mediaId, "movie", language).then(data => {
      const release_dates = data.release_dates.results.filter(date => date.iso_3166_1 === language.split("-")[1])
      let certification = null
      if (release_dates.length > 0) {
        certification = release_dates[0].release_dates[0].certification
      }
      setDetails({...data, certification: certification})
    })
  }, [mediaId, language])
  console.log(details)
  return (
    details !== null && (
      <div
        style={{
          background: `linear-gradient(rgba(230,230,230,0.75), rgba(190,190,190,0.75)), 
                      ${details.backdrop_path ? `url('${BASE_BACKDROP_PATH.replace("PATH", details.backdrop_path)}')` : "linear-gradient(white, white)"}`,
          backgroundSize: "cover"
        }}
        className="rounded p-6 my-16 max-w-screen-lg w-full modal z-20 overflow-auto">
      
        <div className="flex gap-4">

          <div className="w-1/3 flex items-center">
            <img 
                src={details.poster_path ? `${BASE_POSTER_PATH.replace("PATH", details.poster_path)}` : NOT_FOUND_IMAGE}
                alt={`${details.title} poster`}
                className="rounded"/>
          </div>
          
          <div className="w-2/3">
            <p className={`${details.title.length > 30 ? "text-3xl" : "text-4xl"} font-medium`}>
              {details.title}
              {details.release_date && 
                <span className="text-gray-500 font-light"> ({details.release_date.split('-')[0]})</span>}
            </p>

            <div className="my-4 flex gap-2">
              {details.certification && 
                  <p className="border-gray-600 border-2 px-2 rounded w-max">
                    {details.certification}
                  </p>}

              <div className="text-lg">
                {`${details.certification ? "• " : ""} ${details.genres.map(genre => genre.name).join(", ")} • ${details.runtime}min`}
              </div>
            </div>
            <Ratings voteCount={details.vote_count} voteAverage={details.vote_average} className="font-medium text-lg"/>
            
            {details.tagline && <p className="mt-4 italic">{details.tagline}</p>}
            
            {details.overview && 
            <>
              <p className="text-lg font-medium mt-4">
              Overview:
              </p>
              <p>
                {details.overview}
              </p>
            </>
            }


            {details.status && 
              <p className="text-lg font-medium mt-4">
                  Status: <span className="text-md font-normal">{details.status}</span>
              </p>}

            <div className="grid grid-cols-2 mt-4">
              {details.budget !== 0 && 
              <p className="text-lg font-medium">
                  Budget: <span className="text-md font-normal">{readableMoney(details.budget)}</span>
              </p>}

              {details.revenue !== 0 && 
              <p className="text-lg font-medium">
                  Revenue: <span className="text-md font-normal">{readableMoney(details.revenue)}</span>
              </p>}
            </div>
            
          </div>

        </div>
      </div>
    )
  )
}

export default MovieDetails