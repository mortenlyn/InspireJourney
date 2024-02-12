import React, { useState, useEffect } from "react";

const UseAttractionsApi = (props) => {
  const [token, setToken] = useState(null);
  const [cities, setCities] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch(
          "https://test.api.amadeus.com/v1/security/oauth2/token",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "client_credentials",
              client_id: "ajSYfPFzuuQTT365L8dNcLnmKMDLEjGK",
              client_secret: "v6wA6qtUkkskix7a",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to obtain token");
        }

        const data = await response.json();
        setToken(data.access_token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {

      try {
        const response = await fetch(
          `https://test.api.amadeus.com/v1/reference-data/locations/cities?countryCode=${props.countryCode}&keyword=${props.city}&max=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }

        const data = await response.json();
        setCities(data.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [token]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (cities.length === 0) return;

      const city = cities[0]; // Assuming you want to use the first city's coordinates
      const { latitude, longitude } = city.geoCode;

      try {
        const response = await fetch(
          `https://test.api.amadeus.com/v1/shopping/activities?latitude=${latitude}&longitude=${longitude}&radius=1`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();
        setActivities(data.data);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, [cities, token]);

  return (
    <div>
      {activities.length > 0 ? (
        <div>
          {activities.map((activity) => (
              <div key = {activity.id}>
                {activity.pictures && activity.name &&(
                  <div>
                    <h3>{activity.name}</h3>
                    <img
                      src={activity.pictures[0]}
                      alt={activity.name}
                      style={{ maxWidth: "100px" }}
                    />
                    <p>Activity rating: {activity.rating}</p>
                    <p>Short activity description: {activity.shortDescription}</p>
                    <p>Activity description: {activity.description}</p>
                    <p>
                      Activity price: {activity.price.amount}{" "}
                      {activity.price.currencyCode}
                    </p>
                    <p>
                      Minimum duration: {activity.minimumDuration}
                    </p>
                  </div>
                )}
              </div>
          ))}
        </div>
      ) : (
        <p>Loading activities...</p>
      )}
    </div>
  );
};

export default UseAttractionsApi;
