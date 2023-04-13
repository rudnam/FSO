const Display = ({ toDisplay, options, showHandler }) => {
    
    if (toDisplay) {
        return (
            <div>
                <h2>{toDisplay.name.common}</h2>
                <br />
                <span>capital {toDisplay.capital[0]}</span><br />
                <span>area {toDisplay.area}</span><br />
                <br />
                <b>languages:</b> <br />
                <ul>
                    {Object.keys(toDisplay.languages).map((key, index) => (
                        <li key={index}>{toDisplay.languages[key]}</li>
                    ))}
                </ul>
                <img src={toDisplay.flags.png} alt={toDisplay.flags.alt}></img>
            </div>
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