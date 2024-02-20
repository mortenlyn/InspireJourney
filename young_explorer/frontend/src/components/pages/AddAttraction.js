import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

export default function AddAttraction() {
  const [attractionDescription, setAttractionDescription] = useState("");
  const [attractionName, setAttractionName] = useState("");
  const [price, setPrice] = useState(null);

  const [errors, setErrors] = useState({}); // State to hold errors 

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const handleAttractionNameChange = (event) => {
    const value = event.target.value;
    setAttractionName(value);
  };

  const handleAttractionDescriptionChange = (event) => {
    const value = event.target.value;
    setAttractionDescription(value);
  };

  const handleAttractionButton = () => {
    // Validate form before submission
    const error = {};
    if (!attractionName.trim()) {
      errors.attractionName = "Attraction name is required";
    }
    if (!attractionDescription.trim()) {
      errors.attractionDescription = "Attraction description is required";
    }
    if (!price.trim()) {
      errors.price = "Price is required";
    } else if (isNaN(price) || parseFloat(price) <= 0) {
      errors.price = "Price must be a valid positive number";
    }

    if (Object.keys(errors).length == 0) {
      //If no errors, proceed with submission
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
        .then((res) => res.json())
        .then((data) => console.log(data));
    } else {
      //If there are errors, set them in the state
      setErrors(errors);
    }
    
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
              label="Attraction Name"
              fullWidth
              onChange={handleAttractionNameChange}
              error = {!!errors.attractionName}
              helperText = {errors.attractionName}
              // Anette - deleted required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Attraction Description"
              multiline // Set multiline to true
              fullWidth
              rows={4} // Specify the number of rows (optional)
              onChange={handleAttractionDescriptionChange}
              error = {!!errors.attractionDescription}
              helperText = {errors.attractionDescription}
            />
          </Grid>
          <Grid item xs={12} onChange={handlePriceChange}>
            <TextField 
              label="Price" 
              fullWidth 
              onChange={handlePriceChange}
              error = {!!errors.price}
              helperText = {errors.price}
              // Anette - deleted required 
              />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }} size="large">
            <Button
              variant="contained"
              color="primary"
              onClick={handleAttractionButton}
            >
              Create Attraction
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}