import React, { useEffect, useState } from "react";
import CardItem from "./Card_Item";
import AdBox from "./AdBox";
import "./DestinationBox.css";

export default function GetAllAttractions(props) {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/attractions_api/attractions")
      .then((res) => res.json())
      .then(async (data) => {
        const attractionsWithRatings = await Promise.all(
          data.AttractionList.map(async (attraction) => {
            const response = await fetch(
              `http://127.0.0.1:8000/attractions_api/getDestinationReviews/?destination=${attraction.name}`
            );
            const reviewData = await response.json();

            const averageRating = averageReview(reviewData.ReviewList);
            return { ...attraction, averageRating };
          })
        );

        setAttractions(attractionsWithRatings);
      });
  }, []);

  const averageReview = (destinationReviews) => {
    if (destinationReviews.length === 0) {
      return 0; // Return 0 if there are no reviews
    }
    const totalRating = destinationReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return totalRating / destinationReviews.length;
  };

  const CardItemArray = attractions.map((attraction, iteration) => {
    return (
      <>
        <CardItem
          key={attraction.attraction_id}
          label="Destination"
          name={attraction.name}
          text={attraction.description}
          currentUser={props.currentUser}
          averageRating={attraction.averageRating}
        />
        {attractions.length > 2 && (iteration + 1) % 4 === 0 ? (
          <AdBox />
        ) : attractions.length === 2 && iteration === 1 ? (
          <AdBox />
        ) : attractions.length === 1 ? (
          <AdBox />
        ) : null}
      </>
    );
  });

  return (
    <div className="cards_container">
      {attractions.length > 0 ? CardItemArray : "Loading..."}
    </div>
  );
}
