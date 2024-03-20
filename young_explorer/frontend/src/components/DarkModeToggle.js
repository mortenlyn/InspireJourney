import React, { useState } from "react";
import "./DarkModeToggle.css";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

export const DarkModeToggle = ({ handleChange, isChecked }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
      setDarkMode(prevMode => !prevMode);
    };

    return (
      <div className="toggle-container">
        <input 
          type="checkbox"
          id="check"
          className="toggle"
          onChange={handleChange}
          checked={isChecked}
        />
        <label htmlFor="check">
          {darkMode ? (<LightModeIcon id="darkmode-btn" onClick={toggleDarkMode} fontSize="large"/>) : (
            (<DarkModeIcon id="darkmode-btn" onClick={toggleDarkMode} fontSize="large"/>))}
        </label>
      </div>
    );
  };