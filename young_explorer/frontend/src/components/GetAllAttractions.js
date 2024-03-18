import React, { useEffect, useState } from "react";
import CardItem from "./Card_Item";
import "./DestinationBox.css";

export default function GetAllAttractions(props) {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/attractions_api/attractions")
      .then((res) => res.json())
      .then((data) => setAttractions(data.AttractionList));
  }, []);

  const CardItemArray = attractions.map((attraction) => {
    return (
      <CardItem
        key={attraction.attraction_id}
        label="Destination"
        name={attraction.name}
        text={attraction.description}
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
