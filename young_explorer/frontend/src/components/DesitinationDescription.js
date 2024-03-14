import React from 'react';
import './DestinationBox.css';


function DestinationDescription(props) {
    return (
      <>
        <li className='cards__item'>
          <div className='cards_item_box'>
            <div className='cards__item__info'>
              <h5 className='cards__item__text'>{props.name}</h5>
              <p>{props.text}</p>
            </div>
          </div>
        </li>
      </>
    )
  }
 
  
  export default DestinationDescription;
