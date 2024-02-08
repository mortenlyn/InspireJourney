import { useEffect } from "react";
import { useState } from "react";

function PictureApiCall(query) {
  const [location, setLocation] = useState([]);
  const accessKey = "Em95bnVmDx7hcIaMtSUDScOLEoQe7JnykrXnRDLOpeU";

  useEffect(() => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLocation(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [query]);

  return location;
}

export default PictureApiCall;
