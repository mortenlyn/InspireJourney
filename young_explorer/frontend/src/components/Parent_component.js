import React, { useState } from "react";
import FilterBox from "./FilterBox";
import Destination_box from "./Destination_box";

const ParentComponent = () => {
  // Define filteredAttractions state
  const [filteredAttractions, setFilteredAttractions] = useState([]);

  return (
    <div>
      {/* Render FilterBox component and pass setFilteredAttractions as a prop */}
      <FilterBox setFilteredAttractions={setFilteredAttractions} />

      {/* Render Destination_box component and pass filteredAttractions as a prop */}
      <Destination_box filteredAttractions={filteredAttractions} />
    </div>
  );
};

export default ParentComponent;
