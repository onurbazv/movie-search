import { ARROW_LEFT, ARROW_RIGHT } from "../constants/icons"
import { STRINGS } from '../constants/strings';

const PageControls = ({currentPage, totalPages, totalResults, setRequest, language, executeScroll}) => {
    const prevPage = () => {
        if (currentPage > 1) {
            setRequest(prev => ({
                ...prev,
                page: prev.page - 1
            }))
            executeScroll()
        }
    }
    const nextPage = () => {
        if (currentPage < totalPages) {
            setRequest(prev => ({
                ...prev,
                page: prev.page + 1
            }))
            executeScroll()
        }
    }

    return (
        <div>
            <div className="flex space-between items-center">
                <button 
                    className={`p-1 bg-gray-200 rounded ${currentPage === 1 && "cursor-not-allowed"}`}
                    onClick={prevPage}>
                    {ARROW_LEFT}
                </button>
                <div className="mx-auto">
                    <p className="text-center">
                    {STRINGS[language]['PAGE_CURRENT']
                        .replace("CURRENT", currentPage)
                        .replace('TOTAL', totalPages)}
                    </p>
                    <p>
                        {STRINGS[language]['PAGE_RESULTS']
                            .replace('MIN', (currentPage * 20) - 19)
                            .replace('MAX', currentPage * 20 > totalResults ? totalResults : currentPage * 20)
                            .replace('TOTAL', totalResults)}
                    </p>
                </div>
                <button 
                    className={`p-1 bg-gray-200 rounded ${currentPage === totalPages && "cursor-not-allowed"}`}
                    onClick={nextPage}>
                    {ARROW_RIGHT}
                </button>
            </div>
        </div>
    )
}

export default PageControls