import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  User, 
  Package, 
  MapPin, 
  Heart, 
  LogOut, 
  ChevronRight, 
  Plus, 
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { orderService } from '../../services/orderService';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import { useToast } from '../../context/ToastContext';
import './Account.css';

export const Account = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';
  const navigate = useNavigate();

  const { user, isAuthenticated, logout, updateProfile } = useAuth();
  const { wishlistItems } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [orders, setOrders] = useState([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Abhishek Kumar',
    email: user?.email || 'abhishek@example.com',
    phone: user?.phone || '+91 80027 52517'
  });

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      isDefault: true,
      tag: 'Home',
      recipient: 'Abhishek Kumar',
      phone: '+91 80027 52517',
      line1: 'Flat 302, Lotus Residency, Sector 62',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301'
    }
  ]);

  useEffect(() => {
    const fetchOrders = async () => {
      const userOrders = await orderService.getUserOrders();
      setOrders(userOrders);
    };
    fetchOrders();
  }, []);

  const handleTabChange = (tabName) => {
    setSearchParams({ tab: tabName });
  };

  const handleLogout = () => {
    logout();
    showToast('Signed out of demo session.', 'info');
    navigate('/');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    await updateProfile(profileForm);
    setIsEditingProfile(false);
    showToast('Profile updated successfully!', 'success');
  };

  return (
    <div className="account-page">
      <div className="container">
        {/* Account Header */}
        <div className="account-header">
          <div className="account-user-badge">
            <div className="avatar-circle">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="account-name">{user?.name || 'Demo Patron'}</h1>
              <span className="account-email">{user?.email || 'demo.patron@tapuafoods.com'}</span>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-outline btn-sm logout-header-btn">
            <LogOut size={16} /> Sign Out
          </button>
        </div>

        {/* Dashboard Grid Layout */}
        <div className="account-grid-layout">
          {/* Sidebar Nav */}
          <aside className="account-sidebar">
            <nav className="account-nav-menu">
              <button
                className={`account-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => handleTabChange('profile')}
              >
                <User size={18} /> My Profile
              </button>
              <button
                className={`account-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
                onClick={() => handleTabChange('orders')}
              >
                <Package size={18} /> Order History ({orders.length})
              </button>
              <button
                className={`account-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
                onClick={() => handleTabChange('addresses')}
              >
                <MapPin size={18} /> Saved Addresses ({addresses.length})
              </button>
              <button
                className={`account-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
                onClick={() => handleTabChange('wishlist')}
              >
                <Heart size={18} /> My Wishlist ({wishlistItems.length})
              </button>
              <button onClick={handleLogout} className="account-nav-btn logout-btn">
                <LogOut size={18} /> Logout
              </button>
            </nav>
          </aside>

          {/* Main Tab Content */}
          <main className="account-tab-content">
            {/* 1. Profile Tab */}
            {activeTab === 'profile' && (
              <div className="account-card animate-fade-in">
                <div className="card-top-bar">
                  <h3 className="card-heading">Profile Information</h3>
                  {!isEditingProfile && (
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="btn btn-secondary btn-sm"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>

                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="profile-edit-form">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                    <div className="edit-actions">
                      <button
                        type="button"
                        onClick={() => setIsEditingProfile(false)}
                        className="btn btn-outline btn-sm"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary btn-sm">
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="profile-view-grid">
                    <div className="info-block">
                      <span className="block-label">Full Name</span>
                      <strong className="block-val">{user?.name || 'Abhishek Kumar'}</strong>
                    </div>
                    <div className="info-block">
                      <span className="block-label">Email Address</span>
                      <strong className="block-val">{user?.email || 'abhishek@example.com'}</strong>
                    </div>
                    <div className="info-block">
                      <span className="block-label">Phone Number</span>
                      <strong className="block-val">{user?.phone || '+91 80027 52517'}</strong>
                    </div>
                    <div className="info-block">
                      <span className="block-label">Default Delivery State</span>
                      <strong className="block-val">{user?.address?.state || 'Uttar Pradesh'}</strong>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Orders Tab */}
            {activeTab === 'orders' && (
              <div className="account-card animate-fade-in">
                <h3 className="card-heading">Your Order History</h3>
                {orders.length > 0 ? (
                  <div className="orders-timeline">
                    {orders.map((ord) => (
                      <div key={ord.id} className="order-history-card">
                        <div className="order-history-header">
                          <div>
                            <span className="ord-id">{ord.id}</span>
                            <span className="ord-date">
                              {new Date(ord.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <span className={`ord-status-badge status-${ord.status?.toLowerCase()}`}>
                            {ord.status === 'Delivered' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                            {ord.status || 'Confirmed'}
                          </span>
                        </div>

                        <div className="ord-items-preview">
                          {ord.items?.map((it, idx) => (
                            <div key={idx} className="ord-item-line">
                              <span>{it.name} × {it.quantity}</span>
                              <strong>₹{it.price * it.quantity}</strong>
                            </div>
                          ))}
                        </div>

                        <div className="order-history-footer">
                          <span className="ord-total">Total: <strong>₹{ord.total}</strong></span>
                          <span className="ord-eta">Estimated: {ord.estimatedDelivery}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="order"
                    title="No Orders Yet"
                    message="You haven't placed any orders yet. Discover our premium makhana and healthy snacks."
                    actionText="Start Shopping"
                    actionLink="/shop"
                  />
                )}
              </div>
            )}

            {/* 3. Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="account-card animate-fade-in">
                <div className="card-top-bar">
                  <h3 className="card-heading">Saved Addresses</h3>
                  <button 
                    onClick={() => showToast('Address creation available in connected backend phase.', 'info')} 
                    className="btn btn-secondary btn-sm"
                  >
                    <Plus size={16} /> Add New Address
                  </button>
                </div>

                <div className="addresses-grid">
                  {addresses.map((addr) => (
                    <div key={addr.id} className="address-card">
                      <div className="address-card-header">
                        <span className="addr-tag">{addr.tag}</span>
                        {addr.isDefault && <span className="default-pill">Default</span>}
                      </div>
                      <p className="addr-recipient">{addr.recipient}</p>
                      <p className="addr-body">{addr.line1}</p>
                      <p className="addr-body">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="addr-phone">Phone: {addr.phone}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Wishlist Tab */}
            {activeTab === 'wishlist' && (
              <div className="account-card animate-fade-in">
                <h3 className="card-heading">Your Saved Wishlist</h3>
                {wishlistItems.length > 0 ? (
                  <div className="wishlist-products-grid">
                    {wishlistItems.map((prod) => (
                      <ProductCard key={prod.id} product={prod} />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="wishlist"
                    title="Your Wishlist is Empty"
                    message="Save your favorite dry fruits, nuts, and raw white makhana here to order anytime."
                    actionText="Browse Shop"
                    actionLink="/shop"
                  />
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
