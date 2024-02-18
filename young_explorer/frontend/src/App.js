import "./App.css";
import Home from "./components/pages/Home";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import AppRoutes from "./AppRoutes";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

const client = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    client
      .get("/user_api/user")
      .then(function (res) {
        setCurrentUser(res.data);
      })
      .catch(function (error) {
        setCurrentUser(null);
        console.log(currentUser);
      });
  }, []);

  if (currentUser != null) {
    console.log(currentUser);
    return (
      <div className="App">
        <Router>
          <Header
            client={client}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <Home />
        </Router>
      </div>
    );
  }

  return (
    <div className="App">
      <Router>
        <Header
          client={client}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </Router>
      <AppRoutes
        client={client}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

export default App;
