import "./App.css";
import Header from "./components/Header";
import Destination_box from "./components/Destination_box";
import Home from './components/pages/Home';
//import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
import UsePictureApiCall from "./components/UsePictureApiCall";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddAttraction from "./components/pages/AddAttraction";

function App() {

  return (
      <div className="App">
        <AddAttraction />
      </div>
  );
}

export default App;