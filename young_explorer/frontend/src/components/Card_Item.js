import React from 'react';
//import { Link } from 'react-router-dom';

function CardItem(props) {
    return (
      <>
        <li className='cards__item'>
            <figure data-category={props.label} className='cards__item__pic-wrap'>
              <img src={`${props.src}`} alt="Travel destination" className='cards__item__img'></img>
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.text}</h5>
            </div>
        </li>
      </>
    )
  }
  
  export default CardItem;