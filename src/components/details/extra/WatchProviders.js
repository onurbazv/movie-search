import { BASE_LOGO_PATH, NOT_FOUND_IMAGE } from "../../../constants/config"

const WatchProviders = ({providers}) => {
    return (
        <>
            <p className="text-lg font-medium mt-4">Watch Providers:</p>
            <div className="w-full grid grid-cols-4 gap-2 mt-2">
                {providers.map((provider, index) => (
                    <div key={index}>
                        <img 
                            className="rounded mb-1 mx-auto"
                            src={provider.logo_path ? BASE_LOGO_PATH.replace("PATH", provider.logo_path) : NOT_FOUND_IMAGE} 
                            alt={`${provider.provider_name} poster`}/>
                        <p className="text-sm text-center">{provider.provider_name || provider.provider_id}</p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default WatchProviders