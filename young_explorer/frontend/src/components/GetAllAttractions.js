import React, { useEffect, useState } from "react";
import CardItem from "./Card_Item";

export default function GetAllAttractions(props) {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/attractions_api/attractions")
      .then((res) => res.json())
      .then((data) => setAttractions(data.AttractionList));
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

  const CardItemArray = attractions.map((attraction) => {
    return (
      <CardItem
        key={attraction.attraction_id}
        label="Destination"
        name={attraction.name}
        currentUser={props.currentUser}
      />
    );
  });

  return (
    <div className="cards_container">
      {attractions.length > 0 ? CardItemArray : "Loading..."}
    </div>
  );
}
