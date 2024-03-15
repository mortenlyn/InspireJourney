import React, { useEffect, useState } from "react";
import CardItem from "./Card_Item";
import AverageRating from "./destinations/AverageRating";

export default function GetAllAttractions(props) {
  const [attractions, setAttractions] = useState([]);
  const [destinationReviews, setDestinationReviews] = useState([]);



  useEffect(() => {
    fetch("http://127.0.0.1:8000/attractions_api/attractions")
      .then((res) => res.json())
      .then(async (data) => {
        const attractionsWithRatings = await Promise.all(
          data.AttractionList.map(async (attraction) => {
            const response = await fetch(`http://127.0.0.1:8000/attractions_api/getDestinationReviews/?destination=${attraction.name}`);
            const reviewData = await response.json();

            const averageRating = averageReview(reviewData.ReviewList);
            console.log(`Avg rating ${attraction.name}:`, averageRating);
            return { ...attraction, averageRating };
          })
        );

        setAttractions(attractionsWithRatings);
      });
  }, []);



  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/attractions_api/attractions")
  //     .then((res) => res.json())
  //     .then((data) => setAttractions(data.AttractionList));
  // }, []);

  // const getTotalReviewScore = (name) => {
  //   // Return the fetch promise
  //   return fetch(
  //     `http://127.0.0.1:8000/attractions_api/getDestinationReviews/?destination=${name}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setDestinationReviews(data.ReviewList);
  //       return data.ReviewList; // Resolve the promise with the ReviewList
  //     });
  // };

  const averageReview = (destinationReviews) => {
    if (destinationReviews.length === 0) {
      return 0; // Return 0 if there are no reviews
    }
    const totalRating = destinationReviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / destinationReviews.length;
  }
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

  const CardItemArray = attractions.map((attraction) => {
    return (
      <CardItem
        key={attraction.attraction_id}
        label="Destination"
        name={attraction.name}
        currentUser={props.currentUser}
        averageRating={attraction.averageRating}
      />
    );
  });

  return (
    <div>{attractions.length > 0 ? CardItemArray : "Loading..."}</div>
  );
}
