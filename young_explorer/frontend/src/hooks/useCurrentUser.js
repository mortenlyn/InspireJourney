import { useState, useEffect } from "react";

const useCurrentUser = (client) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    client
      .get("/user_api/user")
      .then(function (res) {
        setCurrentUser(res.data);
      })
      .catch(function (error) {
        setCurrentUser(null);
      });
  }, []);

  return [currentUser, setCurrentUser];
};

export default useCurrentUser;
