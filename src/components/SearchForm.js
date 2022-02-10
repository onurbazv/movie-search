import { useState } from 'react';
import { BASE_URL } from '../constants/config'

export default function SearchForm({setRequest}) {
    const [formData, setFormData] = useState({
        query: "",
        category: "multi",
        includeAdult: false
    })

    const handleChange = (event) => {
        const {name, value, type, checked} = event.target
        setFormData(prev => {
            return {
                ...prev,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setRequest({
            page: 1,
            url: BASE_URL
                .replace("QUERY", formData.query)
                .replace("CATEGORY", formData.category)
                .replace("NSFW", formData.includeAdult ? "true" : "false")
        })
    }

    return (
        <form className="bg-gray-300 p-4 rounded mb-8" onSubmit={handleSubmit}>
                    <h1 className="text-4xl text-center mb-4">TMDB Search</h1>
                    <div className="flex gap-4 mb-2">
                        <input
                            name="query"
                            type="text"
                            className="w-full p-2 rounded"
                            placeholder="Search term"
                            onChange={handleChange}
                            value={formData.query}/>
                        <button className="bg-white px-4 rounded">Search</button>
                    </div>
                    <div className="flex items-start">
                        <div className="mr-auto">
                            <p>Category:</p>
                            <div className="flex gap-2">
                                <div>
                                    <input
                                        className="mr-2"
                                        name="category" 
                                        type="radio"
                                        id="multi"
                                        value="multi"
                                        onChange={handleChange}
                                        defaultChecked/>
                                    <label htmlFor="multi">All</label>
                                </div>
                                <div>
                                    <input
                                        className="mr-2"
                                        name="category" 
                                        type="radio"
                                        id="movies"
                                        value="movie"
                                        onChange={handleChange}/>
                                    <label htmlFor="movies">Movies</label>
                                </div>
                                <div>
                                    <input
                                        className="mr-2"
                                        name="category" 
                                        type="radio"
                                        id="tv-shows"
                                        value="tv"
                                        onChange={handleChange}/>
                                    <label htmlFor="tv-shows">TV Shows</label>
                                </div>
                                <div>
                                    <input
                                        className="mr-2"
                                        name="category" 
                                        type="radio"
                                        id="person"
                                        value="person"
                                        onChange={handleChange}/>
                                    <label htmlFor="person">Person</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <p>Include NSFW:</p>
                            <input 
                                name="includeAdult"
                                type="checkbox"
                                onChange={handleChange}
                                checked={formData.includeAdult}/>
                        </div>
                    </div>
                </form>
    );
}
