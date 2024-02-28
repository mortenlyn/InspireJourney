import React, { useEffect, useState } from "react";
//import CardItem from "./Card_Item";
import ImageItem from "./imageItem";

export default function GetAllAttractions(props) {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/attractions_api/attractions")
      .then((res) => res.json())
      .then((data) => setAttractions(data.AttractionList));
  }, []);

  const ImageItemArray = attractions.map((attraction) => {
    return (
      <ImageItem
        key={attraction.attraction_id}
        label="Destination"
        name={attraction.name}
        currentUser={props.currentUser}
      />
    );
  });

  return (
    <div>{attractions.length > 0 ? ImageItemArray : "Loading..."}</div>
  );
}
