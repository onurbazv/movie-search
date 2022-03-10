import { useState } from 'react'
import Modal from './Modal'
import MoviePreview from './previews/MoviePreview'
import TvPreview from './previews/TvPreview'
import PersonPreview from './previews/PersonPreview'
import MovieDetails from './details/MovieDetails'
import TvDetails from './details/TvDetails'
import PersonDetails from './details/PersonDetails'

const ResultList = ({results, category, language, refProp}) => {
    const [focusComponent, setFocusComponent] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    return (
        <>
            {focusComponent !== null && 
                <Modal 
                    isOpen={isModalOpen} 
                    close={() => {
                        setIsModalOpen(false)
                        setFocusComponent(null)
                    }} 
                    child={focusComponent}/>}

            <div ref={refProp} className="flex flex-col gap-4 mb-4">
                {results.length > 0 && results.map((media, index) => {
                    if (media.media_type === "tv" || category === "tv") {
                        return (
                            <TvPreview 
                                media={media} 
                                language={language} 
                                key={index}
                                handleClick={() => {
                                    if (window.getSelection().toString() === "") {
                                        setFocusComponent(<TvDetails mediaId={media.id} 
                                                                     language={language}/>)
                                        setIsModalOpen(true)
                                    }
                                }}/>
                        )
                    } else if (media.media_type === "movie" || category === "movie") {
                        return (
                            <MoviePreview 
                                media={media} 
                                language={language} 
                                key={index}
                                handleClick={() => {
                                    if (window.getSelection().toString() === "") {
                                        setFocusComponent(<MovieDetails mediaId={media.id}
                                                                        language={language}/>)
                                        setIsModalOpen(true)
                                    }
                                }}/>
                        )
                    } else if (media.media_type === "person" || category === "person") {
                        return (
                            <PersonPreview 
                                media={media} 
                                language={language} 
                                key={index}
                                handleClick={() => {
                                    if (window.getSelection().toString() === "") {
                                        setFocusComponent(<PersonDetails mediaId={media.id}
                                                                         language={language}
                                                                         setFocusComponent={setFocusComponent}/>)
                                        setIsModalOpen(true)
                                    }
                                }}/>
                        )
                    } else {
                        return null
                    }
                })}
            </div>
        </>
    )
}

export default ResultList