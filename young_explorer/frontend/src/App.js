import "./App.css";
// import { Button } from "react-bootstrap";
import LoginForm from "./components/LoginForm";
import Home from "./components/pages/Home";
import React, { useEffect, useState } from "react";
import UsePictureApiCall from "./components/UsePictureApiCall";
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddAttraction from "./components/pages/AddAttraction";
import RegisterForm from "./components/RegisterForm";
import axios from "axios";
/*import { BrowserRouter as Router, Route, Routes } from "react-router-dom";*/

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useCurrentUser(client);

  return (
    <div className="App">
      <AppRoutes
        client={client}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

export default App;
