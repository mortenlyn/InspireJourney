import React from "react";
import CardItem from "../Card_Item";
import './destinations.css';
import Button from "@mui/material/Button";
import Header from "../Header"


function Paris() {
  return (
    <div className="Destination">
      <h1>Some information on Paris!</h1>
      <div className="Destination__container">
        <div className="destination__wrapper">
          <ul className="Destination__items">
          <CardItem 
              name="Paris" 
              text="Paris is the capital of France,  and Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
              label="City"
              ></CardItem>
            <CardItem 
              name="What to do" 
              text="In Paris you can Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
              label="What to do"
              ></CardItem>
            <CardItem 
              name="Where to live" 
              text="Paris offers lots of housing for tourist, take Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "
              label="Housing"
              ></CardItem>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Paris;