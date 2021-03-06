import { useState } from 'react';

//I have hidden some chars in key. So please generate your own api key from https://home.openweathermap.org/api_keys

const api = {
  key: "6134bb58dfa21cd6855660d09f****cd",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          
          console.log(result)
        });
    }
  }

  const dateBuilder = (d) =>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
    //return `${date}`

  }
  return (
    <div className={
      (typeof weather.main != "undefined")
      ? ((weather.main.temp > 16)
      ? 'app warm'
      : 'app')
      : 'app'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value) }
            value = {query}
            onKeyPress ={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="icon">{(weather.dt > weather.sys.sunrise && weather.dt < weather.sys.sunset) ? <img src="https://img.icons8.com/color/48/000000/sun--v1.png"/> : <img src="https://img.icons8.com/color/48/000000/full-moon.png"/>}</div> 
            <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp)}??C
          </div>
          <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
