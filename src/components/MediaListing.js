import React from 'react';
import { NOT_FOUND_IMAGE, BASE_IMAGE_PATH } from '../constants/config'

export default function MediaListing({media}) {
    console.log(media)
    return (
        (media.media_type === "tv" && (
            <div className="flex gap-4 p-4 bg-gray-300 rounded">
                <img 
                    src={media.poster_path === null ? NOT_FOUND_IMAGE : BASE_IMAGE_PATH.replace("IMAGE_PATH", media.poster_path)} 
                    alt={`${media.name} poster`}
                    className="h-72 w-48 object-cover rounded self-center"/>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl">{media.name}</p>
                    <p>{media.overview || "No description found"}</p>
                </div>
            </div>
        )) || (media.media_type === "movie" && (
            <div className="flex gap-4 p-4 bg-gray-300 rounded">
                <img 
                    src={media.poster_path === null ? NOT_FOUND_IMAGE : BASE_IMAGE_PATH.replace("IMAGE_PATH", media.poster_path)} 
                    alt={`${media.title} poster`}
                    className="h-72 w-48 object-cover rounded self-center"/>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl">{media.title}</p>
                    <p>{media.overview || "No description found"}</p>
                </div>
            </div>
        )) || (media.media_type === "person" && (
            <div className="flex gap-4 p-4 bg-gray-300 rounded">
                <img 
                    src={media.poster_path === null ? NOT_FOUND_IMAGE : BASE_IMAGE_PATH.replace("IMAGE_PATH", media.profile_path)} 
                    alt={`${media.name} poster`}
                    className="h-72 w-48 object-cover rounded self-center"/>
                <div className="flex flex-col gap-4">
                    <p className="text-2xl">{media.name}</p>
                    <p>Known for: {
                        (media.known_for.length > 0 && `${media.known_for.map(kf => (
                            kf.media_type === "tv" ? kf.name : kf.title
                        )).join(", ")}.`) || "unknown"
                    }</p>
                </div>
            </div>
        ))
    )
}
