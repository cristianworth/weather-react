import React, { useState } from "react";

const api = {
  key: "85e4c272f8155a2ac15b6814103a4372",
  base: "http://api.openweathermap.org/data/2.5/weather",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

const changeBackground = () => {
  if (weather.main) {
    return (weather.main.temp > 20) ? "weather-warm" : "weather-cold";
  }
  return ""
}

  return (
    <div className={changeBackground()}>
        <main>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={search}
            ></input>
          </div>
          {weather.main && (
            <div className="info-box">
              <div className="location-box">
                <div className="location">
                  {weather.name}, {weather.sys?.country}
                </div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}°C</div>
                <div className="weather">{weather.weather[0].main}</div>
              </div>
            </div>
          )}
        </main>
    </div>
  );
}

export default App;
