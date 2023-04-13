import { useState, useEffect } from 'react'
import axios from 'axios'
import Display from './components/Display'

function App() {
  const [query, setQuery] = useState(null)
  const [countries, setCountries] = useState(null)
  const [toShow, setToShow] = useState([])

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        setCountries(response.data)
      })
  },[])

  useEffect(() => {
    if (query) {
      setToShow(countries.filter(country => {
        return country.name.common.toLowerCase().includes(query.toLowerCase())
      }))
    }
  },[countries, query])

  const handleChange = (event) => {
    setQuery(event.target.value)
  }


  return (
    <div>
      <span>find countries</span> <input onChange={handleChange}></input>
      <Display toShow={toShow} />
    </div>
  );
}

export default App;
