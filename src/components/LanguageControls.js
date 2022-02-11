import * as ICONS from '../constants/icons'

const LanguageControls = ({language, setLanguage}) => {
    return (
        <div className="max-w-screen-md mx-auto py-4 flex gap-1">
            <div 
                className={`ml-auto cursor-pointer p-1 rounded ${language === "en-US" && "bg-gray-300"}`}
                onClick={() => language !== "en-US" && setLanguage("en-US")}>
                {ICONS.FLAG_US}
            </div>
            <div 
                className={`cursor-pointer p-1 rounded ${language === "pt-BR" && "bg-gray-300"}`}
                onClick={() => language !== "pt-BR" && setLanguage("pt-BR")}>
                {ICONS.FLAG_BR}
            </div>
        </div>
    )
}

export default LanguageControls