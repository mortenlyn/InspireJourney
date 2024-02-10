import React from "react";
import CardItem from "./Card_Item";
import './Destination_box.css';

const Destination_box = () => {
  return (
    <div className="Destination">
      <h1>Check out these destinations!</h1>
      <div className="Destination_container">
        <div className="destination_wrapper">
          <ul className="Destination_items">
            <CardItem 
              src="Paris.jpg" 
              text="Explore the historic city of love"
              label="City"
              ></CardItem>
            <CardItem 
              src="London.jpg" 
              text="Explore the city of London"
              label="City"
              ></CardItem>
              
            
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Destination_box;


/*<h1 className="Destination_name">Paris</h1>
<div>
<p>
    Paris er en europeisk verdensby som er hovedstaden i Frankrike og den mest folkerike byen i landet. Dens administrative areal er 105 km2 og den har en offisiell befolkning på 2 206 488 innbyggere.
</p>
</div>
<div>
<img src="https://lh3.googleusercontent.com/p/AF1QipM_ApMgFfAP8CP2ZHJUOb13K7P_SqSkW9sh9MFY=s1360-w1360-h1020" id="paris"></img>
</div>
<div id="ekstra_info">
<table>
    <tr>
        <td>20 000 kr</td>
        <td>3-5 dager</td>
        <td>19-25 grader</td>
    </tr>
</table>*/