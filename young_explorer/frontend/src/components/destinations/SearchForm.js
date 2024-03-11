import React, { useEffect, useState } from "react";
import { TextField, Grid, Button } from "@mui/material";
import CardItem from "../Card_Item";

export default function SearchForm(props) {
  const [searchName, setSearchName] = useState("");
  const [destinations, setDestinations] = useState([]);
  const firstUrlPart =
    "http://127.0.0.1:8000/attractions_api/filter/?search_name=";

  useEffect(() => {
    const fetchDestinations = () => {
      fetch("" + firstUrlPart + searchName)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setDestinations(data);
        })
        .catch((error) => {
          console.error("Failed to fetch destinations:", error);
        });
    };

    fetchDestinations();
  }, [searchName]);

  const handleChange = (event) => {
    setSearchName(event.target.value);
  };

  const CardItemArray = destinations.map((attraction, index) => {
    return (
      <CardItem
        key={index}
        label="Destination"
        name={attraction.name}
        currentUser={props.currentUser}
      />
    );
  });

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "50vh" }}
      >
        <Grid item xs={12} style={{ width: "50%" }}>
          <TextField
            fullWidth
            label="Search destination"
            value={searchName}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} style={{ width: "50%" }}>
          <Button variant="contained" color="primary">
            Search for destinations
          </Button>
        </Grid>
      </Grid>
      <div>{destinations.length > 0 ? CardItemArray : "Loading..."}</div>
    </div>
  );
}
