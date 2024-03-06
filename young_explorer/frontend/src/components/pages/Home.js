import React from "react";
import Destination_box from "../DestinationBox";
import Header_section from "../header-section";
import "../../App.css";

function Home(props) {
  return  (
    <div>
      <Header_section/>;
      <Destination_box currentUser={props.currentUser}/>;
    </div>
    
   );
}

export default Home;

