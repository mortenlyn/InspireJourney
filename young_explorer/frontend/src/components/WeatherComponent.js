import { useState, useEffect } from "react";
import weatherAPI from "../api/weatherAPI";
import "./WeatherComponent.css";
import Rain from "../assets/Rain.svg";
import Snow from "../assets/Snow.svg";
import Clear from "../assets/Clear.svg";
import fewclouds from "../assets/fewclouds.svg";
import Thunderstorm from "../assets/Thunderstorm.svg";
import Clouds from "../assets/Clouds.svg";
import shrug from "../assets/shrug.svg";

function WeatherComponent(props) {
  const [weather, setWeather] = useState({});
  const kindsofweather = ["Rain", "Snow", "Clear", "Thunderstorm", "Clouds"];
  const weatherIcons = {
    Rain: Rain,
    Snow: Snow,
    Clear: Clear,
    Thunderstorm: Thunderstorm,
    Clouds: Clouds,
  };

  useEffect(() => {
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

    getWeather();
  }, []);

  return typeof weather.main != "undefined" ? (
    <>
      <div className="weather_item">
        <div className="weather_item_box">
          {Math.round(weather.main.temp) > 0 ? (
            <h1 id="weatherh1">
              Temperature:{" "}
              <span style={{ color: "red" }}>
                {Math.round(weather.main.temp)} °C{" "}
              </span>
            </h1>
          ) : (
            <h1 id="weatherh1">
              Temperature:{" "}
              <span style={{ color: "blue" }}>
                {Math.round(weather.main.temp)} °C{" "}
              </span>
            </h1>
          )}

          <h1 id="weatherh1">Condition: {weather.weather[0].main}</h1>
          <h1 id="weatherh1">Humidity: {weather.main.humidity} %</h1>
          <h1 id="weatherh1">Wind: {Math.round(weather.wind.speed)} m/s</h1>
          {weather.weather[0].description === "few clouds" ? (
            <img src={fewclouds} alt="Weather conditions" />
          ) : !kindsofweather.includes(weather.weather[0].main) ? (
            <>
              <img src={shrug} alt="Weather conditions" width="200" />
              <h1 id="weatherh1">
                Sorry, we don't have an icon for this weather
              </h1>
            </>
          ) : (
            <img
              src={weatherIcons[weather.weather[0].main]}
              alt="Weather conditions"
              width="200px"
            />
          )}
          <div className="weather_item_info">
            <h5 id="weather_text" className="weather_item_text">
              Weather in {props.name}
            </h5>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <li className="weather_item">
        <div className="weather_item_box">
          <h3>Weather in {props.name}</h3>
        </div>
      </li>
    </>
  );
}

export default WeatherComponent;
