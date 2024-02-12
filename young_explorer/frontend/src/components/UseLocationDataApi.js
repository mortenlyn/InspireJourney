import { useEffect } from "react";
import { useState } from "react";

function UseLocationDataApi(countryCode, query) {
  const [location, setLocation] = useState([]);
  const accessKey = "GqsABje33ARruLNRh1J7eGyWvrBj";
  const accessToken2 = "UgOUOkcEd2dT3iBz7Wg4UHQ1gIht";

  useEffect(() => {
    const url = `https://test.api.amadeus.com/v1/reference-data/locations/cities?countryCode=${countryCode}&keyword=${query}&max=10`;
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

export default UseLocationDataApi;
