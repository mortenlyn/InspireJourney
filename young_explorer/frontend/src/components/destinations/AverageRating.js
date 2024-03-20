import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

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
  const totalStars = integerPart + (fractionalPart > 0 ? 1 : 0);
  for (let i = totalStars; i < 5; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} color="gray" />);
  }

  return rating != 0 ? (
    <div className="average-rating" style={{ fontSize: "20px" }}>
      {stars} ({Math.round(rating * 10) / 10}/5)
    </div>
  ) : (
    <div style={{minHeight: "30px"}}>*The destination has not been rated yet</div>
  );
}

export default AverageRating;
