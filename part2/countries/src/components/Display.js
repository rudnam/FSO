const Display = ({ toShow }) => {
    
    if (toShow.length === 1) {
        const country = toShow[0]
        return (
            <div>
                <h2>{country.name.common}</h2>
                <br />
                <span>capital {country.capital[0]}</span><br />
                <span>area {country.area}</span><br />
                <br />
                <b>languages:</b> <br />
                <ul>
                    {Object.keys(country.languages).map((key, index) => (
                        <li key={index}>{country.languages[key]}</li>
                    ))}
                </ul>
                <img src={country.flags.png} alt={country.flags.alt}></img>
            </div>
        )
    } else if (toShow.length > 10) {
        return (
            <div>
                <span>Too many matches, specify another filter</span>
            </div>
        )
    } else {
        return (
            <div>
                {toShow.map((country, index) => (
                    <span key={index}>{country.name.common}<br /></span>
                ))}
            </div>
        )
    }

}

export default Display