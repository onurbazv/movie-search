import { useState, useEffect } from 'react'
import { BASE_BACKDROP_PATH, NOT_FOUND_BACKDROP } from '../../constants/config'
import { fetchDetailsById } from '../../services/tmdb'

const MovieDetails = ({mediaId, language}) => {
  // fetch details using a new service function and populate the component with thse details
  // need to have access to language to select the correct string and fetch the correct data
  // fetching will occurr when the component is mounted, using useeffect hook
  const [details, setDetails] = useState(null)
  console.log(details)
  useEffect(() => {
    fetchDetailsById(mediaId, "movie", language).then(data => {
      setDetails(data)
    })
  }, [mediaId, language])
  
  return (
    details !== null && (
      <div>
        <div className="flex flex-col">
          <img 
            src={BASE_BACKDROP_PATH.replace("PATH", 
                details.backdrop_path !== null ? details.backdrop_path : 
                details.poster_path !== null ? details.poster_path : NOT_FOUND_BACKDROP)} 
            alt="backdrop"
            className="max-h-60 w-full object-cover object-center"/>
          <div>
            <h1 className="text-3xl">
              {details.title}
              {details.title !== details.original_title && (
                <span className="inline-block ml-4 text-gray-500 text-2xl tracking-wide">
                  ({details.original_title})
                </span>
              )}
            </h1>
            <p>
              {details.overview}
            </p>
          </div>
          <p>Rating: {details.vote_average}/10 ({details.vote_count})</p>
          <p>Popularity: {details.popularity}</p>
        </div>
      </div>
    )
  )
}

export default MovieDetails