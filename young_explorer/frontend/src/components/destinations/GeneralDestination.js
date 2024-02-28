import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import DestinationCard from "../DestinationCard";
import Button from "@mui/material/Button";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import TextArea from "@mui/material/TextField";
import "./destinations.css";

function GeneralDestination() {
  const { name } = useParams();
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [show, setShow] = useState(false);

  return (
    <div className="Destination">
      <div className="topContainer">
        <h1>Some information on {name}!</h1>
        <Button id="reviewButton" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Leave a review"}
        </Button>
        {show && (
          <div className="ratingContainer">
            <div className="textContainer">
              <TextArea className="reviewText">
                Write your review here!
              </TextArea>
            </div>
            {[...Array(5)].map((star, index) => {
              const currentRating = index + 1;
              return (
                <label>
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
          </div>
        )}
      </div>

      <h3>
        Check out our other destinations <Link to="/home">here.</Link>
      </h3>
      <div className="Destination__container">
        <div className="destination__wrapper">
          <ul className="Destination__items">
            <DestinationCard
              name={"Food in " + name}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
              label="Food"
              query={name + " food"}
            ></DestinationCard>
            <DestinationCard
              name={"Where to live in " + name}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
              label="Housing"
              query={name + " house"}
            ></DestinationCard>
            <DestinationCard
              name={"What to do in " + name}
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
              label="What to do"
              query={name + " event"}
            ></DestinationCard>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default GeneralDestination;
