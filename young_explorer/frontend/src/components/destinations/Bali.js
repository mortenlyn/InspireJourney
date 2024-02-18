import React from "react";
import CardItem from "../Card_Item";
import './destinations.css';
import Button from "@mui/material/Button";


const Bali = () => {
  return (
    <div className="Destination">
      <h1>Some information on Bali!</h1>
      <div className="Destination__container">
        <div className="destination__wrapper">
          <ul className="Destination__items">
          <CardItem 
              name="Bali" 
              text="Bali is an island in Indonesia,  and Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
              label="Island"
              ></CardItem>
            <CardItem 
              name="What to do" 
              text="In Bali you can Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
              label="What to do"
              ></CardItem>
            <CardItem 
              name="Where to live" 
              text="Bali offers lots of housing for tourist, take Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
              label="Housing"
              ></CardItem>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Bali;