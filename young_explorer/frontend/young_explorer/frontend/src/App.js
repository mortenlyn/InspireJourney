import "./App.css";
// import { Button } from "react-bootstrap";
import LoginForm from "./components/LoginForm";
import Home from "./components/pages/Home";
import React, { useEffect, useState } from "react";
import RegisterForm from "./components/RegisterForm";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    client
      .get("/user_api/user")
      .then(function (res) {
        setCurrentUser(res.data);
        setIsAuthenticated(true);
      })
      .catch(function (error) {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated) {
    console.log(currentUser);
    return (
      <Router>
        <div className="App">
          <Home />
        </div>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <LoginForm
              client={client}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route path="/home/*" element={<Home />} />
        <Route
          path="/login/*"
          element={
            <LoginForm
              client={client}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
        <Route
          path="/register/*"
          element={
            <RegisterForm
              client={client}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
