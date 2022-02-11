import { useState } from 'react';
import { BASE_URL } from '../constants/config'
import { STRINGS } from '../constants/strings';

export default function SearchForm({setRequest, language}) {
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
            category: formData.category,
            url: BASE_URL
                .replace("QUERY", formData.query)
                .replace("CATEGORY", formData.category)
                .replace("NSFW", formData.includeAdult ? "true" : "false")
                .replace("LANGUAGE", language)
        })
    }

    return (
        <form className="bg-gray-300 p-4 rounded mb-8" onSubmit={handleSubmit}>
                    <h1 className="text-4xl text-center mb-4">{STRINGS[language]['FORM_TITLE']}</h1>
                    <div className="flex gap-4 mb-2">
                        <input
                            name="query"
                            type="text"
                            className="w-full p-2 rounded"
                            placeholder={STRINGS[language]['FORM_SEARCHBAR']}
                            onChange={handleChange}
                            value={formData.query}/>
                        <button className="bg-white px-4 rounded">{STRINGS[language]['FORM_SEARCHBTN']}</button>
                    </div>
                    <div className="flex items-start">
                        <div className="mr-auto">
                            <p>{STRINGS[language]['FORM_CATEGORY']}:</p>
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
                                    <label htmlFor="multi">{STRINGS[language]['FORM_CATEGORY_ALL']}</label>
                                </div>
                                <div>
                                    <input
                                        className="mr-2"
                                        name="category" 
                                        type="radio"
                                        id="movies"
                                        value="movie"
                                        onChange={handleChange}/>
                                    <label htmlFor="movies">{STRINGS[language]['FORM_CATEGORY_MOVIE']}</label>
                                </div>
                                <div>
                                    <input
                                        className="mr-2"
                                        name="category" 
                                        type="radio"
                                        id="tv-shows"
                                        value="tv"
                                        onChange={handleChange}/>
                                    <label htmlFor="tv-shows">{STRINGS[language]['FORM_CATEGORY_TV']}</label>
                                </div>
                                <div>
                                    <input
                                        className="mr-2"
                                        name="category" 
                                        type="radio"
                                        id="person"
                                        value="person"
                                        onChange={handleChange}/>
                                    <label htmlFor="person">{STRINGS[language]['FORM_CATEGORY_PERSON']}</label>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <p>{STRINGS[language]['FORM_INCLUDE_NSFW']}:</p>
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
