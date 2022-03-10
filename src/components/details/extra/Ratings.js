import { useEffect, useState } from 'react'
import { STAR_EMPTY, STAR_FILLED } from '../../../constants/icons'

const Ratings = ({voteCount, voteAverage, ...props}) => {
    const [stars, setStars] = useState([])

    useEffect(() => {
        const tempArr = []
        for (let i = 0; i < Math.round(voteAverage); i++) {
            tempArr.push(<div key={tempArr.length}>{STAR_FILLED}</div>)
        }
        while (tempArr.length < 10) {
            tempArr.push(<div key={tempArr.length}>{STAR_EMPTY}</div>)
        }
        setStars(tempArr)
    }, [])

    return (
        <div className="font-medium text-lg" {...props}>
            <p>Vote Average: <span className="text-base font-normal">{voteAverage} ({voteCount} votes)</span></p>
            <div className="mt-1 text-yellow-500 flex">
                {stars}
            </div>
        </div>
    )
}

export default Ratings