import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home } from 'lucide-react';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container not-found-content animate-fade-in">
        <div className="not-found-badge">404 Error</div>
        <div className="not-found-icon-box">
          <Compass size={64} className="compass-icon" />
        </div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page you are looking for may have been moved, renamed, or is temporarily unavailable. Let's get you back on track to wholesome snacking.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Back to Homepage
          </Link>
          <Link to="/shop" className="btn btn-secondary btn-lg">
            Explore All Products <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};
