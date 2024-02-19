import { useState, useEffect } from "react";

const useCurrentUser = (client) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  useEffect(() => {
    if (!currentUser) {
      client
        .get("/user_api/user")
        .then(function (res) {
          localStorage.setItem("currentUser", JSON.stringify(res.data.user));
          localStorage.setItem("superuser", JSON.stringify(res.data.superuser));
          setCurrentUser(res.data.user);
        })
        .catch(function (error) {
          setCurrentUser(null);
          console.log(error);
          localStorage.removeItem("currentUser");
        });
    }
  }, [client]);

  return [currentUser, setCurrentUser];
};

export default useCurrentUser;
