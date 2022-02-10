import { useState, useEffect } from 'react'
import * as ICONS from './constants/icons'
import { fetchResults } from './services/tmdb'
import SearchForm from './components/SearchForm'
import MediaListing from './components/MediaListing'

export default function App () {
    const [results, setResults] = useState([])
    const [request, setRequest] = useState({
        page: 1,
        url: ""
    })
    const [language, setLanguage] = useState("en-US")

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
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-screen-md mx-auto py-4 flex gap-1">
                <div 
                    className={`ml-auto cursor-pointer p-1 rounded ${language === "en-US" && "bg-gray-300"}`}
                    onClick={() => language !== "en-US" && setLanguage("en-US")}>
                    {ICONS.FLAG_US}
                </div>
                <div 
                    className={`cursor-pointer p-1 rounded ${language === "pt-BR" && "bg-gray-300"}`}
                    onClick={() => language !== "pt-BR" && setLanguage("pt-BR")}>
                    {ICONS.FLAG_BR}
                </div>
            </div>

            <div className="px-16 mt-8 pb-8">
                <div className="max-w-screen-md mx-auto">
                    <SearchForm setRequest={setRequest} language={language}/>
                    <div className="flex flex-col gap-4">
                        {results.length > 0 && results.map((media, index) => (
                            <MediaListing key={index} media={media} language={language}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}