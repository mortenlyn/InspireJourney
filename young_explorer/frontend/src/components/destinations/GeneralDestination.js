import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DestinationCard from "../DestinationCard";
import Button from "@mui/material/Button";
import { FaStar } from "react-icons/fa";
import "./destinations.css";
import "./BeenHereButton.css";
import client from "../../api/apiClient";

function GeneralDestination() {
  const { name } = useParams();

  //const beenhereText = BeenHere ? "I've been here" : "Have you been here?";

  const uncheckedSymbol = "☐";
  const checkedSymbol = "☑️";
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [show, setShow] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [destinationReviews, setDestinationReviews] = useState([]);
  const [destination, setDestination] = useState([]);
  const [BeenHere, setBeenHere] = useState(false); // Been here button is set to false by default
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const username = currentUser.username

  const handleToggleBeenhere = () => {
    setBeenHere(!BeenHere);
    const url = `http://127.0.0.1:8000/attractions_api/modifyVisitor/?username=${username}&attraction_name=${name}`

    const requestOptions={
    method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        attraction_name: name
      }),
    }
    fetch(url, requestOptions)
    .then((res) => {
      if (res.status >= 400 && res.status < 600) {
        return res.json();
      }
      else{
        setBeenHere(!BeenHere);
        return res.json();
      }
    })
  }; 

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await client.post("/attractions_api/addReview", {
        user: JSON.parse(localStorage.getItem("currentUser")),
        attraction: name,
        review: reviewText,
        rating: rating,
      });
      console.log(res);
      alert("Review successfully submitted");
      window.document.getElementById("reviewText").value = "";
      setReviewText("");
      setRating(null);
    } catch (error) {
      console.log(error);
      if (error.response.status === 409) {
        alert("You've already reviewed this destination!");
      } else {
        alert("Review not submitted!");
      }
    }
  }

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/attractions_api/getDestinationReviews/?destination=" +
        name
    )
      .then((res) => res.json())
      .then((data) => setDestinationReviews(data.ReviewList));
  }, [rating]);

  const ReviewContainer = (props) => {
    return (
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
          overflowWrap: "break-word",
        }}
      >
        <small>Submitted by: {props.reviewer}</small>
        <p style={{ color: "#f5a623" }}>
          Rating: {"★".repeat(props.rating)}
          {"☆".repeat(5 - props.rating)}
        </p>
        <p>{props.review}</p>
        <small>Date created: {props.date_created}</small>
      </div>
    );
  };

  const destinationReviewsMap = destinationReviews.map((review) => {
    return (
      <ReviewContainer
        key={review.review_id}
        attraction_name={review.attraction_name}
        reviewer={review.user_name}
        rating={review.rating}
        date_created={review.date_created}
        review={review.review}
      />
    );
  });
  

  useEffect(() => {
    if (!name) {
      return;
    }
    const url = `http://127.0.0.1:8000/attractions_api/attraction/?attraction_name=${name}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setDestination(data.Attraction);
      });
  }, [name]);

  useEffect(() => {
    if(!username){
      return;
    }
    let beenHereUrl = `http://127.0.0.1:8000/attractions_api/getAttractionsVisitedByUser/?username=${username}`
    fetch(beenHereUrl).then(res => res.json())
    .then((data) => {
      const visitedDestinations = data.map(destination => destination.name);
      if(visitedDestinations.includes(name)){
        setBeenHere(true)
      }
    });
  }, [])

  return (
    <div className="Destination">
      <div className="topContainer">
        <h1>Some information on {name}!</h1>
        <h3>
          Check out our other destinations <Link to="/home">here.</Link>
        </h3>
        <div>
          {" "}
          {}
          <Button
            id="beenhere-btn"
            variant="contained"
            onClick={handleToggleBeenhere}
          >
            {BeenHere
              ? `I've been here ${checkedSymbol}`
              : `Have you been here? ${uncheckedSymbol}`}
          </Button>
        </div>
      </div>

      <div className="Destination__container">
        <div className="destination__wrapper">
          <ul className="Destination__items">
            <DestinationCard
              name={"Food in " + name}
              text={destination.food_description}
              label="Food"
              query={name + " food"}
            ></DestinationCard>
            <DestinationCard
              name={"Where to live in " + name}
              text={destination.housing_description}
              label="Housing"
              query={name + " house"}
            ></DestinationCard>
            <DestinationCard
              name={"What to do in " + name}
              text={destination.activity_description}
              label="What to do"
              query={name + " event"}
            ></DestinationCard>
          </ul>
        </div>
      </div>
      <div className="bottomContainer">
        {localStorage.getItem("superuser") !== "true" && (
          <Button id="reviewButton" onClick={() => setShow(!show)}>
            {show ? "Hide" : "Leave a review"}
          </Button>
        )}
        {show && (
          <div className="ratingContainer">
            <div className="textContainer">
              <textarea
                id="reviewText"
                className="reviewText"
                placeholder="Write your review here!"
                onChange={(e) => setReviewText(e.target.value)}
              ></textarea>
            </div>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label key={currentRating}>
                  <input
                    type="radio"
                    name="rating"
                    value={currentRating}
                    onClick={() => setRating(currentRating)}
                  />
                  <FaStar
                    className="star"
                    size={30}
                    color={currentRating <= (hover || rating) ? "gold" : "gray"}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(null)}
                  />
                </label>
              );
            })}
            <p>Your rating is {rating}</p>
            <Button id="submitReview" onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        )}
      </div>
      <div className="reviewDiv">
        <h2>Reviews</h2>
        {destinationReviews.length > 0 ? (
          destinationReviewsMap
        ) : (
          <p>There are no reviews for this destination</p>
        )}
      </div>
    </div>
  );
}

export default GeneralDestination;
