import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

const Header = ({ client, currentUser, setCurrentUser }) => {
  const navigate = useNavigate();

  const logout = () => {
    client
      .post("/user_api/logout")
      .then(function (res) {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
        navigate("/home");
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const profile = () => {
    navigate("/profile");
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <AppBar id="appbar" position="static">
      <Toolbar sx={{ paddingTop: 2 }}>
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

        <Typography
          id="header-title"
          variant="h6"
          component="div"
          sx={{ flexGrow: 3 }}
        >
          <p>Young Explorer </p>
        </Typography>
        {currentUser != null ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button id="logout-btn" onClick={logout}>
              Logout
            </Button>
            ,
            <Button id="profile-btn" onClick={profile}>
              Profile
            </Button>
          </Box>
        ) : (
          <Button id="login-btn" onClick={login}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
