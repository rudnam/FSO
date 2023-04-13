import CountryInfo from "./CountryInfo"

const Display = ({ toDisplay, options, showHandler }) => {
    
    if (toDisplay) {
        return (
            <CountryInfo country={toDisplay} />
        )
    } else if (options.length > 10) {
        return (
            <div>
                <span>Too many matches, specify another filter</span>
            </div>
        )
    } else {
        return (
            <div>
                {options.map((country, index) => (
                    <span key={index}>{country.name.common} <button onClick={() => showHandler(country)}>show</button><br /></span>
                ))}
            </div>
        )
    }

}

export default Display