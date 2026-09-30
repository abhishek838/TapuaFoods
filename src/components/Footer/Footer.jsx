import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Check, 
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import logoImg from '../../assets/images/tapua-logo.png';
import './Footer.css';

// Clean SVG Social Icons
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useToast();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      showToast('Thank you for subscribing! Use coupon TAPUA10 for 10% off.', 'success');
      setEmail('');
    } else {
      showToast('Please enter a valid email address.', 'error');
    }
  };

  return (
    <footer className="site-footer">
      {/* Trust Badges Strip above footer */}
      <div className="footer-perks-strip">
        <div className="container perks-container">
          <div className="perk-item">
            <div className="perk-icon-wrapper">
              <Truck size={22} />
            </div>
            <div className="perk-text">
              <span className="perk-title">Free Express Shipping</span>
              <span className="perk-desc">On all orders above ₹499</span>
            </div>
          </div>

          <div className="perk-item">
            <div className="perk-icon-wrapper">
              <ShieldCheck size={22} />
            </div>
            <div className="perk-text">
              <span className="perk-title">100% Authentic Quality</span>
              <span className="perk-desc">Direct from Mithila farmers</span>
            </div>
          </div>

          <div className="perk-item">
            <div className="perk-icon-wrapper">
              <RotateCcw size={22} />
            </div>
            <div className="perk-text">
              <span className="perk-title">Hassle-Free Returns</span>
              <span className="perk-desc">Easy replacement guarantee</span>
            </div>
          </div>

          <div className="perk-item">
            <div className="perk-icon-wrapper">
              <Sparkles size={22} />
            </div>
            <div className="perk-text">
              <span className="perk-title">Hygienically Packed</span>
              <span className="perk-desc">Tamper-proof nitrogen pouches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Footer */}
      <div className="footer-main">
        <div className="container footer-grid">
          
          {/* Brand Info & Story */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo-wrap">
              <img src={logoImg} alt="Tapua Foods Logo" className="footer-logo-img" />
              <div className="footer-brand-title">
                <span className="title-main">TAPUA FOODS</span>
                <span className="title-sub">Natural Goodness • Mithila</span>
              </div>
            </div>
            <p className="footer-brand-bio">
              Tapua Foods brings the timeless agricultural heritage of Mithila straight to modern tables. Pure, unroasted Raw White Makhana, pristine dry fruits, nuts, and vitality seeds packed with uncompromising care.
            </p>
            <div className="footer-social-links">
              <a href="https://www.instagram.com/tapuafoods/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Tapua Foods on Instagram">
                <InstagramIcon />
              </a>
              <a href="https://amzn.in/d/0bffsdiy" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Tapua on Amazon India">
                <ExternalLink size={18} />
              </a>
              <a href="#facebook" className="social-link" aria-label="Tapua on Facebook">
                <FacebookIcon />
              </a>
              <a href="#twitter" className="social-link" aria-label="Tapua on Twitter">
                <TwitterIcon />
              </a>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="footer-col">
            <h4 className="footer-heading">Shop Collections</h4>
            <ul className="footer-links-list">
              <li><Link to="/shop?category=makhana">Raw White Makhana</Link></li>
              <li><Link to="/shop?category=tea">Tea & Chai Patti</Link></li>
              <li><Link to="/shop?category=dry-fruits">Dry Fruits & Nuts</Link></li>
              <li><Link to="/shop?category=seeds">Seeds & Superfoods</Link></li>
              <li><Link to="/shop?category=healthy-snacks">Healthy Snacks</Link></li>
              <li><Link to="/shop?category=gift-hampers">Gift Hampers</Link></li>
              <li><a href="https://amzn.in/d/0bffsdiy" target="_blank" rel="noopener noreferrer" style={{color: '#F4A261', fontWeight: 600}}>Buy on Amazon Prime ⚡</a></li>
            </ul>
          </div>

          {/* Column 2: Company */}
          <div className="footer-col">
            <h4 className="footer-heading">Company & Story</h4>
            <ul className="footer-links-list">
              <li><Link to="/about">Our Village Story</Link></li>
              <li><Link to="/stories">Stories & Heritage Blog</Link></li>
              <li><Link to="/recipes">Culinary Recipes</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/contact#faq">Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Column 3: Customer Support */}
          <div className="footer-col">
            <h4 className="footer-heading">Customer Care</h4>
            <ul className="footer-links-list">
              <li><Link to="/contact#shipping">Shipping & Delivery Policy</Link></li>
              <li><Link to="/contact#returns">Returns & Refunds</Link></li>
              <li><Link to="/contact#privacy">Privacy Policy</Link></li>
              <li><Link to="/contact#terms">Terms & Conditions</Link></li>
              <li><Link to="/account">Track My Order</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="footer-col footer-col-newsletter">
            <h4 className="footer-heading">Stay In The Loop</h4>
            <p className="newsletter-text">
              Subscribe for exclusive harvest updates, healthy fasting recipes, and welcome discounts.
            </p>
            <form onSubmit={handleSubscribe} className="newsletter-box">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button 
                type="submit" 
                className="btn btn-accent btn-sm newsletter-btn" 
                aria-label="Subscribe"
              >
                {subscribed ? <Check size={16} /> : <Send size={16} />}
              </button>
            </form>
            {subscribed && (
              <p className="newsletter-feedback">
                ✓ You're subscribed! Use code <strong>TAPUA10</strong> at checkout.
              </p>
            )}

            <div className="footer-contact-details">
              <div className="contact-item">
                <Mail size={15} />
                <a href="mailto:hello@tapuafoods.com" className="footer-contact-link">hello@tapuafoods.com</a>
              </div>
              <div className="contact-item">
                <Phone size={15} />
                <a href="tel:+918002752517" className="footer-contact-link">+91 80027 52517</a>
              </div>
              <div className="contact-item">
                <MapPin size={15} />
                <span>Chausa, Madhepura, Bihar, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright-text">
            © {new Date().getFullYear()} TAPUA FOODS. All rights reserved. Crafted with authentic devotion to pure ingredients.
          </p>
          <div className="footer-bottom-badges">
            <span className="secure-badge">🔒 256-Bit SSL Secure Checkout</span>
            <span className="fssai-text">FSSAI Lic. No: 10000000000022</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
