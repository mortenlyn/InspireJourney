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

  useEffect(() => {
    client
      .get("/user_api/user")
      .then(function (res) {
        setIsAuthenticated(true);
      })
      .catch(function (error) {
        setIsAuthenticated(false);
      });
  }, [isAuthenticated]);

  if (isAuthenticated) {
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
          path="/login"
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

// function logout(e) {
//   e.preventDefault();
//   client
//     .post("/user_api/logout", { withCredentials: true })
//     .then(function (res) {
//       setIsAuthenticated(false);
//     });
// }
