import React from 'react';
import { Minus, Plus } from 'lucide-react';
import './QuantitySelector.css';

export const QuantitySelector = ({ 
  quantity = 1, 
  onIncrease, 
  onDecrease, 
  onChange, 
  min = 1, 
  max = 99,
  size = 'medium' 
}) => {
  return (
    <div className={`quantity-selector quantity-${size}`}>
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="quantity-btn decrease-btn"
        aria-label="Decrease quantity"
      >
        <Minus size={14} />
      </button>

      <span className="quantity-value">{quantity}</span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="quantity-btn increase-btn"
        aria-label="Increase quantity"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
