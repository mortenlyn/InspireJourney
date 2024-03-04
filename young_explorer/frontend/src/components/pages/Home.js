import React from "react";
import Destination_box from "../Destination_box";
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

