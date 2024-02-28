import React from "react";
import Destination_box from "../Destination_box";
import "../../App.css";
import Header from "../Header";
import TestImage from "../cropImage";

function Home(props) {
  return <TestImage currentUser={props.currentUser}/>;
  //return <Destination_box currentUser={props.currentUser}/>;
}

export default Home;

  