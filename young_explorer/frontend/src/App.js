import "./App.css";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import Image from "./components/Image";
import UsePictureApiCall from "./components/UsePictureApiCall";
import UseAttractionsApi from "./components/UseAttractionsApi";

function App() {
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
      <UseAttractionsApi countryCode = "JP" city = "Tokyo"/>
      
    </div>
  );
}

export default App;
