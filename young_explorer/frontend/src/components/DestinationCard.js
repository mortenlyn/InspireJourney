
import React from 'react';
import UsePictureApiCall from "./UsePictureApiCall";
import './Destination_box.css';
import {Link } from "react-router-dom";
import Button from "@mui/material/Button";


function DestinationCard(props) {
    return (
      <>
        <li className='cards__item'>
          <div className='cards_item_box'>
            <figure data-category={props.label} className='cards__item__pic-wrap'>
              <UsePictureApiCall query = {props.query} className='cards__item__img'/>
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.name}</h5>
            </div>
          </div>
        </li>
      </>
    )
  }
  
  export default DestinationCard;