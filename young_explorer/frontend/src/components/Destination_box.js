import React, { Component } from "react";
import CardItem from "./Card_Item";
import "./DestinationBox.css";
import GetAllAttractions from "./GetAllAttractions";
import { DarkModeToggle } from "./components/DarkModeToggle";



const Destination_box = (props) => {
  const [isDark, setIsDark] = useState(false);

  return (
    <div className="Destination">
      <h1>Check out these destinations!</h1>
      <div className="Destination__container">
        <div className="Destination__wrapper">
          <div className="Destination__items">
            <GetAllAttractions currentUser={props.currentUser} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destination_box;
