import { useState, useEffect } from 'react'
import axios from 'axios'

function Country({country}){
  const [showDetails, setShowDetails] = useState(false);
  const toggleDetails = (country) => (e) =>{
    setShowDetails(!showDetails);
    console.log("Toggled details of ", country.name.common, " to ", showDetails);
  }
  return(
    <li key={country.name.common}>{country.name.common} <button onClick={toggleDetails(country)}>{showDetails ? "Hide" : "Show"}</button>
      <br/>
      {showDetails ? <CountryDetails country={country}/> : null}
      </li>
  )
}

function CountryDetails({country}){  
  const [localWeather, setLocalWeather] = useState(
    {
      temperature: null,
            humidity: null,
            wind: {
              speed:null,
              deg:null
            },
            iconURL: null,
            description: null
    }
  );

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        
        const weatherObject = {
          temperature: response.data.main.temp,
          humidity: response.data.main.humidity,
          wind: {
            speed:response.data.wind.speed,
            deg:response.data.wind.deg
          },
          iconURL: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
          description: response.data.weather[0].description
        };

        setLocalWeather(weatherObject);
      })
  }, [])

  // let countryWeather = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm&appid=88feb90f08e25b27f8648206b13d6859`
  return(
    <div>
      <h1>{country.name.common}</h1>
      <h3>Capital:  {country.capital}</h3>
      <h3>Area:  {country.area}</h3>
      <strong>Languages</strong>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png}/>

      <h2>Weather</h2>
      <p><em><strong>{localWeather.description}</strong></em></p>
      <img src={localWeather.iconURL}></img>
      <p>temperature {localWeather.temperature}</p>
      <p>humidity {localWeather.humidity}</p>
      <p>wind Speed {localWeather.wind.speed}</p>
      <p>wind Degrees {localWeather.wind.deg}</p>
    </div>
  )
}

function CountryList({countries,filter}) {

  let sortedList = countries.filter(country => country.name.common.toLowerCase().includes(filter));

  const toggleDetails = (country) => (event) =>{
  }
  if(sortedList.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
  else if(sortedList.length === 1){
    return(
      sortedList.map(c => <CountryDetails country={c}/>)
    )
  }
  else if(sortedList.length === 0){
    return(
      <p>No Matches!</p>
    )
  }
  else{
    return(
      //regular view
      sortedList.map(c => <Country country={c}/>)
    )
  }
}
function App() {
  const [countries, setCountries] = useState([]);
  const [filter,setFilter] = useState(["sw"]);
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (e) =>{
    setFilter(e.target.value);
  }
  
  return (
    <div>
      <div className="search">
        <label htmlFor="search">find countries</label>
        <input value={filter} onChange={handleFilterChange} ></input>
      </div>

      <ul>
        <CountryList countries={countries} filter={filter}/>
      </ul>
    </div>
  );
}

export default App;
