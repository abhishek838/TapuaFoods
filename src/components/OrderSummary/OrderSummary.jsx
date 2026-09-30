import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import './OrderSummary.css';

export const OrderSummary = ({ showCheckoutBtn = true, checkoutStep = false }) => {
  const { 
    cartSubtotal, 
    cartTotal, 
    shippingFee, 
    discountAmount, 
    appliedCoupon, 
    amountNeededForFreeShipping,
    applyCoupon, 
    removeCoupon 
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const { showToast } = useToast();

  const handleApply = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    const res = applyCoupon(couponCode);
    if (res.success) {
      showToast(res.message, 'success');
      setCouponCode('');
    } else {
      showToast(res.message, 'error');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round(((499 - amountNeededForFreeShipping) / 499) * 100));

  return (
    <div className="order-summary-box">
      <h3 className="summary-title">Order Summary</h3>

      {/* Free Shipping Progress Indicator */}
      <div className="free-shipping-meter">
        <div className="meter-label">
          <Truck size={16} className="meter-icon" />
          {amountNeededForFreeShipping > 0 ? (
            <span>Add <strong>₹{amountNeededForFreeShipping}</strong> more for <strong>FREE Delivery</strong></span>
          ) : (
            <span className="meter-unlocked">🎉 You unlocked <strong>FREE Delivery!</strong></span>
          )}
        </div>
        <div className="meter-bar-track">
          <div 
            className="meter-bar-fill" 
            style={{ width: `${freeShippingProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Coupon Application Box */}
      {!checkoutStep && (
        <div className="coupon-box">
          {appliedCoupon ? (
            <div className="applied-coupon-tag">
              <div className="coupon-info">
                <Tag size={15} />
                <span>Coupon: <strong>{appliedCoupon.code}</strong> applied</span>
              </div>
              <button onClick={removeCoupon} className="remove-coupon-btn">
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApply} className="coupon-form">
              <input
                type="text"
                placeholder="Promo Code (TAPUA10)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="coupon-input"
              />
              <button type="submit" className="btn btn-secondary btn-sm coupon-btn">
                Apply
              </button>
            </form>
          )}
        </div>
      )}

      {/* Pricing Lines */}
      <div className="summary-lines">
        <div className="summary-line">
          <span className="line-label">Items Subtotal</span>
          <span className="line-val">₹{cartSubtotal}</span>
        </div>

        <div className="summary-line">
          <span className="line-label">Shipping</span>
          <span className="line-val">
            {shippingFee === 0 ? (
              <span className="free-tag">FREE</span>
            ) : (
              `₹${shippingFee}`
            )}
          </span>
        </div>

        {discountAmount > 0 && (
          <div className="summary-line discount-line">
            <span className="line-label">Discount ({appliedCoupon?.code})</span>
            <span className="line-val">-₹{discountAmount}</span>
          </div>
        )}

        <div className="summary-divider"></div>

        <div className="summary-line total-line">
          <span className="line-label">Total Amount</span>
          <span className="line-val total-amount">₹{cartTotal}</span>
        </div>
        <span className="tax-inclusive-note">Inclusive of all taxes</span>
      </div>

      {/* Checkout CTA */}
      {showCheckoutBtn && (
        <div className="summary-actions">
          <Link to="/checkout" className="btn btn-accent btn-full checkout-cta-btn">
            Proceed to Checkout <ArrowRight size={18} />
          </Link>
          <Link to="/shop" className="continue-shopping-link">
            Continue Shopping
          </Link>
        </div>
      )}

      <div className="summary-trust-badge">
        <ShieldCheck size={16} />
        <span>Safe & Secure 256-Bit Encrypted Checkout</span>
      </div>
    </div>
  );
};
