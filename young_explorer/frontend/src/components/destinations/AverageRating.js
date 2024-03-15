import React from 'react';
import { FaStar } from 'react-icons/fa';

function AverageRating({ rating }) {
  const integerPart = Math.floor(rating);
  
  const fractionalPart = rating - integerPart;

  const stars = [];
  for (let i = 0; i < integerPart; i++) {
    stars.push(<FaStar key={i} color="gold" />);
  }
  if (fractionalPart > 0) {
    stars.push(<FaStar key="half" color="gold" />);
  }

  return (
    <div className="average-rating">
      {stars}
    </div>
  );
}

export default AverageRating;
