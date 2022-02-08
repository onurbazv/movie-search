import { useState, useEffect } from 'react'
import SearchForm from './components/SearchForm'
import RenameMe from './components/RenameMe'
import { fetchResults } from './services/tmdb'

export default function App () {
    const [results, setResults] = useState([])
    const [request, setRequest] = useState({
        page: 1,
        url: ""
    })

    useEffect(() => {
        async function fetchData() {
            const res = await fetchResults(request.url, request.page)
            setResults(res.results)
        }
        if (request.url !== "") {
            fetchData()
        } 
    }, [request])

    return (
        <div className="p-16 min-h-screen bg-gray-100">
            <div className="max-w-screen-md mx-auto">
                <SearchForm setRequest={setRequest}/>
                <div className="p-4">
                    {results.length > 0 && results.map((media, index) => (
                        <RenameMe key={index} media={media}/>
                    ))}
                </div>
            </div>
        </div>
    )
}