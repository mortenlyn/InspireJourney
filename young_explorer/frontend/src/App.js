import "./App.css";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import UsePictureApiCall from "./components/UsePictureApiCall";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {

  return (
    <Router>
      <div className="App">
        <Header />
      <UsePictureApiCall query={"tokyo street"}/>  
      </div>
    </Router>
  );
}

export default App;