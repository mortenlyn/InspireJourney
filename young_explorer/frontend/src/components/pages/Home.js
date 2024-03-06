import React from "react";
import DestinationBox from "../DestinationBox";
import Header_section from "../header-section";
import "../../App.css";

function Home(props) {
  return  (
    <div>
      <Header_section/>;
      <DestinationBox currentUser={props.currentUser}/>;
    </div>
    
   );
}

export default Home;

