import React from 'react';
import UsePictureApiCall from "./UsePictureApiCall";
import './Destination_box.css';
import {Link } from "react-router-dom";
import Button from "@mui/material/Button";

function CardItem(props) {

    const currentUser = props.currentUser

    const handleClick = () => {
      if (!currentUser) {
        alert("Please log in to view this destination.");
      }
    }
    return (
      <>
      {currentUser ? (
                <Button color="inherit" component={Link} to={"/Destination/" + props.name} >
                <li className='cards__item'>
                  <div className='cards_item_box'>
                    <figure data-category={props.label} className='cards__item__pic-wrap'>
                      <UsePictureApiCall query = {props.name} className='cards__item__img'/>
                    </figure>
                    <div className='cards__item__info'>
                      <h5 className='cards__item__text'>{props.name}</h5>
                    </div>
                  </div>
                </li>
              </Button>
            ) : (
                <div>
                    <Button color="inherit" component={Link} onClick={handleClick}>
                    <li className='cards__item'>
                    <div className='cards_item_box'>
                        <figure data-category={props.label} className='cards__item__pic-wrap'>
                            <UsePictureApiCall query={props.name} className='cards__item__img'/>
                        </figure>
                        <div className='cards__item__info'>
                            <h5 className='cards__item__text'>{props.name}</h5>
                        </div>
                    </div>
                    </li>
                    </Button>
                </div>
            )}
      </>
    )
  }
  
  export default CardItem;

  //<img src={`${props.src}`} alt="Travel destination" className='cards__item__img'></img>