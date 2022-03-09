import { useEffect, useState } from "react"
import { fetchDetailsById } from "../../services/tmdb"
import { BASE_BACKDROP_PATH, BASE_NETWORK_PATH, BASE_POSTER_PATH, NOT_FOUND_IMAGE } from '../../constants/config'
import Ratings from "./Ratings"

const TvDetails = ({mediaId, language}) => {
	const [details, setDetails] = useState(null)

	useEffect(() => {
		fetchDetailsById(mediaId, "tv", language).then(data => {
		  const content_ratings = data.content_ratings.results.filter(cr => cr.iso_3166_1 === language.split("-")[1])
		  let certification = null
		  if (content_ratings.length > 0) {
			certification = content_ratings[0].rating
		  }
		  setDetails({...data, certification: certification})
		})
	  }, [mediaId, language])

	details !== null && console.log(details)

	return (
		details !== null && (
			<div
				style={{
				background: `linear-gradient(rgba(230,230,230,0.85), rgba(190,190,190,0.85)), 
							${details.backdrop_path ? `url('${BASE_BACKDROP_PATH.replace("PATH", details.backdrop_path)}')` : "linear-gradient(white, white)"}`,
				backgroundSize: "cover"
				}}
				className="rounded p-6 my-16 max-w-screen-lg w-full modal z-20 overflow-y-auto flex gap-3 max-h-90">
			
				{/* Poster */}
				<div className="w-1/3 flex items-center">
					<img 
						src={details.poster_path ? `${BASE_POSTER_PATH.replace("PATH", details.poster_path)}` : NOT_FOUND_IMAGE}
						alt={`${details.name} poster`}
						className="rounded"/>
				</div>

				{/* Content */}
				<div className="w-2/3">
					{/* Title */}
					<p className={`${details.name.length > 30 ? "text-3xl" : "text-4xl"} font-medium`}>
					{details.name}
					{details.first_air_date && 
						<span className="text-gray-500 font-light"> ({details.first_air_date.split('-')[0]})</span>}
					</p>

					{/* Certification, Genres, Num Seasons */}
					<div className="mt-3 flex gap-2">
					{details.certification && 
						<p className="border-gray-600 text-gray-600 border-2 px-2 rounded w-max">
							{details.certification}
						</p>}

						<p className="text-lg">
							{`${details.certification ? "• " : ""} 
							${details.genres.map(genre => genre.name).join(", ")} • 
							${details.seasons.length} Seasons`}
						</p>
					</div>

					{/* Ratings & Episode Dates */}
					<div className="flex  mt-3">
						<Ratings 
							voteCount={details.vote_count} 
							voteAverage={details.vote_average} 
							className="font-medium text-lg"/>
						<div className="ml-auto">
							{details.last_episode_to_air && (
								<p className="font-medium text-lg">Last Air Date: 
									<span className="font-normal text-base"> {details.last_episode_to_air.air_date}, {`S${details.last_episode_to_air.season_number}E${details.last_episode_to_air.episode_number}`} </span>
								</p>
							)}
							{details.next_episode_to_air && (
								<p className={`${details.last_episode_to_air !== null ? "ml-auto" : ""} font-medium text-lg`}>Next Air Date: 
									<span className="font-normal text-base"> {details.next_episode_to_air.air_date}, {`S${details.next_episode_to_air.season_number}E${details.next_episode_to_air.episode_number}`}</span>
								</p>
							)}
						</div>
					</div>

					{/* Tagline */}
					{details.tagline && <p className="mt-3 italic">{details.tagline}</p>}
            
					{/* Overview */}
					{details.overview && 
					<>
						<p className="text-lg font-medium mt-3">
						Overview:
						</p>
						<p className="text-base">
							{details.overview}
						</p>
					</>
					}

					{/* Status */}
					{details.status && 
					<p className="text-lg font-medium mt-3">
						Status: <span className="text-base font-normal">{details.status}</span>
					</p>}


					{/* Network Cards */}					
					{details.networks.length > 0 && (
						<>
							<p className="mt-3 text-lg font-medium">Networks:</p>
							<div className="w-full mt-2 max-h-48 flex gap-3">
								{details.networks.map(network => (
									<img 
										src={network.logo_path ?
											`${BASE_NETWORK_PATH.replace("PATH", network.logo_path)}` : 
											NOT_FOUND_IMAGE} 
										alt={`${network.name} logo`}/>
								))}
							</div>
						</>
					)}
				</div>
				
			</div>
		)
	)
}

export default TvDetails