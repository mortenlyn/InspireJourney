import React, { useEffect, useState } from "react";
import CardItem from "./Card_Item";
import AdBox from "./AdBox";

export default function GetAllAttractions(props) {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/attractions_api/attractions")
      .then((res) => res.json())
      .then(async (data) => {
        const attractionsWithRatings = await Promise.all(
          data.AttractionList.map(async (attraction) => {
            const response = await fetch(`http://127.0.0.1:8000/attractions_api/getDestinationReviews/?destination=${attraction.name}`);
            const reviewData = await response.json();

            const averageRating = averageReview(reviewData.ReviewList);
            return { ...attraction, averageRating };
          })
        );

        setAttractions(attractionsWithRatings);
      });
  }, []);

  /*
    Fields from GET-Request (fetch)
    --------- 
    attraction_id: 23
    date_created: "2024-02-19"
    description: "This is paris"
    name:"Paris"
    price: 3000
    rating: 0
  */

  const averageReview = (destinationReviews) => {
    if (destinationReviews.length === 0) {
      return 0; // Return 0 if there are no reviews
    }
    const totalRating = destinationReviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / destinationReviews.length;
  }

  const CardItemArray = attractions.map((attraction, iteration) => {
    return (
      <>
        <CardItem
          key={attraction.attraction_id}
          label="Destination"
          name={attraction.name}
          text = {attraction.description}
          currentUser={props.currentUser}
          averageRating={attraction.averageRating}
        />
        {attractions.length > 2 && (iteration + 1) % 3 === 0 ? (<AdBox />)
          : (attractions.length === 2 && iteration === 1) ? (<AdBox />) 
          : (attractions.length === 1) ? (<AdBox />)
          : (null)
        }
      </>
    );
  });

  return (
    <div>{attractions.length > 0 ? CardItemArray : "Loading..."}</div>
  );
}
