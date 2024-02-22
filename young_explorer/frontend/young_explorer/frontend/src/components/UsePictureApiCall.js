import { useEffect } from "react";
import { useState } from "react";
import Image from "./Image";

function PictureApiCall(props) {
  const [location, setLocation] = useState([]);
  const accessKey = "Em95bnVmDx7hcIaMtSUDScOLEoQe7JnykrXnRDLOpeU";

  useEffect(() => {
    const url = `https://api.unsplash.com/search/photos?query=${props.query}&client_id=${accessKey}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLocation(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [props.query]);

  return (
    <div>
      {location.results && location.results.length > 0 ? (
        <Image
          imageUrl={location.results[0].urls.regular}
          //description={location.results[0].description}
        />
      ) : (
        <h1>"Loading..."</h1>
      )}
    </div>
  );
}

export default PictureApiCall;
