import React, { useState } from "react";
import {
  FormControl,
  FormGroup,
  InputLabel,
  Input,
  Grid,
  TextField,
  Button,
  OutlinedInput,
} from "@mui/material";

export default function AddAttraction() {
  const [attractionDescription, setAttractionDescription] = useState("");
  const [attractionID, setAttractionID] = useState("");
  const [price, setPrice] = useState(null);

  const handlePriceInput = (event) => {
    const value = event.target.value;
    const checkIfInt = "/^d*$/".test(
      value
    ); /*This regular experession ensures that the input is a field*/
    if (checkIfInt && parseInt(value) > 0) {
      setPrice(value);
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
            <TextField label="Attraction Name" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Attraction Description"
              multiline // Set multiline to true
              fullWidth
              rows={4} // Specify the number of rows (optional)
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Price" fullWidth onChange={handlePriceInput} />
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }} size="large">
            <Button variant="contained" color="primary">
              Create Attraction
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

/*



const [attractionName, setAttractionName] = useState("");
  const [attractionDescription, setAttractionDescription] = useState("");
  const [attractionID, setAttractionID] = useState("");
  const [price, setPrice] = useState(null);

  const handleAttractionDescription = (event) => {
    setAttractionDescription(event.target.value);
  }
  const handleName = (event) => {
    setAttractionName(event.target.value);
  }
  const handlePrice = (event) => {
    setAttractionName(event.target.value);
  }
  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(attractionName);
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Enter attraction name:
                <input type="text" onChange={handleName}></input>
            </label><br />
            <label>Enter description:
                <textarea onChange={handleAttractionDescription}></textarea>
            </label><br/>
            <label>Enter price:
                <input type="number" onChange={handlePrice}></input>
            </label><br/>
            <label>Submit form
                <input type="submit"></input>
            </label>
        </form>
    </div>
    );
*/
