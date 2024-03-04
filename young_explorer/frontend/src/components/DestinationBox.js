import React from "react";
import './DestinationBox.css';
import FilterBox from "./FilterBox";

const DestinationBox = (props) => {
  return (
    <div className="Destination">
      <div className="Destination__container">
        <div className="destination__wrapper">
          <ul className="Destination__items">
            <FilterBox currentUser={props.currentUser} />
          </ul>
        </div>
      </div>
    </div>
  );
};


export default DestinationBox;