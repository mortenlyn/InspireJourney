import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useCurrentUser from "./hooks/useCurrentUser";
import AppRoutes from "./routes/AppRoutes";
import client from "./api/apiClient"
import { DarkModeToggle } from "./components/DarkModeToggle";


function App() {
  const [currentUser, setCurrentUser] = useCurrentUser(client);
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <DarkModeToggle
        isChecked={isDark}
        handleChange={() => setIsDark(!isDark)}
      />
      <AppRoutes
        client={client}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

export default App;
