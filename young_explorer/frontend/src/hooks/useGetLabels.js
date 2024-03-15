import { useEffect, useState } from "react";

const useGetLabels = () => {
  const [labels, setLabels] = useState([]);
  const [loading, setLoading] = useState(true); // Added to track loading state

  useEffect(() => {
    const fetchLabels = () => {
      fetch("http://127.0.0.1:8000/attractions_api/labels")
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          setLabels(data.LabelList);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch labels:", error);
          setLoading(false);
        });
    };

    fetchLabels();
  }, []);

  return {
    labels,
    loading,
  };
};
export default useGetLabels;
