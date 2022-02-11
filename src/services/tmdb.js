export const fetchResults = async (url, page) => {
    const req = await fetch(url.replace("PAGE", page))
    return await req.json()
}