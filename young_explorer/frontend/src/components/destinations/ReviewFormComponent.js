import React from "react";
import { FaStar } from "react-icons/fa";
import Button from "@mui/material/Button";

const ReviewFormComponent = ({
  show,
  setShow,
  rating,
  setRating,
  setReviewText,
  hoverRating,
  setHoverRating,
  handleSubmit,
  beenHere,
}) => {
  return (
    <div className="bottomContainer">
      {beenHere && (
        <Button id="reviewButton" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Leave a review"}
        </Button>
      )}

      {!beenHere && localStorage.getItem("superuser") === "false" && (
        <h3>You must have visited this destination to leave a review</h3>
      )}

      {show && beenHere && (
        <div className="ratingContainer">
          <div className="textContainer">
            <textarea
              id="reviewText"
              className="reviewText"
              placeholder="Write your review here!"
              onChange={(e) => setReviewText(e.target.value)}
            ></textarea>
          </div>
          {[...Array(5)].map((_, index) => {
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
                  color={
                    currentRating <= (hoverRating || rating) ? "gold" : "gray"
                  }
                  onMouseEnter={() => setHoverRating(currentRating)}
                  onMouseLeave={() => setHoverRating(null)}
                />
              </label>
            );
          })}
        </div>
      )}
      {show && beenHere && (
        <Button id="submitReview" onClick={handleSubmit}>
          Submit
        </Button>
      )}
    </div>
  );
};

export default ReviewFormComponent;
