import "./App.css";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import Image from "./components/Image";
import UsePictureApiCall from "./components/UsePictureApiCall";
import UseLocationDataApi from "./components/UseLocationDataApi";
import AttractionsComponent from "./components/UseAttractionsApi";

function App() {
  /*const [location, setLocation] = useState([]);*/
  const accessKey = "Em95bnVmDx7hcIaMtSUDScOLEoQe7JnykrXnRDLOpeU";
  const query = "paris";
  const locationData = UsePictureApiCall(query);

  return (
    <div className="App">
      <Header />
      <p>MY APP</p>
      {locationData.results && locationData.results.length > 0 ? (
        <Image
          imageUrl={locationData.results[0].urls.regular}
          description={locationData.results[0].description}
        />
      ) : (
        <h1>"Loading..."</h1>
      )}
      <AttractionsComponent countryCode = "JP" city = "Tokyo"/>
      
    </div>
  );
}

export default App;
