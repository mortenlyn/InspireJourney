import { useState, useEffect } from "react";

const useCurrentUser = (client) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  useEffect(() => {
    if (!currentUser || currentUser != null) {
      client
        .get("/user_api/user")
        .then(function (res) {
          setCurrentUser(res.data);
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
        })
        .catch(function (error) {
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
        });
    }
  }, []);

  const setPersistedCurrentUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  };

  return [currentUser, setPersistedCurrentUser];
};

export default useCurrentUser;
