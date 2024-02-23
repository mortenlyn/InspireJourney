import React, { useState } from "react";
import { Grid, TextField, Button, Select, MenuItem, Input, Chip, InputLabel} from "@mui/material";
import { Link } from "react-router-dom";

export default function AddAttraction() {
  const [attractionDescription, setAttractionDescription] = useState("");
  const [attractionName, setAttractionName] = useState("");
  const [price, setPrice] = useState(null);
  const [selected, setSelected] = useState([]);

  const [attractionNameError, setAttractionNameError] = useState(false);
  const [attractionDescriptionError, setAttractionDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false);

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

  const handleSelectedValues = (event) => {
    setSelected(event.target.value);
    console.log(event.target.value)
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

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
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
              <MenuItem value="Europe">Europe</MenuItem>
              <MenuItem value="Nature">Nature</MenuItem>
              <MenuItem value="City">City</MenuItem>
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
