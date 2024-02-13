import "./App.css";
import Button from "react-bootstrap/Button";
// import LoginForm from "./components/LoginForm";
import Destination_box from "./components/Destination_box";
import Home from "./components/pages/Home";
//import { Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import RegisterForm from "./components/RegisterForm";
import UsePictureApiCall from "./components/UsePictureApiCall";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useState();
  // const [registrationToggle, setRegistrationToggle] = useState(false);

  // const handleLogin = (data) => {
  //   client
  //     .post("/user_api/login", data)
  //     .then(function (res) {
  //       setCurrentUser(true);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  // const handleRegister = (data) => {
  //   client
  //     .post("/user_api/register", data)
  //     .then(function (res) {
  //       client
  //         .post("/user_api/login", data)
  //         .then(function (res) {
  //           setCurrentUser(true);
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    client
      .get("/user_api/user")
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        setCurrentUser(false);
      });
  }, []);

  function logout(e) {
    e.preventDefault();
    client
      .post("/user_api/logout", { withCredentials: true })
      .then(function (res) {
        setCurrentUser(false);
      });
  }

  if (currentUser) {
    return (
      <div>
        <Button onClick={logout} variant="light">
          Logout
        </Button>
        <div className="center">
          <h1>Welcome, {currentUser}</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
