import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { QuantitySelector } from '../QuantitySelector/QuantitySelector';
import { useCart } from '../../context/CartContext';
import './CartItem.css';

export const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  if (!item) return null;

  return (
    <div className="cart-item-row">
      {/* Product Image */}
      <div className="cart-item-image-col">
        <Link to={`/product/${item.id}`}>
          <img src={item.image} alt={item.name} className="cart-item-img" />
        </Link>
      </div>

      {/* Product Info */}
      <div className="cart-item-info-col">
        <span className="cart-item-category">{item.category}</span>
        <h4 className="cart-item-name">
          <Link to={`/product/${item.id}`}>{item.name}</Link>
        </h4>
        {item.weight && <span className="cart-item-weight">Pack: {item.weight}</span>}
        <span className="cart-item-unit-price">₹{item.price} each</span>
      </div>

      {/* Quantity Controls */}
      <div className="cart-item-quantity-col">
        <QuantitySelector
          quantity={item.quantity}
          onIncrease={() => updateQuantity(item.id, 1)}
          onDecrease={() => updateQuantity(item.id, -1)}
          size="small"
        />
      </div>

      {/* Line Total */}
      <div className="cart-item-total-col">
        <span className="cart-item-line-total">₹{item.price * item.quantity}</span>
      </div>

      {/* Remove Button */}
      <div className="cart-item-action-col">
        <button
          onClick={() => removeFromCart(item.id)}
          className="cart-remove-btn"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};
