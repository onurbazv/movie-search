export const fetchResults = async (url, page, language) => {
    const finalUrl = url.replace("PAGE", page).replace('LANGUAGE', language)
    console.log(finalUrl)
    const req = await fetch(finalUrl)
    return await req.json()
}