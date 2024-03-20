import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

const uncheckedSymbol = "☐";
const checkedSymbol = "☑";

const DestinationTopComponent = ({ name, beenHere, handleToggleBeenHere }) => {
  return (
    <div className="topContainer">
      <h1 style={{color: "var(--primary-text-color)"}}>Some information on {name}!</h1>
      <h3>
        Check out our other destinations <Link style={{color: "var(--toggle-fg)"}} to="/home">here.</Link>
      </h3>
      {localStorage.getItem("superuser") === "false" && (
        <div>
          <Button
            id="beenhere-btn"
            variant="contained"
            onClick={handleToggleBeenHere}
          >
            {beenHere
              ? `I've been here ${checkedSymbol}`
              : `Have you been here? ${uncheckedSymbol}`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default DestinationTopComponent;
