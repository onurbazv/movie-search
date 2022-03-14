import { GET_DETAILS_URL } from "../constants/config"

export const fetchResults = async (url, page, language) => {
    const finalUrl = url.replace("PAGE", page).replace('LANGUAGE', language)
    const req = await fetch(finalUrl)
    return await req.json()
}


export const fetchDetailsById = async (id, category, language) => {
    let additionalParameters = []
    category === "movie" && additionalParameters.push("release_dates")
    category === "tv" && additionalParameters.push("content_ratings")
    category === "person" ? additionalParameters.push("combined_credits") : additionalParameters.push("watch/providers")
    const url = GET_DETAILS_URL.replace("ID", id).replace("LANGUAGE", language).replace("CATEGORY", category) + `&append_to_response=${additionalParameters.join(",")}`
    const req = await fetch(url)
    return await req.json()
}