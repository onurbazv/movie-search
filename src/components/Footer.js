import { STRINGS } from "../constants/strings"

const Footer = ({language}) => {
    return (
        <footer className="py-6 mt-auto bg-gray-300">
            <div className="max-w-screen-md mx-auto flex items-center">
                <div className="mr-auto">
                    © 2022 Bruno Azevedo
                </div>
                <a className="flex items-center" href="https://www.themoviedb.org/">
                    <p className="mr-4">{STRINGS[language]['ATTRIBUTION']} TMDB API & JustWatch</p>
                    <img src="./img/tmdb-logo-full.svg" alt="TheMovieDB logo" className="w-12 mr-2"/>
                    <img src="./img/just-watch-logo-2.png" alt="Just Watch logo" className="w-10 rounded"/>
                </a>
            </div>
        </footer>
    )
}

export default Footer