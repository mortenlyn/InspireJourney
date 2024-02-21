import React from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";

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
    <div className="ProfilePage">
      <div className="profile-card">
        <h2>User Profile</h2>
        <div className="profile-info">
          <p>
            <strong>Email:</strong> {currentUser.email}
          </p>
          {localStorage.getItem("superuser") == "true" ? (
            <>
              <p>You're logged in as an admin.</p>
              <p>
                You can add destinations to the website by clicking the "+"
                button in the header.
              </p>
            </>
          ) : (
            <p>
              <strong>Name:</strong> {currentUser.username}
            </p>
          )}
          {}
        </div>
        <Link to="/home">
          <button id="homebutton">Return to homepage</button>
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
