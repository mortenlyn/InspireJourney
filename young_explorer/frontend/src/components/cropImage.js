import React, {Component} from "react";
import CardItem from "./Card_Item";
//import './Destination_box.css';
//import GetAllAttractions from "./GetAllAttractions"
import ApiImages from "./getImage"

/*function imageBefore(props) {
    return (
      <>
        <li className='cards__item'>
          <div className='cards_item_box'>
            <figure data-category={props.label} className='cards__item__pic-wrap'>
              <UsePictureApiCall query = {props.query} className='cards__item__img'/>
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.name}</h5>
              <p>{props.text}</p>
            </div>
          </div>
        </li>
      </>
    )
  }
  
  export default imageBefore;*/



const imagesBefore = (props) => {
  return (
    /*<div className="Destination">
      <h1>Check out these destinations!</h1>
      <div className="Destination__container">
        <div className="destination__wrapper">
          <ul className="Destination__items">
          </ul>
        </div>
      </div>
    </div>*/
    <div>
        <ApiImages/>
    </div>
  );
};

export default imagesBefore;