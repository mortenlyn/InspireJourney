import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfilePage.css";
import ReviewContainer from "./ReviewContainer";
import DestinationProfilePage from "./destinations/DestinationProfilePage";

function ProfilePage({ currentUser }) {
  const [userReviews, setUserReviews] = useState([]);
  const [visitedDestinations, setVisitedDestinations] = useState([]);

  /*This useEffect fetches all the reviews the user have made*/
  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/attractions_api/getUserReviews/?username=" +
        currentUser.username
    )
      .then((res) => res.json())
      .then((data) => setUserReviews(data.ReviewList));
  }, []);

  /*This useEffect fetches all the destinations the user has visited*/
  useEffect(() => {
    const url = `http://127.0.0.1:8000/attractions_api/getAttractionsVisitedByUser/?username=${currentUser.username}`;
    if(localStorage.getItem("superuser") === "false"){
    fetch(url)
      .then((res) => res.json())
      .then((data) => setVisitedDestinations(data));
    }
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

  const visitedDestinationsList = visitedDestinations.map((attraction, index) => (
    <div key={index}>
      <DestinationProfilePage name={attraction.name} key={attraction.id}/>
      <br></br>
    </div>
  ));

  if (!currentUser) {
    return (
      <div>
        <h1>You are not logged in</h1>
        <p id="login-txt">Use login button in right corner</p>
      </div>
    );
  }
  return (
    // La til en div rundt ProfilePage slik at det ikke blir en hvit stripe nederst på profile-siden ved darkmode
    <div style={{marginBottom: "-100px"}}>
      <div className="ProfilePage">
        <div>
          <div className="profile-card">
            <h1 id="UserProfileTitle">Your profile</h1>
            <div id="userImageBox">
              <img id="userImage" src="./travelyoung.jpg" style={{width: 200}}></img>
            </div>
            <div className="profile-info">
              <p className="user-info-email">
                <strong>Email:</strong> {currentUser.email}
              </p>
              {localStorage.getItem("superuser") === "true" ? (
                <>
                  <p className="user-info-paragraph">
                    You're logged in as an admin.
                  </p>
                  <p className="user-info-paragraph">
                    You can add destinations to the website by clicking the "+" button in the dropdown menu.
                  </p>
                </>
              ) : (
                <p className="user-info-email">
                  <strong>Name:</strong> {currentUser.username}
                </p>
              )}
            </div>
          </div>
        </div>
        {localStorage.getItem("superuser") === "false" && (
          <div>
            <div className="Reviews_Visited">
              <h1>Your reviews</h1>
              {userReviews.length > 0 && userReviews ? (
                userReviewsMap
              ) : (
                <p>You haven't made any reviews</p>
              )}
            </div>
            <div className="Reviews_Visited">
              <h1>Your destinations</h1>
              <br></br>
              {visitedDestinationsList.length > 0 && visitedDestinations ? (
                visitedDestinationsList
              ) : (
                <p>No visited destinations</p>
              )}
            </div>
          </div>
        )}
        <Link to="/home">
            <button id="homebutton" style={{marginBottom: "50px"}}>Return to homepage</button>
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
