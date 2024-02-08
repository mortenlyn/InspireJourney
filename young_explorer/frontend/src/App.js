import "./App.css";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import Image from "./components/Image";
import UsePictureApiCall from "./components/UsePictureApiCall";

function App() {
  const [location, setLocation] = useState([]);
  const accessKey = "Em95bnVmDx7hcIaMtSUDScOLEoQe7JnykrXnRDLOpeU";
  const query = "tokyo";
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
    </div>
  );
}

export default App;
