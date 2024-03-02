import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import ReviewContainer from "./ReviewContainer";

function ProfilePage({ currentUser }) {
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/attractions_api/getUserReviews/?username=" +
        currentUser.username
    )
      .then((res) => res.json())
      .then((data) => setUserReviews(data.ReviewList));
  }, []);

  const userReviewsMap = userReviews.map((review) => {
    return (
      <ReviewContainer
        key={review.review_id}
        attraction_name={review.attraction_name}
        rating={review.rating}
        date_created={review.date_created}
        review={review.review}
      />
    );
  });

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
            {localStorage.getItem("superuser") === "true" ? (
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
      {localStorage.getItem("superuser") === "false" && (
        <div>
          <h1>These are all the reviews the user have made</h1>
          {userReviews.length > 0 && userReviews ? (
            userReviewsMap
          ) : (
            <p>The user hasn't made any reviews</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
