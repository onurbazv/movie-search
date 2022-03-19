import { useEffect, useState } from 'react'
import { STAR_EMPTY, STAR_FILLED } from '../../../constants/icons'
import { STRINGS } from '../../../constants/strings'

const Ratings = ({language, voteCount, voteAverage, ...props}) => {
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
    }, [voteAverage])

    return (
        <div className="font-medium text-lg" {...props}>
            <p>{STRINGS[language]['DETAILS_VOTE_AVG']}: <span className="text-base font-normal">{voteAverage} ({voteCount} {language === "pt-BR" ? 'votos' : 'votes'})</span></p>
            <div className="mt-1 text-yellow-500 flex">
                {stars}
            </div>
        </div>
    )
}

export default Ratings