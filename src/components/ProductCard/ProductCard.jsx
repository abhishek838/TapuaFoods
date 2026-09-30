import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Check, Eye, Bell } from 'lucide-react';
import { Rating } from '../Rating/Rating';
import { QuickViewModal } from '../QuickViewModal/QuickViewModal';
import { NotifyModal } from '../NotifyModal/NotifyModal';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const navigate = useNavigate();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(product, 1);
    showToast(`Added "${product.name}" to cart!`, 'success');
    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!inWishlist) {
      showToast(`Added to your wishlist!`, 'success');
    } else {
      showToast(`Removed from your wishlist.`, 'info');
    }
  };

  const handleOpenQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <article className="product-card card-hover">
        {/* Product Image & Badges Container */}
        <div className="product-card-media">
          <Link to={`/product/${product.id}`} className="product-card-link">
            <img
              src={product.image}
              alt={product.name}
              className="product-card-img"
              loading="lazy"
            />
          </Link>

          {/* Badge (Bestseller, Organic, Superfood, etc.) */}
          {product.badge && (
            <span className={`product-badge badge-${product.badgeType || 'accent'}`}>
              {product.badge}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            className={`card-action-btn wishlist-toggle ${inWishlist ? 'active' : ''}`}
            onClick={handleToggleWishlist}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={17} className={inWishlist ? "heart-active" : ""} />
          </button>

          {/* Quick View Button */}
          <button
            type="button"
            className="card-action-btn quick-view-btn"
            onClick={handleOpenQuickView}
            aria-label="Quick preview of product"
          >
            <Eye size={17} />
          </button>

          {/* Weight Tag */}
          {product.weight && (
            <span className="product-weight-tag">{product.weight}</span>
          )}
        </div>

      {/* Product Content Details */}
      <div className="product-card-body">
        <span className="product-card-category">{product.category}</span>

        <h3 className="product-card-title">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>

        <p className="product-card-short-desc">{product.shortDescription}</p>

        {/* Rating and Reviews */}
        <div className="product-card-rating">
          <Rating rating={product.rating} reviewsCount={product.reviewsCount} />
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="product-card-footer">
          <div className="product-pricing">
            <div className="price-row">
              <span className="price-current">₹{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="price-original">₹{product.originalPrice}</span>
              )}
            </div>
            {product.discountPercent && (
              <span className="discount-tag">{product.discountPercent}% OFF</span>
            )}
          </div>

          {product.isComingSoon || !product.stock ? (
            <button
              type="button"
              className="btn btn-sm btn-notify-trigger"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowNotifyModal(true);
              }}
              title="Get notified when this item drops"
            >
              <Bell size={13} />
              <span>Notify Me</span>
            </button>
          ) : (
            <button
              type="button"
              className={`btn btn-sm btn-cart ${isAdding ? 'btn-adding' : 'btn-primary'}`}
              onClick={handleAddToCart}
              disabled={!product.stock || isAdding}
            >
              {isAdding ? (
                <>
                  <Check size={16} /> Added
                </>
              ) : (
                <>
                  <ShoppingBag size={15} /> Add
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>

    {showQuickView && (
      <QuickViewModal 
        product={product} 
        isOpen={showQuickView} 
        onClose={() => setShowQuickView(false)} 
      />
    )}

    {showNotifyModal && (
      <NotifyModal
        product={product}
        isOpen={showNotifyModal}
        onClose={() => setShowNotifyModal(false)}
      />
    )}
  </>
  );
};
