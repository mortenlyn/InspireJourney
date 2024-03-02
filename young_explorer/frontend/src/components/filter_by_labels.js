import { Button, Grid } from "@mui/material"
import React, { useState } from "react";
import { Grid, TextField, Button, Select, MenuItem, Input, Chip, InputLabel} from "@mui/material";
import { Link } from "react-router-dom";
import useGetLabels from "../../hooks/useGetLabels";

const Filter_box = () => {
    return (
        <div className="Filter_box">
            <h1> Filters</h1>
            <div className="filter_components">
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
                            <TextField 
                                label="MinPrice" 
                                fullWidth 
                                required
                                helperText = {priceError && "Enter price (must be a positive number)"}
                                />
                            <TextField 
                                label="MaxPrice" 
                                fullWidth 
                                required
                                helperText = {priceError && "Enter price (must be a positive number)"}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}