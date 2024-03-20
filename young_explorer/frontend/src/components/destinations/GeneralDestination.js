import { React, useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import "./destinations.css";
import "./BeenHereButton.css";
import client from "../../api/apiClient";
import DestinationInfoComponent from "./DestinationInfoComponent";
import ReviewFormComponent from "./ReviewFormComponent";
import ReviewComponent from "./ReviewComponent";
import DestinationTopComponent from "./DestinationTopComponent";
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';


function GeneralDestination() {
  const { name } = useParams();
  const [rating, setRating] = useState(null);
  const [editedRating, setEditedRating] = useState(null);
  const [hoverRating, setHoverRating] = useState(null);
  const [hoverEditRating, setHoverEditRating] = useState(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [destinationReviews, setDestinationReviews] = useState([]);
  const [destination, setDestination] = useState([]);
  const [beenHere, setBeenHere] = useState(false); // Been here button is set to false by default
  const [editMode, setEditMode] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const username = currentUser.username;

  const handleToggleBeenhere = () => {
    if (beenHere) {
      if (
        window.confirm(
          "Are you sure you have not been here? Any review you've left will be deleted."
        ) == true
      ) {
        setBeenHere(!beenHere);
        handleDelete();
      } else {
        return;
      }
    }
    setBeenHere(!beenHere);
    const url = `http://127.0.0.1:8000/attractions_api/modifyVisitor/?username=${username}&attraction_name=${name}`;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        attraction_name: name,
      }),
    };
    fetch(url, requestOptions).then((res) => {
      if (res.status >= 400 && res.status < 600) {
        return res.json();
      } else {
        setBeenHere(!beenHere);
        return res.json();
      }
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const res = await client.post("/attractions_api/addReview", {
        user: currentUser,
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

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const renderAverageRating = () => {
    const average = averageReview();
    const integerPart = Math.floor(average); 
    const fractionalPart = average - integerPart; 
    const stars = [];
  
    for (let i = 0; i < integerPart; i++) {
      stars.push(<FaStar key={i} color="gold" />);
    }
  
    if (fractionalPart > 0) {
      stars.push(<FaStarHalfAlt key={integerPart} color="gold" />);
    }

    const totalStars = integerPart + (fractionalPart > 0 ? 1 : 0);
    for (let i = totalStars; i < 5; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} color="gray" />);
  }
  
  
    return stars;
  }

  const handleRatingChange = (newRating) => {
    setEditedRating(newRating);
  };

  const averageReview = () => {
    if (destinationReviews.length === 0) {
      return 0; // Return 0 if there are no reviews
    }

    const totalRating = destinationReviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / destinationReviews.length;
  }

  function getReviewId() {
    return client
      .get(`/attractions_api/getUserReviews/?username=${username}`)
      .then((res) => {
        let id;

        res.data.ReviewList.forEach((review) => {
          if (review.attraction_name === name) {
            id = review.review_id;
          }
        });

        return id;
      });
  }

  function handleSave(event) {
    event.preventDefault();

    getReviewId()
      .then((id) => {
        client
          .put("/attractions_api/editReview/" + id + "/", {
            review: document.getElementById("editReviewText").value,
            rating: editedRating,
          })
          .then((res) => {
            setReviewText(document.getElementById("editReviewText").value);
            setEditMode(false);

            // Update the state with the new review data
            const updatedReviews = destinationReviews.map((review) => {
              if (review.review_id === id) {
                return {
                  ...review,
                  review: document.getElementById("editReviewText").value,
                  rating: editedRating,
                };
              }
              return review;
            });

            setDestinationReviews(updatedReviews);
          })
          .catch((error) => {
            console.error(error);
            alert("You need to add a review and a rating to save changes");
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleDelete() {
    getReviewId().then((id) => {
      if (typeof id === "undefined") {
        return;
      }

      client.delete("/attractions_api/deleteReview/" + id + "/").then(() => {
        alert("Review successfully deleted");

        // Remove the deleted review from the state
        const updatedReviews = destinationReviews.filter(
          (review) => review.review_id !== id
        );
        setDestinationReviews(updatedReviews);
      });
    });
  }

  useEffect(() => {
    fetch(
      "http://127.0.0.1:8000/attractions_api/getDestinationReviews/?destination=" +
        name
    )
      .then((res) => res.json())
      .then((data) => setDestinationReviews(data.ReviewList));
  }, [rating, editedRating, showReviewForm, name]);

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
    if (!username) {
      return;
    }
    let beenHereUrl = `http://127.0.0.1:8000/attractions_api/getAttractionsVisitedByUser/?username=${username}`;
    fetch(beenHereUrl)
      .then((res) => res.json())
      .then((data) => {
        const visitedDestinations = data.map((destination) => destination.name);
        if (visitedDestinations.includes(name)) {
          setBeenHere(true);
        }
      });
  }, []);

  return (
    <div className="Destination">
      <DestinationTopComponent
        name={name}
        beenHere={beenHere}
        handleToggleBeenHere={handleToggleBeenhere}
      />

      <DestinationInfoComponent destination={destination} name={name} />

      <ReviewFormComponent
        show={showReviewForm}
        setShow={setShowReviewForm}
        rating={rating}
        setRating={setRating}
        setReviewText={setReviewText}
        hoverRating={hoverRating}
        setHoverRating={setHoverRating}
        handleSubmit={handleSubmit}
        beenHere={beenHere}
      />

      <div className="reviewDiv">
        <h2 style={{color: "var(--toggle-fg)"}}>Reviews</h2>
        <p style={{ fontSize: "20px" }}>
          Average Rating: {renderAverageRating()} (
          {Math.round(averageReview() * 10) / 10}
          /5)
        </p> 
        {destinationReviews.length > 0 ? (
          destinationReviews.map((review) => (
            <ReviewComponent
              key={review.review_id}
              reviewer={review.user_name}
              username={username}
              rating={review.rating}
              editedRating={editedRating}
              review={review.review}
              dateCreated={review.date_created}
              editMode={editMode}
              handleEdit={handleEdit}
              handleSave={handleSave}
              handleRatingChange={handleRatingChange}
              hoverEditRating={hoverEditRating}
              setHoverEditRating={setHoverEditRating}
            />
          ))
        ) : (
          <p>There are no reviews for this destination</p>
        )}
      </div>
    </div>
  );
}

export default GeneralDestination;
