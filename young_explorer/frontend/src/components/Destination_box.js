import React, {Component} from "react";
import CardItem from "./Card_Item";
import './Destination_box.css';
import GetAllAttractions from "./GetAllAttractions";



const Destination_box = (props) => {
  return (
    <div className="Destination">
      <h1>Check out these destinations!</h1>
      <div className="Destination__container">
        <div className="destination__wrapper">
          <ul className="Destination__items">
            <GetAllAttractions currentUser={props.currentUser}/>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Destination_box;

/*
<Button color="inherit" component={Link} to="/Paris" >
            <CardItem 
              name="Paris" 
              text="Paris: Explore the historic city of love"
              label="City"
              >
              </CardItem>
            </Button>
            <Button color="inherit" component={Link} to="/London" >
              <CardItem 
                name="London" 
                text="London: A bustling city full of exitement"
                label="City"
                >
                </CardItem>
             </Button>
            <Button color="inherit" component={Link} to="/Ireland" >
              <CardItem 
                name="Bali" 
                text="Bali: Visit the beutiful waters of Bali"
                label="Beach"
                >
                </CardItem>
             </Button>
            <Button color="inherit" component={Link} to="/Bali" >
              <CardItem 
                name="Ireland" 
                text="Ireland: Nothing is like seeing the stunning cliffs on the coast"
                label="Nature"
                >
                </CardItem>
            </Button>
*/