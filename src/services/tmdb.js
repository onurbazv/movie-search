import { GET_DETAILS_URL } from "../constants/config"

export const fetchResults = async (url, page, language) => {
    const finalUrl = url.replace("PAGE", page).replace('LANGUAGE', language)
    const req = await fetch(finalUrl)
    return await req.json()
}


export const fetchDetailsById = async (id, category, language) => {
    const url = GET_DETAILS_URL.replace("ID", id).replace("LANGUAGE", language).replace("CATEGORY", category)
    const req = await fetch(url)
    return await req.json()
}