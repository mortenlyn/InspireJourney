import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Home from "./components/pages/Home";
import RegisterForm from "./components/RegisterForm";

const AppRoutes = ({ client, currentUser, setCurrentUser }) => {
  return (
    <Router>
      <Routes>
        <Route
          path="*"
          element={
            <LoginForm client={client} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/home/*"
          element={
            <Home
              client={client}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/login/*"
          element={
            <LoginForm client={client} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          path="/register/*"
          element={
            <RegisterForm client={client} setCurrentUser={setCurrentUser} />
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
