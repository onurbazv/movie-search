// import { API_KEY } from '../constants/config'
const API_KEY = "7dd4eac08ee75e1288a33d6d52741be1"
export const fetchResults = async (query, page=null) => {
    const req = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}${page === null ? "" : `&page=${page}`}`
        )
    const data = await req.json()
    console.log(data)
    return data
}