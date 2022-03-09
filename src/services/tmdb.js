import { GET_DETAILS_URL } from "../constants/config"

export const fetchResults = async (url, page, language) => {
    const finalUrl = url.replace("PAGE", page).replace('LANGUAGE', language)
    const req = await fetch(finalUrl)
    return await req.json()
}


export const fetchDetailsById = async (id, category, language) => {
    let additionalParameters = ""
    category === "movie" ? additionalParameters += "&append_to_response=release_dates" : additionalParameters += ""
    category === "tv" ? additionalParameters += "&append_to_response=content_ratings" : additionalParameters += ""
    const url = GET_DETAILS_URL.replace("ID", id).replace("LANGUAGE", language).replace("CATEGORY", category) + additionalParameters
    const req = await fetch(url)
    return await req.json()
}