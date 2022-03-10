const Footer = () => {
    return (
        <footer className="py-6 mt-auto bg-gray-300">
            <div className="max-w-screen-md mx-auto flex items-center">
                <div className="mr-auto">
                    © 2022 Bruno Azevedo
                </div>
                <a className="flex items-center" href="https://www.themoviedb.org/">
                    <p className="mr-4">Powered by TMDB API</p>
                    <img src="./img/tmdb-logo-full.svg" alt="TheMovieDB logo" className="w-12"/>
                </a>
            </div>
        </footer>
    )
}

export default Footer