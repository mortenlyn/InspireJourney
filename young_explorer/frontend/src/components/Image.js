
import React from 'react';
/*Genert av kunstig intelligens(Chat GPT)*/
function ImageComponent(props) {
  return (
    <div>
      <img style={{width: "100%", height: "100%", objectFit: "contain"}} src={props.imageUrl} alt="An image" />
      <h1>{props.description}</h1>
    </div>
  );
}

export default ImageComponent;