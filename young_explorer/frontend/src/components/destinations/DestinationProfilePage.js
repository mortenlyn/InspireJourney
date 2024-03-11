import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const DestinationProfilePage = (props) => {
  const componentStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    maxWidth: "100%",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "5px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const nameStyle = {
    margin: 0,
    fontSize: "16px",
  };

  return (
    <div style={componentStyle}>
      <Button component={Link} to={"/Destination/" + props.name}>
        <h3 style={nameStyle}>{props.name}</h3>
      </Button>
    </div>
  );
};

export default DestinationProfilePage;
