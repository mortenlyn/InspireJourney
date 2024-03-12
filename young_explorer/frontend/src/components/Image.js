
import React from 'react';
/*Genert av kunstig intelligens(Chat GPT)*/
function ImageComponent(props) {
  return (
    <div>
      <img style={{width: "100px", height: "200px", objectFit: "contain"}} src={props.imageUrl} alt="An image" />
      <h1>{props.description}</h1>
    </div>
  );
}

export default ImageComponent;