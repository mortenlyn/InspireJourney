import "./App.css";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import UsePictureApiCall from "./components/UsePictureApiCall";

function App() {

  return (
    <div className="App">
      <Header />
      <UsePictureApiCall query={"tokyo street"}/>  
    </div>
  );
}

export default App;