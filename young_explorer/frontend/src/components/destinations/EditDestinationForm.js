import React, { useEffect } from "react";
import { useState } from "react";
import useGetLabels from "../../hooks/useGetLabels";
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
import { Link, useParams } from "react-router-dom";

function EditDestinationForm() {
  const { name } = useParams();
  const [attraction, setAttraction] = useState({});
  const [attractionDescription, setAttractionDescription] = useState("");
  const [attractionFood, setAttractionFood] = useState("");
  const [attractionActivity, setAttractionActivity] = useState("");
  const [attractionHousing, setAttractionHousing] = useState("");
  const [price, setPrice] = useState(null);
  const [selected, setSelected] = useState([]);
  const { labels, loading, error } = useGetLabels();

  const [attractionFoodError, setAttractionFoodError] = useState(false);
  const [attractionActivityError, setAttractionActivityError] = useState(false);
  const [attractionHousingError, setAttractionHousingError] = useState(false);

  const [attractionDescriptionError, setAttractionDescriptionError] =
    useState(false);
  const [priceError, setPriceError] = useState(false);

  useEffect(() => {
    if (!name) {
      return;
    }
    const url = `http://127.0.0.1:8000/attractions_api/attraction/?attraction_name=${name}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setAttraction(data.Attraction);
        setAttractionDescription(data.Attraction.description);
        setAttractionFood(data.Attraction.food_description);
        setAttractionActivity(data.Attraction.activity_description);
        setPrice(data.Attraction.price);
        setAttractionHousing(data.Attraction.housing_description);
        setSelected(data.Attraction.labels);
      });
  }, [name]);

  const handlePriceChange = (event) => {
    const value = event.target.value;
    setPrice(value);
    setPriceError(false);
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
  };

  const handleAttractionSubmit = () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        description: attractionDescription,
        price: price,
        labels: selected,
        food_description: attractionFood,
        housing_description: attractionHousing,
        activity_description: attractionActivity,
      }),
    };
    fetch("http://127.0.0.1:8000/attractions_api/addAttraction", requestOptions)
      .then((res) => {
        if (res.status >= 400 && res.status < 600) {
          alert("The response didn't work");
        } else {
          alert("The destination was edited succesfully");
        }
        return res.json();
      })
      .then((data) => console.log(data));
  };

  const LabelsMenuArray = labels.map((label) => (
    <MenuItem key={label.id} value={label.name}>
      {label.name}
    </MenuItem> // Adjust based on your actual label object structure
  ));

  
  return(
    <div>
      <br></br><br></br>
      <h1>Edit {attraction.name}</h1>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
        m={2}
      >
        {attraction && attraction.price ?
        <Grid item xs={12} sm={6}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <TextField
                label="Destination Description"
                multiline // Set multiline to true
                fullWidth
                rows={4} // Specify the number of rows (optional)
                onChange={handleAttractionDescriptionChange}
                error={attractionDescriptionError}
                defaultValue={attraction.description}
                helperText={
                  attractionDescriptionError && "Enter attraction description"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Destination Activities"
                multiline // Set multiline to true
                fullWidth
                rows={4} // Specify the number of rows (optional)
                onChange={handleAttractionActivityChange}
                error={attractionActivityError}
                defaultValue={attraction.activity_description}
                helperText={
                  attractionActivityError && "Enter attraction activites"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Destination Food"
                multiline // Set multiline to true
                fullWidth
                rows={4} // Specify the number of rows (optional)
                onChange={handleAttractionFoodChange}
                error={attractionFoodError}
                defaultValue={attraction.food_description}
                helperText={attractionFoodError && "Enter attraction food"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Destination Housing"
                multiline // Set multiline to true
                fullWidth
                rows={4} // Specify the number of rows (optional)
                onChange={handleAttractionHousingChange}
                error={attractionHousingError}
                helperText={attractionHousingError && "Enter attraction housing"}
                defaultValue={attraction.housing_description}
              />
            </Grid>
            <Grid item xs={12} onChange={handlePriceChange}>
              <TextField
                label="Price"
                fullWidth
                required
                error={priceError}
                defaultValue={attraction.price}
                helperText={
                  priceError && "Enter price (must be a positive number)"
                }
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="demo-mutiple-chip-label">
                Select Labels:{" "}
              </InputLabel>
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
                {
                  LabelsMenuArray /*Displays all the menu-items which are the labels fetched from the database*/
                }
              </Select>
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }} size="large">
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/home"
                style={{ marginRight: "10%" }}
              >
                Go to homepage
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAttractionSubmit}
              >
                Edit Destination
              </Button>
            </Grid>
          </Grid>
        </Grid> : <p>loading</p>}
      </Grid>
    </div>
  );
}

export default EditDestinationForm;
