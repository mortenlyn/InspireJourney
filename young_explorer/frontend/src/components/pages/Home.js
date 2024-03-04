import React from "react";
import DestinationBox from "../DestinationBox";
import "../../App.css";

function Home(props) {
  return (
    <div>
      <DestinationBox currentUser={props.currentUser} />
    </div>
  );
}

export default Home;

