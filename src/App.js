import { useState, useEffect } from 'react'
import useDebounce from './hooks/useDebounce'

export default function App () {
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const debouncedSearchTerm = useDebounce(searchTerm, 500)
    
    useEffect(() => {
        console.log('searchTerm:', searchTerm)
    }, [searchTerm])

    useEffect(() => {
        if (debouncedSearchTerm) {
            setIsSearching(true)
            // search term has changed
            // results should be fetched now
        } else {
            setIsSearching(false)
        }
    }, [debouncedSearchTerm])

    return (
        <div>
            <input 
                type="text" 
                value={searchTerm} 
                onChange={({target}) => setSearchTerm(target.value)}/>
            <div>
                <p>List of results</p>
            </div>
        </div>
    )
}