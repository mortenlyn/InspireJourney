import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";

export default function AddAttraction() {
  const [attractionDescription, setAttractionDescription] = useState("");
  const [attractionName, setAttractionName] = useState("");
  const [price, setPrice] = useState(null);

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

  const test = {};

  const handleAttractionButton = () => {
    if (!attractionName.trim()) {
      test.attractionName = "Required"
      alert("Please enter attraction name");
      return;
    }
    if (!attractionDescription.trim()) {
      alert("Please enter attraction description");
      return;
    }
    if (!price) {
      alert("Please enter price");
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
      .then((res) => res.json())
      .then((data) => console.log(data));
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
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Attraction Description"
              multiline // Set multiline to true
              fullWidth
              rows={4} // Specify the number of rows (optional)
              onChange={handleAttractionDescriptionChange}
            />
          </Grid>
          <Grid item xs={12} onChange={handlePriceChange}>
            <TextField label="Price" fullWidth required />
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