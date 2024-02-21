import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import Home from "../components/pages/Home";
import RegisterForm from "../components/RegisterForm";
import Header from "../components/Header";
import AddAttraction from "../components/pages/AddAttraction";
import GetAllAttractions from "../components/GetAllAttractions";
import London from "../components/destinations/London";
import Paris from "../components/destinations/Paris";
import Bali from "../components/destinations/Ireland";
import Ireland from "../components/destinations/Bali";
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
            <Home
              client={client}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          }
        />
        <Route
          path="/home/*"
          element={
            // endre når ferdig
            <AddAttraction
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
        <Route path="/addAttraction/*" element={<AddAttraction />} />
        <Route path="/testDestinations/*" element={<GetAllAttractions />} />
        <Route path="/Paris" element={<Paris />} />
        <Route path="/London" element={<London />} />
        <Route path="/Bali" element={<Bali />} />a
        <Route path="/Ireland" element={<Ireland />} />
        <Route
          path="/profile/*"
          element={<Profile client={client} currentUser={currentUser} />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
