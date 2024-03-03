import React, { useState, useEffect} from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Input,
  Chip,
  InputLabel,
} from "@mui/material";
import useGetLabels from "../hooks/useGetLabels";
import CardItem from "./Card_Item";
import GetAllAttractions from "./GetAllAttractions";

export default function FilterBox(props) {
  const [price, setPrice] = useState({ min: "", max: "" });
  const [selectedLabels, setSelectedLabels] = useState([]);
  const { labels, loading, error } = useGetLabels();
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  let url = `http://127.0.0.1:8000/attractions_api/filter/?`;

  
  const handleSelectedLabelsChange = (event) => {
    setSelectedLabels(event.target.value);
  };

  const handlePriceChange = (event) => {
    const { name, value } = event.target;
    setPrice((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFilterButton = () => {
    if (price) {
      url += "min_price=" + price.min + "&max_price=" + price.max;
    }
    if (selectedLabels) {
      url += `&label_names=${selectedLabels.join(",")}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setFilteredAttractions(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching attractions:", error);
      });
    setFilterApplied(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const LabelsMenuArray = labels.map((label) => (
    <MenuItem key={label.id} value={label.name}>
      {label.name}
    </MenuItem>
  ));

  const handleSearchButton = () => {};

  const CardItemArray = filteredAttractions.map((attraction, iteration) => {
    return (
      <CardItem
        key={iteration}
        label="Destination"
        name={attraction.name}
        currentUser={props.currentUser}
      />
    );
  });

  

  return (
    <div>
      <div>
        <div style={{ padding: "10px", backgroundColor: "#f5f5f5" }}>
          <h3
            style={{
              textAlign: "center",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            Filter content
          </h3>
          <Grid
            container
            spacing={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Grid item xs={3}>
              <InputLabel>Select Labels:</InputLabel>
              <Select
                multiple
                value={selectedLabels}
                onChange={handleSelectedLabelsChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip
                        key={value}
                        label={value}
                        style={{ margin: "2px" }}
                      />
                    ))}
                  </div>
                )}
                fullWidth
              >
                {LabelsMenuArray}
              </Select>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Min Price"
                fullWidth
                name="min"
                value={price.min}
                onChange={handlePriceChange}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Max Price"
                fullWidth
                name="max"
                value={price.max}
                onChange={handlePriceChange}
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={3} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleFilterButton}
              >
                Filter
              </Button>
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Search for destination"
                fullWidth
                helperText={"Enter search information"}
              />
            </Grid>
            <Grid item xs={3} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSearchButton}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>

      <div>
        <br></br>
        <h1>Check out these destinations!</h1>
        {CardItemArray.length > 0 && filteredAttractions ? (
          CardItemArray
        ) : (
          !filterApplied ? <GetAllAttractions currentUser ={props.currentUser}/> : <p>Your criteria doesn't match any</p>)
        }
      </div>
    </div>
  );
}
