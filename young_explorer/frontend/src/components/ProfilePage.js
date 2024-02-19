import React from "react";
import { Link } from "react-router-dom";

function ProfilePage({ currentUser }) {
  if (!currentUser) {
    return (
      <div>
        <h1>You are not logged in</h1>
        <p id="login-txt">Use login button in right corner</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Profile Page</h2>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>Name:</strong> {currentUser.username}
      </p>

      <Link to="/home">
        <button id="homebutton">Return to homepage</button>
      </Link>
    </div>
  );
}

export default ProfilePage;
