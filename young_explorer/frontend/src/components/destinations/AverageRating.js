import React from 'react';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

function AverageRating({ rating }) {
  const integerPart = Math.floor(rating);
  
  const fractionalPart = rating - integerPart;

  const stars = [];
  for (let i = 0; i < integerPart; i++) {
    stars.push(<FaStar key={i} color="gold" />);
  }
  if (fractionalPart > 0) {
    stars.push(<FaStarHalfAlt key={integerPart} color="gold" />);
  }

  return (
    <div className="average-rating">
      {stars}
    </div>
  );
}

export default AverageRating;
