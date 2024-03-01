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
    <div>
      <div className="ProfilePage">
        <div className="profile-card">
          <h2>User Profile</h2>
          <div className="profile-info">
            <p className="user-info-paragraph">
              <strong>Email:</strong> {currentUser.email}
            </p>
            {localStorage.getItem("superuser") == "true" ? (
              <>
                <p className="user-info-paragraph">
                  You're logged in as an admin.
                </p>
                <p className="user-info-paragraph">
                  You can add destinations to the website by clicking the "+"
                  button in the header.
                </p>
              </>
            ) : (
              <p className="user-info-paragraph">
                <strong>Name:</strong> {currentUser.username}
              </p>
            )}
          </div>
          <Link to="/home">
            <button id="homebutton">Return to homepage</button>
          </Link>
        </div>
      </div>
      {localStorage.getItem("superuser") == true ? <h>A admin doesn't have any reviews</h>: <h>Hey</h>}
    </div>
  );
}

export default ProfilePage;
