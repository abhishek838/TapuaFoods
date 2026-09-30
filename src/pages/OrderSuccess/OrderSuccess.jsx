import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  Package, 
  Truck, 
  Calendar, 
  MapPin, 
  CreditCard, 
  ArrowRight,
  Info,
  Sparkles
} from 'lucide-react';
import './OrderSuccess.css';

export const OrderSuccess = () => {
  const location = useLocation();
  const order = location.state?.order;

  // Fallback demo order if visited directly
  const displayOrder = order || {
    id: 'TPA-DEMO-93821',
    createdAt: new Date().toISOString(),
    status: 'Confirmed',
    estimatedDelivery: '3–5 Business Days',
    total: 898,
    paymentMethod: 'upi',
    customer: {
      name: 'Abhishek Sharma',
      email: 'abhishek@example.com',
      phone: '+91 80027 52517'
    },
    shippingAddress: {
      address: 'Flat 302, Lotus Residency, Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301'
    },
    items: [
      { name: 'Raw White Makhana', quantity: 2, price: 199 },
      { name: 'Jumbo Whole Cashews (Kaju W240)', quantity: 1, price: 499 }
    ]
  };

  return (
    <div className="order-success-page">
      <div className="container success-container animate-fade-in">
        
        {/* Success Header Icon & Animation */}
        <div className="success-banner-card">
          <div className="success-icon-bubble">
            <CheckCircle2 size={54} className="check-svg" />
          </div>

          <span className="success-pill">Order Confirmed</span>
          <h1 className="success-title">Order Placed Successfully!</h1>
          <p className="success-subtitle">
            Thank you for choosing Tapua Foods. We are preparing your fresh harvest with pristine care.
          </p>

          <div className="demo-notice-alert">
            <Info size={18} className="alert-icon" />
            <div>
              <strong>Demonstration Checkout Notice:</strong> This was a frontend simulated order. No real monetary transaction occurred and no physical goods will be dispatched.
            </div>
          </div>
        </div>

        {/* Order Details Card */}
        <div className="order-summary-card">
          <div className="order-meta-grid">
            <div className="meta-box">
              <span className="meta-label">Order Reference ID</span>
              <strong className="meta-value order-id-highlight">{displayOrder.id}</strong>
            </div>

            <div className="meta-box">
              <span className="meta-label">Estimated Delivery</span>
              <strong className="meta-value">{displayOrder.estimatedDelivery || '3–5 Business Days'}</strong>
            </div>

            <div className="meta-box">
              <span className="meta-label">Payment Mode</span>
              <strong className="meta-value text-capitalize">
                {displayOrder.paymentMethod === 'upi' ? 'UPI (Simulated)' : displayOrder.paymentMethod === 'card' ? 'Card (Simulated)' : 'Cash on Delivery'}
              </strong>
            </div>

            <div className="meta-box">
              <span className="meta-label">Total Amount Paid</span>
              <strong className="meta-value price-total-val">₹{displayOrder.total}</strong>
            </div>
          </div>

          {/* Delivery Address & Customer summary */}
          <div className="delivery-summary-section">
            <div className="section-title-wrap">
              <MapPin size={18} className="map-icon" />
              <h4>Delivery Destination</h4>
            </div>
            <p className="customer-name-line">{displayOrder.customer?.name} • {displayOrder.customer?.phone}</p>
            <p className="address-line">
              {displayOrder.shippingAddress?.address}, {displayOrder.shippingAddress?.city}, {displayOrder.shippingAddress?.state} - {displayOrder.shippingAddress?.pincode}
            </p>
          </div>

          {/* Items breakdown if present */}
          {displayOrder.items && displayOrder.items.length > 0 && (
            <div className="ordered-items-list">
              <h4>Ordered Superfoods ({displayOrder.items.length})</h4>
              <div className="items-table">
                {displayOrder.items.map((item, idx) => (
                  <div key={idx} className="item-row">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">Qty: {item.quantity}</span>
                    <span className="item-price">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action CTAs */}
          <div className="success-action-buttons">
            <Link to="/shop" className="btn btn-primary btn-lg continue-shop-btn">
              Continue Shopping <ArrowRight size={18} />
            </Link>
            <Link to="/account?tab=orders" className="btn btn-secondary btn-lg view-orders-btn">
              <Package size={18} /> View in My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
