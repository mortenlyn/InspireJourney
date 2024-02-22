import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  return (
    <AppBar id="appbar" position="static">
            <Toolbar sx={{ paddingTop: 2 }} >
                {/*Inside the IconButton, we 
                    can render various icons*/}
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    {/*This is a simple Menu 
                      Icon wrapped in Icon */}
                    <MenuIcon />
                </IconButton>
                {/* The Typography component applies 
                     default font weights and sizes */}
 
                <Typography id="header-title"
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 3 }}
                >
                    <p>Young Explorer </p>
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
  );
};

export default Header;
