import React from "react";
import Destination_box from "../Destination_box";
import Header_section from "../header-section";
import "../../App.css";
import Header from "../Header";

function Home(props) {
  return  (
    <div>
      <Header_section/>;
      <Destination_box currentUser={props.currentUser}/>;
    </div>
    
   );
}

export default Home;
