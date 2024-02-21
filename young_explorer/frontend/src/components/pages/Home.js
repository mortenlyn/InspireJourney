import React from "react";
import Destination_box from "../Destination_box";
import "../../App.css";
import Header from "../Header";

function Home(props) {
  return <Destination_box currentUser={props.currentUser}/>;
}

export default Home;
