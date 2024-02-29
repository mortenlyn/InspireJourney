import React, { useState } from "react"
import { TextField,Grid } from "@mui/material";


function SearchForm(){
    const [searchName, setSearchName] = useState("");


    const handleChange = (event) => {
        setSearchName(event.target.value);
    };

    return (
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: '50vh' }}
        >
        <Grid item xs={12} style={{ width: '50%' }}>
            <TextField
            fullWidth
            label="Search destination"
            value={searchName}
            onChange={handleChange}
            variant="outlined"
            />
        </Grid>
        </Grid>
  );
}

export default SearchForm;