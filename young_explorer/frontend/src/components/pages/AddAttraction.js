import React, { useState } from "react";
import { Grid, TextField, Button, Select, MenuItem, Input, Chip, InputLabel} from "@mui/material";
import { Link } from "react-router-dom";
import useGetLabels from "../../hooks/useGetLabels";

export default function AddAttraction() {
  const [attractionDescription, setAttractionDescription] = useState("");
  const [attractionFood, setAttractionFood] = useState("");
  const [attractionActivity, setAttractionActivity] = useState("");
  const [attractionHousing, setAttractionHousing] = useState("");
  const [attractionName, setAttractionName] = useState("");
  const [price, setPrice] = useState(null);
  const [selected, setSelected] = useState([]);


  const [attractionFoodError, setAttractionFoodError] = useState(false);
  const [attractionActivityError, setAttractionActivityError] = useState(false);
  const [attractionHousingError, setAttractionHousingError] = useState(false);

  const [attractionNameError, setAttractionNameError] = useState(false);
  const [attractionDescriptionError, setAttractionDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const { labels, loading, error } = useGetLabels();

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
    setPriceError(false);
  };

  const handleAttractionNameChange = (event) => {
    const value = event.target.value;
    setAttractionName(value);
    setAttractionNameError(false);
  };

  const handleAttractionDescriptionChange = (event) => {
    const value = event.target.value;
    setAttractionDescription(value);
    setAttractionDescriptionError(false);
  };

  const handleAttractionFoodChange = (event) => {
    const value = event.target.value;
    setAttractionFood(value);
    setAttractionFoodError(false);
  };

  const handleAttractionActivityChange = (event) => {
    const value = event.target.value;
    setAttractionActivity(value);
    setAttractionActivityError(false);
  };


  const handleAttractionHousingChange = (event) => {
    const value = event.target.value;
    setAttractionHousing(value);
    setAttractionHousingError(false);
  };



  const handleSelectedValues = (event) => {
    setSelected(event.target.value);
  }

  const handleAttractionButton = () => {
    let hasError = false;

    if (!attractionName.trim()) {
      setAttractionNameError(true);
      hasError = true;
    }
    if (!attractionDescription.trim()) {
      setAttractionDescriptionError(true);
      hasError = true;
    }
    if (!attractionActivity.trim()) {
      setAttractionActivityError(true);
      hasError = true;
    }
    if (!attractionFood.trim()) {
      setAttractionFoodError(true);
      hasError = true;
    }
    if (!attractionHousing.trim()) {
      setAttractionHousingError(true);
      hasError = true;
    }

    if (!isNaN(price) && parseFloat(price) > 0) {
      // price is a number
      if (price > 0) {
          // price is positive
          setPriceError(false); 
      } else {
          // price is not positive
          setPriceError(true);
          hasError = true;
      }
    } else {
      // price is not a number
      setPriceError(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: attractionName,
        description: attractionDescription,
        price: price,
        rating: 0,
        labels: selected,
        food_description: attractionFood,
        housing_description: attractionHousing,
        activity_description: attractionActivity
      }),
    };
    fetch("http://127.0.0.1:8000/attractions_api/addAttraction", requestOptions)
    .then((res) => {
      if (res.status >= 400 && res.status < 600) {
        alert("The form name must be unique, and the price and name must be filled. Therefore the destination was not added");
      }
      else{
        alert("The destination was succesfully added")
      }
      return res.json();
    }).then((data) => console.log(data));
  };

  const LabelsMenuArray = labels.map((label) => (
    <MenuItem key={label.id} value={label.name}>{label.name}</MenuItem> // Adjust based on your actual label object structure
  ))

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh"}}
      m={2}
    >
      <Grid item xs={12} sm={6}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <TextField
              label="Destination Name"
              fullWidth
              onChange={handleAttractionNameChange}
              required
              error = {attractionNameError}
              helperText = {attractionNameError && "Enter attraction name"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Destination Description"
              multiline // Set multiline to true
              fullWidth
              rows={4} // Specify the number of rows (optional)
              onChange={handleAttractionDescriptionChange}
              error = {attractionDescriptionError}
              helperText = {attractionDescriptionError && "Enter attraction description"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Destination Activities"
              
              multiline // Set multiline to true
              fullWidth
              rows={4} // Specify the number of rows (optional)
              onChange={handleAttractionActivityChange}
              error = {attractionActivityError}
              helperText = {attractionActivityError && "Enter attraction activites"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Destination Food"
              multiline // Set multiline to true
              fullWidth
              rows={4} // Specify the number of rows (optional)
              onChange={handleAttractionFoodChange}
              error = {attractionFoodError}
              helperText = {attractionFoodError && "Enter attraction food"}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Destination Housing"
              multiline // Set multiline to true
              fullWidth
              rows={4} // Specify the number of rows (optional)
              onChange={handleAttractionHousingChange}
              error = {attractionHousingError}
              helperText = {attractionHousingError && "Enter attraction housing"}
            />
          </Grid>
          <Grid item xs={12} onChange={handlePriceChange}>
            <TextField 
              label="Price" 
              fullWidth 
              required
              error = {priceError}
              helperText = {priceError && "Enter price (must be a positive number)"}
            />
          </Grid>
          <Grid item xs={12} >
            <InputLabel id="demo-mutiple-chip-label">Select Labels: </InputLabel>
            <Select
            multiple
            value={selected}
            onChange={handleSelectedValues}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) => (
              <div>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </div>
            )}
            >
              {LabelsMenuArray /*Displays all the menu-items which are the labels fetched from the database*/}
            </Select>

            
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }} size="large">
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to = "/home"
              style={{marginRight:"10%"}}
            >
              Go to homepage
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAttractionButton}
            >
              Create Destination
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

}
