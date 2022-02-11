import { useState, useEffect, useRef } from 'react'
import { fetchResults } from './services/tmdb'
import SearchForm from './components/SearchForm'
import ResultList from './components/ResultList'
import LanguageControls from './components/LanguageControls'
import PageControls from './components/PageControls'

export default function App () {
    const [results, setResults] = useState([])
    const [language, setLanguage] = useState("en-US")
    const [request, setRequest] = useState({
        page: 1,
        totalPages: 1,
        totalResults: 1,
        url: "",
        category: ""
    })

    const scrollRef = useRef(null)
    const executeScroll = () => scrollRef.current.scrollIntoView({behavior: 'smooth', block: 'start'})

    useEffect(() => {
        async function fetchData() {
            const res = await fetchResults(request.url, request.page, language)
            setResults(res.results)
            setRequest(prev => ({
                ...prev,
                totalPages: res.total_pages,
                totalResults: res.total_results
            }))
        }
        if (request.url !== "") {
            fetchData()
        } 
    }, [request.url, request.page, language])

    return (
        <div className="bg-gray-100 min-h-screen">
            <LanguageControls language={language} setLanguage={setLanguage}/>
            <div className="px-16 mt-8 pb-8">
                <div className="max-w-screen-md mx-auto">
                    <SearchForm 
                        setRequest={setRequest} 
                        language={language} />

                    <ResultList 
                        language={language} 
                        results={results} 
                        category={request.category} 
                        refProp={scrollRef} />

                    {results.length > 0 && (
                        <PageControls 
                            currentPage={request.page} 
                            totalPages={request.totalPages} 
                            totalResults={request.totalResults}
                            setRequest={setRequest}
                            language={language}
                            executeScroll={executeScroll} />
                    )}
                </div>
            </div>
        </div>
    )
}