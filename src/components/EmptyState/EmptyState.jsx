import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Search, Heart, PackageOpen } from 'lucide-react';
import './EmptyState.css';

export const EmptyState = ({
  icon = 'cart',
  title = "No Items Found",
  message = "Explore our premium selection and find something wholesome.",
  actionText = "Start Shopping",
  actionLink = "/shop"
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'search':
        return <Search size={44} className="empty-state-svg" />;
      case 'wishlist':
        return <Heart size={44} className="empty-state-svg" />;
      case 'order':
        return <PackageOpen size={44} className="empty-state-svg" />;
      case 'cart':
      default:
        return <ShoppingBag size={44} className="empty-state-svg" />;
    }
  };

  return (
    <div className="empty-state-card animate-fade-in">
      <div className="empty-state-icon-circle">
        {renderIcon()}
      </div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary btn-sm empty-state-btn">
          {actionText}
        </Link>
      )}
    </div>
  );
};
