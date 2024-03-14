import React from 'react';
import './DestinationBox.css';


function DestinationDescription(props) {
    return (
      <>
        
          <div className='dest_box'>
            <div className='dest_info'>
              <h5 className='dest_text'>{props.name}</h5>
              <p>{props.text}</p>
            </div>
          </div>
        
      </>
    )
  }
 
  
  export default DestinationDescription;
