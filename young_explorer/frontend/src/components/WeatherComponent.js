import { useState } from "react";
import weatherAPI from "../api/weatherAPI";
import "./WeatherComponent.css";
import rain from "../assets/rain.jpg"

function WeatherComponent(props) {
  const [weather, setWeather] = useState({});

  const getWeather = async () => {
    fetch(
      `${weatherAPI.base}weather?q=${props.name}&units=metric&APPID=${weatherAPI.key}`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeather(data);
        console.log(weather);
      });
  };

  return typeof weather.main != "undefined" ? (
    <>
      <li className="weather_item">
        <div className="weather_item_box">
          <h3>Weather in {props.name}</h3>
          <button id="myButton" onClick={getWeather}>
            Get Weather
          </button>
          <h2>Temperature: {Math.round(weather.main.temp)} °C</h2>
          <h2>Condition: {weather.weather[0].main}</h2>
          <h2>Humidity: {weather.main.humidity} %</h2>
          <h2>Wind: {Math.round(weather.wind.speed)} m/s</h2>
        
         
          {weather.weather[0].main == "Rain" ? (
            <>
              <img src={rain} alt="High Humidity" />
              <p>Its raining ing {props.name}, you should bring and umbrella!</p>
            </>
          ) : null}

           {weather.weather[0].main == "Thunderstorm" ? (
            <>
              <img src={rain} alt="High Humidity" />
              <p>Its raining ing {props.name}, you should bring and umbrella!</p>
            </>
          ) : null}

          </div>
      </li>
    </>
  ) : (
    <>
      <li className="weather_item">
        <div className="weather_item_box">
          <h3>Weather in {props.name}</h3>
          <button id="myButton" onClick={getWeather}>
            Get Weather
          </button>
        </div>
      </li>
    </>
  );
}

export default WeatherComponent;
