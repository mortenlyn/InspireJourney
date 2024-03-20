import React from "react";
import { FaStar } from "react-icons/fa";
import Button from "@mui/material/Button";

const ReviewComponent = ({
  reviewer,
  username,
  rating,
  editedRating,
  review,
  dateCreated,
  editMode,
  handleEdit,
  handleSave,
  handleRatingChange,
  setHoverEditRating,
  hoverEditRating,
}) => {
  return (
    <div className="reviewContainer">
      {editMode && reviewer === username && (
        <>
          <Button id="cancelButton" onClick={handleEdit}>
            Cancel
          </Button>
          <Button id="saveEditButton" onClick={handleSave}>
            Save
          </Button>
          <p>Your previous rating was {rating} stars</p>
          <textarea id="editReviewText" />
          <div>
            {[...Array(5)].map((_, index) => {
              const currentRating = index + 1;
              return (
                (
                  <label key={currentRating}>
                    <input
                      type="radio"
                      name="rating"
                      value={currentRating}
                      onClick={() => handleRatingChange(currentRating)}
                    />
                    <FaStar
                      className="star"
                      size={20}
                      color={
                        currentRating <= (hoverEditRating || editedRating)
                          ? "gold"
                          : "gray"
                      }
                      onMouseEnter={() => setHoverEditRating(currentRating)}
                      onMouseLeave={() => setHoverEditRating(null)}
                    />
                  </label>
                )
              );
            })}
          </div>
        </>
      )}
      {!editMode && reviewer === username && (
        <>
          <Button id="editButton" onClick={handleEdit}>
            Edit
          </Button>
        </>
      )}
      {!editMode && (
        <>
          <small>Submitted by: {reviewer}</small>
          <p style={{ color: "#f5a623" }}>
            Rating: {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
          </p>
          <p>{review}</p>
          <small>Date created: {dateCreated}</small>
        </>
      )}
    </div>
  );
};

export default ReviewComponent;
