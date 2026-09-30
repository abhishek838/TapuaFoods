import React from 'react';
import { Star } from 'lucide-react';
import './Rating.css';

export const Rating = ({ rating = 5, reviewsCount, showCount = true, size = 15 }) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.4;

  return (
    <div className="product-rating" aria-label={`Rating ${rating} out of 5 stars`}>
      <div className="stars-wrapper">
        {[1, 2, 3, 4, 5].map((index) => {
          const isFilled = index <= fullStars;
          const isHalf = !isFilled && hasHalf && index === fullStars + 1;
          
          return (
            <Star
              key={index}
              size={size}
              className={`star-icon ${isFilled ? 'filled' : isHalf ? 'half' : 'empty'}`}
            />
          );
        })}
      </div>
      <span className="rating-score">{Number(rating).toFixed(1)}</span>
      {showCount && reviewsCount !== undefined && (
        <span className="rating-count">({reviewsCount})</span>
      )}
    </div>
  );
};
