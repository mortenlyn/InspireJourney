import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Home from "../components/pages/Home";
import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import AddAttraction from "../components/pages/AddAttraction"
import GetAllAttractions from "../components/GetAllAttractions";
import Profile from "../components/ProfilePage";

const AppRoutes = ({ client, currentUser, setCurrentUser }) => {
  return (
    <Router>
      <Header
        client={client}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
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
        <Route
        path="/addAttraction/*"
        element={<AddAttraction />}
        />
        <Route
        path="/testDestinations/*"
        element={<GetAllAttractions/>}
        />
        <Route
          path="/profile/*"
          element={<Profile client={client} currentUser={currentUser} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
