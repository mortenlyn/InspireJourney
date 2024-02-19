import "./App.css";
// import { Button } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useCurrentUser from "./hooks/useCurrentUser";
import AppRoutes from "./routes/AppRoutes";
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
