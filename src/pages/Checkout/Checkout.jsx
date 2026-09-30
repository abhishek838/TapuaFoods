import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  CheckCircle, 
  Loader2, 
  ArrowLeft,
  Lock,
  Sparkles
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { useToast } from '../../context/ToastContext';
import './Checkout.css';

export const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, cartSubtotal, shippingFee, discountAmount, appliedCoupon, clearCart } = useCart();
  const { user } = useAuth();
  const { showToast } = useToast();

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address?.line1 || '',
    city: user?.address?.city || '',
    state: user?.address?.state || 'Uttar Pradesh',
    pincode: user?.address?.pincode || '',
    paymentMethod: 'upi',
    upiId: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const [paymentStatus, setPaymentStatus] = useState('idle'); // 'idle' | 'processing' | 'success'

  if (cartItems.length === 0 && paymentStatus === 'idle') {
    return (
      <div className="container checkout-empty-state">
        <h2>Your Cart is Empty</h2>
        <p>Please add products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="btn btn-primary">Return to Shop</Link>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.pincode) {
      showToast('Please fill in all required customer and shipping details.', 'error');
      return;
    }

    if (formData.pincode.length !== 6) {
      showToast('Please enter a valid 6-digit PIN code.', 'error');
      return;
    }

    try {
      setPaymentStatus('processing');

      // Call simulated order service
      const createdOrder = await orderService.createOrder({
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        paymentMethod: formData.paymentMethod,
        items: cartItems,
        subtotal: cartSubtotal,
        shippingFee: shippingFee,
        discount: discountAmount,
        couponCode: appliedCoupon?.code,
        total: cartTotal
      });

      setPaymentStatus('success');

      setTimeout(() => {
        clearCart();
        navigate('/order-success', { state: { order: createdOrder } });
      }, 900);
    } catch (err) {
      setPaymentStatus('idle');
      showToast('Failed to process payment. Please try again.', 'error');
    }
  };

  return (
    <div className="checkout-page">
      <div className="container">
        {/* Header */}
        <div className="checkout-header">
          <Link to="/cart" className="back-to-cart-link">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
          <div className="checkout-header-content">
            <h1 className="checkout-title">Secure Checkout</h1>
            <div className="demo-mode-pill">
              <Sparkles size={14} /> DEMO MODE: Mock payment simulation only
            </div>
          </div>
        </div>

        <form onSubmit={handlePlaceOrder} className="checkout-form-grid">
          {/* Left Column: Form Details */}
          <div className="checkout-inputs-column">
            
            {/* 1. Customer Information */}
            <div className="checkout-card">
              <h3 className="card-section-title">1. Customer Information</h3>
              <div className="form-grid-2">
                <div className="form-group full-width">
                  <label htmlFor="fullName">Full Name *</label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Abhishek Sharma"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 80027 52517"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="checkout-card">
              <h3 className="card-section-title">2. Shipping Address</h3>
              <div className="form-grid-2">
                <div className="form-group full-width">
                  <label htmlFor="address">Street Address / House No. / Landmark *</label>
                  <input
                    id="address"
                    type="text"
                    name="address"
                    required
                    placeholder="Flat 302, Lotus Residency, Sector 62"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City / District *</label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    required
                    placeholder="e.g. Noida / Darbhanga"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="form-input"
                  >
                    <option value="Bihar">Bihar</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Delhi NCR">Delhi NCR</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Other">Other State</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="pincode">PIN Code *</label>
                  <input
                    id="pincode"
                    type="text"
                    name="pincode"
                    maxLength={6}
                    required
                    placeholder="e.g. 201301"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method (MOCK DEMO) */}
            <div className="checkout-card">
              <div className="card-title-row">
                <h3 className="card-section-title">3. Payment Method (Demo)</h3>
                <span className="demo-payment-tag">Mock Gateway</span>
              </div>
              <p className="payment-disclaimer">
                Choose a payment method to simulate the transaction. No real credit card or bank account will be charged.
              </p>

              <div className="payment-options-list">
                {/* Option 1: UPI */}
                <label className={`payment-option-label ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                  />
                  <div className="option-content">
                    <div className="option-title-row">
                      <Smartphone size={20} className="option-icon" />
                      <strong>UPI (Instant Demo)</strong>
                      <span className="option-sub-badge">Google Pay, PhonePe, Paytm, BHIM</span>
                    </div>
                    {formData.paymentMethod === 'upi' && (
                      <div className="payment-subform animate-fade-in">
                        <input
                          type="text"
                          name="upiId"
                          placeholder="e.g. yourname@oksbi / 9876543210@paytm"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                        <span className="subform-hint">Demo mode: Enter any dummy UPI ID or leave empty.</span>
                      </div>
                    )}
                  </div>
                </label>

                {/* Option 2: Card */}
                <label className={`payment-option-label ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <div className="option-content">
                    <div className="option-title-row">
                      <CreditCard size={20} className="option-icon" />
                      <strong>Credit / Debit Card (Demo)</strong>
                      <span className="option-sub-badge">Visa, Mastercard, RuPay</span>
                    </div>
                    {formData.paymentMethod === 'card' && (
                      <div className="payment-subform animate-fade-in">
                        <input
                          type="text"
                          name="cardNumber"
                          placeholder="4532 •••• •••• 8892"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          className="form-input"
                        />
                        <div className="form-grid-2" style={{ marginTop: '0.5rem' }}>
                          <input
                            type="text"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                          <input
                            type="text"
                            name="cardCvv"
                            placeholder="CVV"
                            maxLength={3}
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* Option 3: COD */}
                <label className={`payment-option-label ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <div className="option-content">
                    <div className="option-title-row">
                      <Banknote size={20} className="option-icon" />
                      <strong>Cash on Delivery (COD)</strong>
                      <span className="option-sub-badge">Pay cash or UPI upon delivery</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Review & Place Order Button */}
          <div className="checkout-summary-column">
            <div className="order-summary-box">
              <h3 className="summary-title">Order Review</h3>

              <div className="checkout-items-preview">
                {cartItems.map((item) => (
                  <div key={item.id} className="preview-item-row">
                    <img src={item.image} alt={item.name} className="preview-item-thumb" />
                    <div className="preview-item-info">
                      <span className="preview-item-name">{item.name}</span>
                      <span className="preview-item-qty">Qty: {item.quantity} × ₹{item.price}</span>
                    </div>
                    <span className="preview-item-total">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="summary-lines">
                <div className="summary-line">
                  <span className="line-label">Items Subtotal</span>
                  <span className="line-val">₹{cartSubtotal}</span>
                </div>
                <div className="summary-line">
                  <span className="line-label">Shipping</span>
                  <span className="line-val">
                    {shippingFee === 0 ? <span className="free-tag">FREE</span> : `₹${shippingFee}`}
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
                  <span className="line-label">Total to Pay</span>
                  <span className="line-val total-amount">₹{cartTotal}</span>
                </div>
              </div>

              {/* Submit CTA with State Simulation */}
              <button
                type="submit"
                disabled={paymentStatus !== 'idle'}
                className={`btn btn-lg btn-full place-order-btn ${
                  paymentStatus === 'success' ? 'btn-success' : 'btn-accent'
                }`}
              >
                {paymentStatus === 'idle' && (
                  <>
                    <Lock size={18} /> Place Order (₹{cartTotal})
                  </>
                )}
                {paymentStatus === 'processing' && (
                  <>
                    <Loader2 size={20} className="spinner" /> Processing Payment...
                  </>
                )}
                {paymentStatus === 'success' && (
                  <>
                    <CheckCircle size={20} /> Payment Successful!
                  </>
                )}
              </button>

              <div className="checkout-trust-points">
                <div className="trust-row">
                  <ShieldCheck size={16} className="trust-icon" />
                  <span>256-Bit SSL Encrypted Mock Gateway</span>
                </div>
                <div className="trust-row">
                  <Sparkles size={16} className="trust-icon" />
                  <span>3–5 Business Days Guaranteed Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
