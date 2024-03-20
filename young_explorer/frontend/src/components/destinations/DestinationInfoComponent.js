import React from "react";
import DestinationCard from "../DestinationCard";
import DestinationDescription from "../DesitinationDescription";
import DestinationsWeather from "../WeatherComponent";

const DestinationInfoComponent = ({ destination, name }) => {
  return (
    <div className="Destination__container">
      <ul className="Description_container">
        <DestinationDescription
          name={"Description of " + name}
          className="destination-description"
          text={destination.description}
        ></DestinationDescription>
      </ul>
      <div className="destination__wrapper">
        <ul className="Destination__items">
          <DestinationsWeather name={name}></DestinationsWeather>
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
            query={name + " trips"}
          ></DestinationCard>
        </ul>
      </div>
    </div>
  );
};

export default DestinationInfoComponent;
