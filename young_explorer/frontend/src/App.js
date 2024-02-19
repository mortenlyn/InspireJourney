import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useCurrentUser from "./hooks/useCurrentUser";
import AppRoutes from "./routes/AppRoutes";
import client from "./api/apiClient"


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
