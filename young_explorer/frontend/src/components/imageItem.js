import React from 'react';
import UsePictureApiCall from "./UsePictureApiCall";
import './DestinationBox.css';
import {Link } from "react-router-dom";
import Button from "@mui/material/Button";

function ImageItem(props) {

    const currentUser = props.currentUser
    return (
        <UsePictureApiCall query = {props.name} className='cards__item__img'/>          
    )
  }
  
  export default ImageItem;

  //<img src={`${props.src}`} alt="Travel destination" className='cards__item__img'></img>