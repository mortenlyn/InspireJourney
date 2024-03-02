import React, { useState, useEffect } from "react";
import { Grid, TextField, Button, Select, MenuItem, Input, Chip, InputLabel } from "@mui/material";
import useGetLabels from "../hooks/useGetLabels";

export default function FilterBox() {
    const [price, setPrice] = useState({ min: "", max: "" });
    const [selectedLabels, setSelectedLabels] = useState([]);
    const { labels, loading, error } = useGetLabels();

    const handleSelectedLabelsChange = (event) => {
        setSelectedLabels(event.target.value);
    };

    const handlePriceChange = (event) => {
        const { name, value } = event.target;
        setPrice(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFilterButton = () => {
        // Add logic for filtering
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const LabelsMenuArray = labels.map((label) => (
        <MenuItem key={label.id} value={label.name}>{label.name}</MenuItem>
    ));

    return (
        <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Filters</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <InputLabel>Select Labels:</InputLabel>
                    <Select
                        multiple
                        value={selectedLabels}
                        onChange={handleSelectedLabelsChange}
                        input={<Input id="select-multiple-chip" />}
                        renderValue={(selected) => (
                            <div>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} style={{ margin: "2px" }} />
                                ))}
                            </div>
                        )}
                        fullWidth
                    >
                        {LabelsMenuArray}
                    </Select>
                </Grid>
                <Grid item xs={6}>
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
                <Grid item xs={6}>
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
                <Grid item xs={12} style={{ textAlign: "center" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFilterButton}
                    >
                        Filter
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
