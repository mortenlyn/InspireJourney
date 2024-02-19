import "./App.css";
import React from "react";
import AppRoutes from "./routes/AppRoutes";
import useCurrentUser from "./hooks/useCurrentUser";
import Profile from "./components/ProfilePage"
import client from "./api/apiClient";

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
