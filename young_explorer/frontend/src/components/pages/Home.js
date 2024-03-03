import React, { useState } from "react";
import Destination_box from "../Destination_box";
import "../../App.css";
import FilterBox from "../FilterBox";

function Home(props) {

  return (
    <div>
      <Destination_box currentUser={props.currentUser}/>
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
