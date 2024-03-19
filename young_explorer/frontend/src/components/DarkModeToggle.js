import React, { useState } from "react";
import "./DarkModeToggle.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const DarkModeToggle = ({ handleChange, isChecked }) => {
    // const [darkMode, setDarkMode] = useState(false);

    // const toggleDarkMode = () => {
    //   setDarkMode(prevMode => !prevMode);
    // };

    return (
      <div className="toggle-container">
        {/* {darkMode ? (<DarkModeIcon id="darkmode-btn" onClick={toggleDarkMode} fontSize="large"/>) : (
          (<LightModeIcon id="darkmode-btn" onClick={toggleDarkMode} fontSize="large"/>))} */}
        <input
          type="checkbox"
          id="check"
          className="toggle"
          onChange={handleChange}
          checked={isChecked}
        />
        <label htmlFor="check">Dark Mode</label>
      </div>
    );
  };