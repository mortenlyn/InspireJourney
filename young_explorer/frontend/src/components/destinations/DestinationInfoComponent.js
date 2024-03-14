import React from "react";
import DestinationCard from "../DestinationCard";
import DestinationDescription  from "../DesitinationDescription";

const DestinationInfoComponent = ({ destination, name }) => {
  return (
    <div className="Destination__container">
               <ul className="Destination__items">
      <DestinationDescription
            name = {"Description of " + name}
            className  = "destination-description"
            text={destination.description}
          ></DestinationDescription>
          </ul>
      <div className="destination__wrapper">
        <ul className="Destination__items">
          <DestinationCard
            name={"Weather in  " + name}
            text={"Vær kommer!!"}
            label="Description"
            query={"rain"}
            className = "destination-description"
          ></DestinationCard>
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
