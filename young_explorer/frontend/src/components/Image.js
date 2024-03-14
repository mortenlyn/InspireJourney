import React from "react";
/*Genert av kunstig intelligens(Chat GPT)*/
function ImageComponent(props) {
  return (
    <div>
      <img
        src={props.imageUrl}
        alt="An image"
        style={{ width: "500px", height: "400px", objectFit: "cover" }}
      />
      <h1>{props.description}</h1>
    </div>
  );
}

export default ImageComponent;
