import React from "react";
import DestinationBox from "../DestinationBox";
import Header_section from "../header-section";
import "../../App.css";
import TestImage from "../cropImage";

function Home(props) {
  return <TestImage currentUser={props.currentUser}/>;
  //return  (
    <div>
      <Header_section/>;
      <DestinationBox currentUser={props.currentUser}/>;
    </div>
    
   );
}

export default Home;

  
