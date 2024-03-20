import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { FaRegUserCircle } from "react-icons/fa";
import './header.css';

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

  const addAttraction = () => {
    navigate("/addAttraction");
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
  };

  const NoToggleMenu = () => {
      setIsMenuOpen();
  };

  return (
    <AppBar id="appbar" position="static">
      <Toolbar sx={{paddingTop: 3}}>
        <Typography 
          id="header-title"
          variant="h6"
          component="div"
          sx={{ flexGrow: 3 }}
        >
          <Link id="title-link" to="/home">
            Young Explorer{" "}
          </Link>
        </Typography>
        {/* {darkMode ? (<DarkModeIcon id="darkmode-btn" onClick={toggleDarkMode} fontSize="large"/>) : (
          (<LightModeIcon id="darkmode-btn" onClick={toggleDarkMode} fontSize="large"/>))} */}
        {/* <DarkModeToggle isChecked={isDark}/> */}
        <div class="dropdown">
          <FaRegUserCircle id="user-btn" onClick={toggleMenu} size={42}/>
          {isMenuOpen && (
            <div class="dropdown-menu" onMouseLeave={NoToggleMenu}>
              {currentUser != null && localStorage.getItem("superuser") == "true" && (
                <Button class="dropdown-item" onClick={addAttraction}>
                  +
                </Button>
              )}
              {currentUser != null ? (
                <Box>
                  <Button class="dropdown-item" onClick={logout}>
                    Log Out
                  </Button>
                  <Button class="dropdown-item" onClick={profile}>
                    Profile
                  </Button>
                </Box>
              ) : (
                <Button class="dropdown-item" onClick={login}>
                  Log In
                </Button>
              )
              }
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;


    /*{currentUser != null && localStorage.getItem("superuser") == "true" && (
          <Button id="add-btn" onClick={addAttraction}>
            +
          </Button>
        )}
        {currentUser != null ? (
          <Box>
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
          
          
        )}*/

/*DON'T REMOVE THIS - IN CASE WE're going to use it later
 <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          /*This is a simple Menu
                      Icon wrapped in Icon /*
                      <MenuIcon />
                      </IconButton>
                      {/* The Typography component applies
                                   default font weights and sizes }
*/
