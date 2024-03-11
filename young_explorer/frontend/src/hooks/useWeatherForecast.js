

import React, { useEffect, useState } from "react";


const GetWeatherForecast = (props) => {
    const [weatherForecasted, setWeatherForecasted] = useState({});
    const ApiKey = "87f53d1b7701110d4c5d697f13aa465b";
    let url = `api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=${ApiKey}`

    useEffect(() => {fetch(url)
    .then(res => res.json())
    .then(data => {
        setWeatherForecasted(data);
        console.log(data);
        }
    )
    }, []);
    
    return(
        <div>
            {<h1>{weatherForecasted ? JSON.stringify(weatherForecasted) : "Loading"}</h1>}
        </div>
    );
}

export default GetWeatherForecast;