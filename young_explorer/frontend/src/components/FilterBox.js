import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Input,
  Chip,
  InputLabel,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import useGetLabels from "../hooks/useGetLabels";
import CardItem from "./Card_Item";
import GetAllAttractions from "./GetAllAttractions";
import "./FilterBox.css";
import { FaSlidersH } from "react-icons/fa";
import AdBox from "./AdBox";

export default function FilterBox(props) {
  const [price, setPrice] = useState({ min: "", max: "" });
  const [selectedLabels, setSelectedLabels] = useState([]);
  const { labels, loading, error } = useGetLabels();
  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [filterApplied, setFilterApplied] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [removeVisited, setRemoveVisited] = useState(false);
  const [showFilterBox, setShowFilterBox] = useState(false);
  let url = `http://127.0.0.1:8000/attractions_api/filter/?`;

  const averageReview = (destinationReviews) => {
    if (destinationReviews.length === 0) {
      return 0; // Return 0 if there are no reviews
    }
    const totalRating = destinationReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return totalRating / destinationReviews.length;
  };

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

  const handleSearchName = (event) => {
    setSearchName(event.target.value);
  };

  const handleRemoveVisited = (event) => {
    setRemoveVisited(event.target.checked);
    console.log(event.target.checked);
  };

  const handleFilterButton = () => {
    if (price) {
      url += "min_price=" + price.min + "&max_price=" + price.max;
    }
    if (selectedLabels) {
      url += `&label_names=${selectedLabels.join(",")}`;
    }

    if (searchName) {
      url += "&search_name=" + searchName;
    }
    if (removeVisited === true) {
      const username = props.currentUser.username;
      console.log(username);
      url += `&username=${username}`;
    }
    fetch(url)
      .then((res) => res.json())
      .then(async (data) => {
        const attractionsWithRatings = await Promise.all(
          data.map(async (attraction) => {
            const response = await fetch(
              `http://127.0.0.1:8000/attractions_api/getDestinationReviews/?destination=${attraction.name}`
            );
            const reviewData = await response.json();

            const averageRating = averageReview(reviewData.ReviewList);
            console.log(averageRating);
            return { ...attraction, averageRating };
          })
        );
        setFilteredAttractions(attractionsWithRatings);
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

  const CardItemArray = filteredAttractions.map((attraction, iteration) => {
    return (
      <>
        <CardItem
          key={iteration}
          label="Destination"
          name={attraction.name}
          currentUser={props.currentUser}
          averageRating={attraction.averageRating}
          text={attraction.description}
        />
        {filteredAttractions.length > 2 && (iteration + 1) % 4 === 0 ? (
          <AdBox />
        ) : filteredAttractions.length === 2 && iteration === 1 ? (
          <AdBox />
        ) : filteredAttractions.length === 1 ? (
          <AdBox />
        ) : null}
      </>
    );
  });

  return (
    <div style={{backgroundColor: "var(--background-color)"}}>
      {/* Toggle the visibility of filter_box when filter_button is clicked */}
      
      {props.currentUser ? <div
        className="filter_button"
        onClick={() => setShowFilterBox(!showFilterBox)}
      >
        <FaSlidersH id="sliderIcon" />
        <p id="filterText">Filter</p>
      </div> : <></>}
      <div
        className={`filter_box ${showFilterBox ? "show" : ""}`}
        style={{
          display: showFilterBox ? "block" : "none",
          width: "95%",
          justifyContent: "center",
          margin: "0 auto",
          boxShadow: "0 6px 20px rgba(56, 125, 255, 0.17)",
          marginBottom: "40px",
          borderRadius: "10px",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            padding: "30px",
            backgroundColor: "rgba(207, 190, 169, 0.506)",
            borderRadius: "10px",
          }}
        >
          <h3
            style={{
              textAlign: "center",
              marginBottom: "20px",
              marginTop: "10px",
              color: "var(--primary-text-color)",
              fontSize: "1.8em",
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
            <Grid item xs={9}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={removeVisited}
                    onChange={handleRemoveVisited}
                    name="Remove destinations"
                    color="primary"
                  />
                }
                label="Remove visited destinations"
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                label="Search for destination"
                fullWidth
                helperText={"Enter search information"}
                onChange={handleSearchName}
              />
            </Grid>
            <Grid item xs={9} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleFilterButton}
                style={{ width: 100 }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
      <div style={{backgroundColor: "var(--background-color)"}}>
        <br></br>
        <h1 style={{color: "var(--primary-text-color)"}}>Check out these destinations!</h1>
        {CardItemArray.length > 0 && filteredAttractions ? (
          <div className="cards_container">
            {CardItemArray}
          </div>
        ) : !filterApplied ? (
          <GetAllAttractions currentUser={props.currentUser} />
        ) : (
          <p>Your criteria doesn't match any</p>
        )}
      </div>
    </div>
  );
}
