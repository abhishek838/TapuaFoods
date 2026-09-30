import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, ShieldCheck, Sparkles } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../components/CartItem/CartItem';
import { OrderSummary } from '../../components/OrderSummary/OrderSummary';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import './Cart.css';

export const Cart = () => {
  const { cartItems, cartCount, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page container">
        <div className="cart-header">
          <h1 className="cart-title">Your Shopping Cart</h1>
        </div>
        <EmptyState
          icon="cart"
          title="Your cart is empty."
          message="Discover something delicious for your next healthy snack from our authentic collection."
          actionText="Start Shopping"
          actionLink="/shop"
        />
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        {/* Cart Header */}
        <div className="cart-header">
          <div>
            <h1 className="cart-title">Shopping Cart</h1>
            <p className="cart-subtitle">
              You have <strong>{cartCount}</strong> {cartCount === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button onClick={clearCart} className="clear-cart-link">
            <Trash2 size={15} /> Clear All Items
          </button>
        </div>

        {/* 2-Column Cart Layout */}
        <div className="cart-layout-grid">
          {/* Left: Cart Items List */}
          <div className="cart-items-column">
            <div className="cart-table-header">
              <span className="col-product">Product</span>
              <span className="col-qty">Quantity</span>
              <span className="col-price">Total</span>
              <span className="col-action"></span>
            </div>

            <div className="cart-items-list">
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-footer-links">
              <Link to="/shop" className="continue-link">
                <ArrowLeft size={16} /> Continue Shopping
              </Link>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="cart-summary-column">
            <OrderSummary showCheckoutBtn={true} />
          </div>
        </div>
      </div>
    </div>
  );
};
