import { useEffect, useState } from 'react'
import { fetchDetailsById } from '../../services/tmdb'
import { BASE_POSTER_PATH, NOT_FOUND_IMAGE } from '../../constants/config'
import { STRINGS } from '../../constants/strings'
import { readableDate } from '../../helpers/dates'
import Credits from './extra/Credits'

const PersonDetails = ({mediaId, language, setFocusComponent}) => {
	const [details, setDetails] = useState(null)
	useEffect(() => {
		fetchDetailsById(mediaId, "person", language).then(data => {
			const combined_credits = [...data.combined_credits.crew, ...data.combined_credits.cast]
			combined_credits.sort((a, b) => b.popularity - a.popularity)
			setDetails({
				...data,
				combined_credits: combined_credits
			})
		})
	  }, [mediaId, language])



	return (
		details !== null && (
			<div className="rounded p-6 my-16 max-w-screen-lg w-full modal z-20 overflow-auto flex gap-4 bg-gray-100">

				{/* Poster */}
				<div className="w-1/3 flex items-center">
					<img 
						src={details.profile_path ? `${BASE_POSTER_PATH.replace("PATH", details.profile_path)}` : NOT_FOUND_IMAGE}
						alt={`${details.name} poster`}
						className="rounded"/>
				</div>

				{/* Content */}
				<div className="w-2/3">
					{/* Name */}
					<p className={`${details.name.length > 30 ? "text-3xl" : "text-4xl"} font-medium`}>
						{details.name}
					</p>

					{/* Biography */}
					{details.biography && 
					<>
						<p className="text-lg font-medium mt-4">
						{STRINGS[language]['DETAILS_BIOGRAPHY']}:
						</p>
						<p>
							{details.biography}
						</p>
					</>}

					{/* Date of Birth / Death */}
					{details.birthday !== null || details.deathday !== null ? (
						<div className="flex mt-4">
							{details.birthday !== null && (
								<p className="text-lg font-medium">
									{STRINGS[language]['DETAILS_BIRTHDAY']}: <span className="font-normal text-base">{readableDate(details.birthday, language)}</span>
								</p>
							)}
							{details.deathday !== null && (
								<p className={`text-lg font-medium ${details.birthday !== null ? "ml-auto" : ""}`}>
									{STRINGS[language]['DETAILS_DEATHDAY']}: <span className="font-normal text-base">{readableDate(details.deathday, language)}</span>
								</p>
							)}
						</div>
					) : null} 


					{/* Place of Birth */}
					{details.place_of_birth !== null && (
						<p className="text-lg font-medium mt-4">
							{STRINGS[language]['DETAILS_PLACEOFBIRTH']}: <span className="font-normal text-base">{details.place_of_birth}</span>
						</p>
					)}

					{/* Known_for or Credit Cards */}
					{details.combined_credits.length > 0 && (
						<Credits credits={details.combined_credits} 
								 language={language}
								 setFocusComponent={setFocusComponent} />
					)}
				</div>
				
			</div>
		)
	)
}

export default PersonDetails