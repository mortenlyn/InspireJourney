import "./App.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useState();
  const [registrationToggle, setRegistrationToggle] = useState(false);

  const handleLogin = (data) => {
    client
      .post("/user_api/login", data)
      .then(function (res) {
        setCurrentUser(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRegister = (data) => {
    client
      .post("/user_api/register", data)
      .then(function (res) {
        client
          .post("/user_api/login", data)
          .then(function (res) {
            setCurrentUser(true);
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
    <div className="center">
      {registrationToggle ? (
        <RegisterForm
          registrationToggle={registrationToggle}
          onRegister={handleRegister}
        />
      ) : (
        <LoginForm
          registrationToggle={registrationToggle}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
