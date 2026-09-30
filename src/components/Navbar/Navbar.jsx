import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Copy,
  Check
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import logoImg from '../../assets/images/tapua-logo.png';
import './Navbar.css';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [copiedCode, setCopiedCode] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const handleCopyPromo = (code) => {
    try {
      navigator.clipboard.writeText(code);
      setCopiedCode(true);
      showToast(`Coupon code "${code}" copied! Apply at checkout for 10% off.`, 'success');
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      showToast(`Use coupon "${code}" at checkout for 10% off!`, 'info');
    }
  };

  // Compact navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="site-header">
      {/* 1. Subtle Announcement Bar */}
      <div className="announcement-bar">
        <div className="container announcement-content">
          <span className="announcement-text">
            <Sparkles size={14} className="announcement-icon" />
            Free Shipping on Orders Above <strong>₹499</strong> | Use Code <button type="button" className="announcement-coupon-btn" onClick={() => handleCopyPromo('TAPUA10')} title="Click to copy coupon">TAPUA10 {copiedCode ? <Check size={11} className="coupon-check" /> : <Copy size={11} />}</button> for 10% OFF
          </span>
          <span className="announcement-badge">100% Raw & Natural</span>
        </div>
      </div>

      {/* 2. Main Sticky Navbar */}
      <nav className={`navbar ${isScrolled ? 'navbar-compact' : ''}`}>
        <div className="container navbar-container">
          
          {/* Mobile Hamburger Button */}
          <button 
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu size={24} />
          </button>

          {/* Brand Logo & Name */}
          <Link to="/" className="navbar-brand">
            <img 
              src={logoImg} 
              alt="Tapua Foods Official Logo" 
              className="brand-logo-img" 
            />
            <div className="brand-text-block">
              <span className="brand-name">TAPUA FOODS</span>
              <span className="brand-tagline">Natural Goodness • Mithila</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <ul className="nav-links">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/shop" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/recipes" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Recipes
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/stories" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Stories
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/contact" 
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Contact
              </NavLink>
            </li>
          </ul>

          {/* Action Icons */}
          <div className="nav-actions">
            {/* Live Search Trigger */}
            <button 
              className="nav-action-btn search-trigger"
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search products"
            >
              <Search size={20} />
            </button>

            {/* Wishlist Link */}
            <Link 
              to="/account?tab=wishlist" 
              className="nav-action-btn wishlist-btn"
              aria-label="View Wishlist"
            >
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="action-badge">{wishlistCount}</span>
              )}
            </Link>

            {/* Account Link */}
            <Link 
              to={isAuthenticated ? "/account" : "/login"} 
              className="nav-action-btn account-btn"
              aria-label="User Account"
            >
              <User size={20} />
              {isAuthenticated && (
                <span className="user-firstname-label">
                  {user?.name?.split(' ')[0]}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link 
              to="/cart" 
              className="nav-action-btn cart-btn"
              aria-label="View Cart"
            >
              <div className="cart-icon-wrapper">
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="cart-badge animate-fade-in">{cartCount}</span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {/* Expandable Search Overlay / Bar */}
        {searchOpen && (
          <div className="search-bar-dropdown animate-fade-in">
            <div className="container">
              <form onSubmit={handleSearchSubmit} className="search-form">
                <Search size={20} className="search-input-icon" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search Raw Makhana, California Almonds, Pumpkin Seeds, Gift Hampers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="btn btn-primary btn-sm">
                  Search
                </button>
                <button 
                  type="button" 
                  onClick={() => setSearchOpen(false)} 
                  className="search-close-btn"
                  aria-label="Close search"
                >
                  <X size={20} />
                </button>
              </form>
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-drawer-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}>
        <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <div className="drawer-brand">
              <img src={logoImg} alt="Tapua Foods Logo" className="drawer-logo" />
              <span className="drawer-brand-name">TAPUA FOODS</span>
            </div>
            <button 
              className="drawer-close-btn" 
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-drawer-body">
            <ul className="mobile-nav-list">
              <li>
                <Link to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  Home <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  All Products <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/shop?category=makhana" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  Raw White Makhana <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/shop?category=dry-fruits" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  Dry Fruits <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/shop?category=nuts" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  Nuts <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/shop?category=seeds" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  Seeds <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/shop?category=healthy-snacks" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  Healthy Snacks <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/shop?category=gift-hampers" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  Gift Hampers <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/recipes" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  Makhana Recipes <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/stories" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  Heritage Stories & Blog <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  About Tapua <ChevronRight size={16} />
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  Contact Us <ChevronRight size={16} />
                </Link>
              </li>
            </ul>

            <div className="mobile-drawer-auth">
              {isAuthenticated ? (
                <Link 
                  to="/account" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn btn-outline btn-full"
                >
                  <User size={18} /> My Account ({user?.name?.split(' ')[0]})
                </Link>
              ) : (
                <div className="drawer-auth-buttons">
                  <Link 
                    to="/login" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>

            <div className="drawer-trust-banner">
              <ShieldCheck size={18} className="trust-icon" />
              <span>100% Pure & Authentically Sourced</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
