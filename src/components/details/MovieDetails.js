import { useState, useEffect } from 'react'
import { readableMoney } from '../../helpers/text'
import { BASE_BACKDROP_PATH, BASE_POSTER_PATH, NOT_FOUND_IMAGE } from '../../constants/config'
import { STRINGS } from '../../constants/strings'
import { fetchDetailsById } from '../../services/tmdb'
import Ratings from './extra/Ratings'
import WatchProviders from './extra/WatchProviders'

const MovieDetails = ({mediaId, language}) => {

	const [details, setDetails] = useState(null)

	useEffect(() => {
	fetchDetailsById(mediaId, "movie", language).then(data => {
		const release_dates = data.release_dates.results.filter(date => date.iso_3166_1 === language.split("-")[1])
		let certification = null
		if (release_dates.length > 0) {
			certification = release_dates[0].release_dates[0].certification
		}
		let providers = data["watch/providers"].results[language.split('-')[1]]
		let top_providers = []
		if (providers !== undefined) {
			top_providers = top_providers.concat(providers.rent, providers.buy, providers.flatrate)
					.filter(a => a !== undefined)
					.sort((a, b) => a.provider - b.provider)
					.slice(0, 4)
		}
		setDetails({...data, certification: certification, providers: top_providers})
		})
	}, [mediaId, language])

	details !== null && console.log(details)

	return (
		details !== null && (
			<div
				style={{
					background: `linear-gradient(rgba(230,230,230,0.7), rgba(190,190,190,0.7)),
								${details.backdrop_path ? `url('${BASE_BACKDROP_PATH.replace("PATH", details.backdrop_path)}')` : "linear-gradient(white, white)"}`,
					backgroundSize: "cover"
				}}
				className="rounded my-16 max-w-screen-lg w-full modal z-20 overflow-auto">
				<div className="flex gap-3 p-6">
					{/* Poster */}
					<div className="w-1/3 flex items-center">
						<img 
							src={details.poster_path ? `${BASE_POSTER_PATH.replace("PATH", details.poster_path)}` : NOT_FOUND_IMAGE}
							alt={`${details.title} poster`}
							className="rounded"/>
					</div>
					
					{/* Content */}
					<div className="w-2/3">
						{/* Title */}
						<p className={`${details.title.length > 30 ? "text-3xl" : "text-4xl"} font-medium`}>
							{details.title}
							{details.release_date && 
							<span className="text-gray-500 font-light"> ({details.release_date.split('-')[0]})</span>}
						</p>
					
						{/* Certification, Genres, Runtime */}
						<div className="mt-4 flex gap-2">
							{details.certification && 
								<p className="border-gray-600 text-gray-600 border-2 px-2 rounded w-max">
								{details.certification}
								</p>}

							<div className="text-lg">
								{`${details.certification ? "• " : ""} ${details.genres.map(genre => genre.name).join(", ")} • ${details.runtime}min`}
							</div>
						</div>

						{/* Ratings */}
						<Ratings 
							language={language} 
							voteCount={details.vote_count} 
							voteAverage={details.vote_average} 
							className="font-medium text-lg mt-4"/>
					
						{/* Tagline */}
						{details.tagline && <p className="mt-4 italic">{details.tagline}</p>}
						
						{/* Overview */}
						{details.overview && 
						<>
							<p className="text-lg font-medium mt-4">
							{STRINGS[language]['DETAILS_OVERVIEW']}:
							</p>
							<p>
							{details.overview}
							</p>
						</>}

						{/* Status */}
						{details.status && 
							<p className="text-lg font-medium mt-4">
								{STRINGS[language]['DETAILS_STATUS']}: <span className="text-base font-normal">{details.status}</span>
							</p>}
					
						{/* Budget, Revenue */}
						<div className="grid grid-cols-2 mt-4">
							{details.budget !== 0 && 
							<p className="text-lg font-medium">
								{STRINGS[language]['DETAILS_BUDGET']}: <span className="text-base font-normal">{readableMoney(details.budget)}</span>
							</p>}

							{details.revenue !== 0 && 
							<p className="text-lg font-medium">
								{STRINGS[language]['DETAILS_REVENUE']}: <span className="text-base font-normal">{readableMoney(details.revenue)}</span>
							</p>}
						</div>

						{/* Watch Providers */}
						{details.providers.length > 0 && (
							<WatchProviders providers={details.providers} language={language}/>
						)}
					</div>
				</div>
			</div>
		)
	)
}

export default MovieDetails