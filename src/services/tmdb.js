export const fetchResults = async (url, page) => {
    console.log(url.replace("PAGE", page))
    const req = await fetch(
        url.replace("PAGE", page)
        )
    return await req.json()
}

// const API_KEY = "7dd4eac08ee75e1288a33d6d52741be1"