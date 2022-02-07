import { API_KEY } from '../constants/config'

export const fetchResults = (query, page=null) => {
    return fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${query}${page === null ? "" : `&page=${page}`}`
        )
        .then(r => r.json())
        .then(r => r)
}