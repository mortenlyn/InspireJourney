import React, {Component} from "react";
import CardItem from "./Card_Item";
import './Destination_box.css';
import {Route, Routes, Link } from "react-router-dom";
import Button from "@mui/material/Button";
import London from "./destinations/London";
import Paris from "./destinations/Paris";
import Bali from "./destinations/Ireland";
import Ireland from "./destinations/Bali"


const Destination_box = () => {
  return (
    <div className="Destination">
      <h1>Check out these destinations!</h1>
      <div className="Destination__container">
        <div className="destination__wrapper">
          <ul className="Destination__items">
          <Button color="inherit" component={Link} to="/Paris" >
            <CardItem 
              name="Paris" 
              text="Paris: Explore the historic city of love"
              label="City"
              >
              </CardItem>
            </Button>
            <Button color="inherit" component={Link} to="/Paris" >
              <CardItem 
                name="London" 
                text="London: A bustling city full of exitement"
                label="City"
                >
                </CardItem>
             </Button>
            <Button color="inherit" component={Link} to="/Paris" >
              <CardItem 
                name="Bali" 
                text="Bali: Visit the beutiful waters of Bali"
                label="Beach"
                >
                <Button color="inherit" component={Link} to="/Bali" >Login</Button>
                </CardItem>
             </Button>
            <Button color="inherit" component={Link} to="/Paris" >
              <CardItem 
                name="Ireland" 
                text="Ireland: Nothing is like seeing the stunning cliffs on the coast"
                label="Nature"
                >
                <Button color="inherit" component={Link} to="/Ireland" >Login</Button>
                </CardItem>
            </Button>
          </ul>
        </div>
      </div>
    </div>
  );
  <Routes>
    <Route 
            path="/Paris"
            element = {<Paris />}
            />   
    <Route 
            path="/London"
            element = {<London />}
            />
    <Route 
            path="/Bali"
            element = {<Bali />}
            />a
    <Route 
            path="/Ireland"
            element = {<Ireland />}
            />
  </Routes>
};

export default Destination_box;
