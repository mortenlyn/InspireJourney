import React, { useState } from "react";


export default function AddAttraction() {
  const [attractionName, setAttractionName] = useState("");
  const [attractionDescription, setAttractionDescription] = useState("");
  const [attractionID, setAttractionID] = useState("");
  const [price, setPrice] = useState(null);

  const handleAttractionDescription = (event) => {
    setAttractionDescription(event.target.value);
  }
  const handleName = (event) => {
    setAttractionName(event.target.value);
  }
  const handlePrice = (event) => {
    setAttractionName(event.target.value);
  }
  const handleSubmit = (event) =>{
    event.preventDefault();
    console.log(attractionName);
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <label>Enter attraction name:
                <input type="text" onChange={handleName}></input>
            </label><br />
            <label>Enter description:
                <textarea onChange={handleAttractionDescription}></textarea>
            </label><br/>
            <label>Enter price:
                <input type="number" onChange={handlePrice}></input>
            </label><br/>
            <label>Submit form
                <input type="submit"></input>
            </label>
        </form>
    </div>
  );
}
/*

<FormGroup>
        <FormControl>
            <InputLabel>Enter attraction name</InputLabel>
            <Input type="text"></Input>
        </FormControl>
        <FormControl>
            <InputLabel>Enter description</InputLabel>
            <Input type="text"></Input>
        </FormControl>
        <FormControl>
            <InputLabel>Enter price</InputLabel>
            <Input type="number"></Input>
        </FormControl>
        <FormControl>
            <InputLabel>Enter rating</InputLabel>
            <InputBase ></InputBase>
        </FormControl>

      </FormGroup>



*/