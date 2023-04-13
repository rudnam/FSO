import { useState, useEffect } from 'react'
import axios from 'axios'


const CountryInfo = ({ country }) => {
    const [weather, setWeather] = useState(null)
    const api_key = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
          .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital[0]}&aqi=no`)
          .then(response => {
            setWeather(response.data)
          })
    })
    if (!weather) {
        return null
    }
    return (
        <div>
            <h1>{country.name.common}</h1>
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
            <h3>Weather in {country.capital[0]}</h3>
            <span>temperature {weather.current.temp_c} Celsius</span> <br />
            <img src={weather.current.condition.icon} alt={weather.current.condition.text}></img> <br />
            <span>wind {weather.current.wind_kph} kph</span> <br />
        </div>
    )
}

export default CountryInfo