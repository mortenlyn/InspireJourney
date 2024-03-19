import React from "react";
import "./DestinationBox.css";

function DestinationDescription(props) {
  return (
    <>
      <li className="description_item">
        <div className="cards_item_box">
          <div className="cards__item__info">
            <h5 id="destination-description" className="cards__item__text">
              {props.name}
            </h5>
            <p id="description-text">{props.text}</p>
          </div>
        </div>
      </li>
    </>
  );
}

export default DestinationDescription;
