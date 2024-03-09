import React from "react";
import DestinationCard from "../DestinationCard";

const DestinationInfoComponent = ({ destination, name }) => {
  return (
    <div className="Destination__container">
      <div className="destination__wrapper">
        <ul className="Destination__items">
          <DestinationCard
            name={"Food in " + name}
            text={destination.food_description}
            label="Food"
            query={name + " food"}
          ></DestinationCard>
          <DestinationCard
            name={"Where to live in " + name}
            text={destination.housing_description}
            label="Housing"
            query={name + " house"}
          ></DestinationCard>
          <DestinationCard
            name={"What to do in " + name}
            text={destination.activity_description}
            label="What to do"
            query={name + " event"}
          ></DestinationCard>
        </ul>
      </div>
    </div>
  );
};

export default DestinationInfoComponent;
