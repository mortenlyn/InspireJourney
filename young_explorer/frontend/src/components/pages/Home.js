import React, { useState } from "react";
import Destination_box from "../Destination_box";
import "../../App.css";
import Header from "../Header";
import Filter_box from "../filter_by_labels";

function Home(props) {
  // Define filteredAttractions state
  const [filteredAttractions, setFilteredAttractions] = useState([]);

  // Define a function to update filteredAttractions
  const updateFilteredAttractions = (attractions) => {
    setFilteredAttractions(attractions);
  };

  return (
    <div>
      {/* Render Filter_box component and pass updateFilteredAttractions as a prop */}
      <Filter_box setFilteredAttractions={updateFilteredAttractions} />

      {/* Render Destination_box component and pass filteredAttractions as a prop */}
      <Destination_box
        currentUser={props.currentUser}
        filteredAttractions={filteredAttractions}
      />
    </div>
  );
}

export default Home;



/*import React from "react";
import Destination_box from "../Destination_box";
import "../../App.css";
import Header from "../Header";
import Filter_box from "../filter_by_labels";

function Home(props) {
  return (
  <div>
    <Filter_box/>
    <Destination_box currentUser={props.currentUser}/>
  </div>
  
  );
}

export default Home;*/
