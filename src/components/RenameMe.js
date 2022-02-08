import React from 'react';

export default function RenameMe({media}) {
    return (
        <p>
            {media.media_type === "movie" ? media.title : media.name}
        </p>
    )
}
