import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Heart, ShoppingBag, Check, ExternalLink, ShieldCheck, Sparkles, Bell } from 'lucide-react';
import { Rating } from '../Rating/Rating';
import { QuantitySelector } from '../QuantitySelector/QuantitySelector';
import { NotifyModal } from '../NotifyModal/NotifyModal';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import './QuickViewModal.css';

export const QuickViewModal = ({ product, isOpen, onClose }) => {
  const [selectedImg, setSelectedImg] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showNotify, setShowNotify] = useState(false);

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  useEffect(() => {
    if (product) {
      setSelectedImg(product.image);
      setQuantity(1);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    showToast(`Added ${quantity} × "${product.name}" to cart!`, 'success');
    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (!inWishlist) {
      showToast(`Added to your wishlist!`, 'success');
    } else {
      showToast(`Removed from your wishlist.`, 'info');
    }
  };

  return (
    <div className="quickview-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="quickview-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          className="quickview-close-btn"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="quickview-content-grid">
          {/* Left Media Gallery */}
          <div className="quickview-gallery">
            <div className="quickview-main-image-wrap">
              <img 
                src={selectedImg || product.image} 
                alt={product.name} 
                className="quickview-main-img"
              />
              {product.badge && (
                <span className={`product-badge badge-${product.badgeType || 'accent'} quickview-badge`}>
                  {product.badge}
                </span>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="quickview-thumbnails">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`quickview-thumb-btn ${selectedImg === img ? 'active' : ''}`}
                    onClick={() => setSelectedImg(img)}
                    aria-label={`Thumbnail ${idx + 1}`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Summary */}
          <div className="quickview-details">
            <div className="quickview-header">
              <span className="quickview-category">{product.category}</span>
              <h2 className="quickview-title">
                <Link to={`/product/${product.id}`} onClick={onClose}>
                  {product.name}
                </Link>
              </h2>

              <div className="quickview-rating-row">
                <Rating rating={product.rating} reviewsCount={product.reviewsCount} />
                {product.isComingSoon || !product.stock ? (
                  <span className="quickview-stock-tag out-of-stock">
                    <Sparkles size={14} /> Launching Soon (Pre-Launch)
                  </span>
                ) : (
                  <span className="quickview-stock-tag in-stock">
                    <ShieldCheck size={14} /> In Stock ({product.stockCount || 'Available'})
                  </span>
                )}
              </div>
            </div>

            <div className="quickview-price-section">
              <div className="quickview-price-box">
                <span className="quickview-price-current">₹{product.price}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="quickview-price-original">₹{product.originalPrice}</span>
                )}
                {product.discountPercent && (
                  <span className="quickview-discount-pill">{product.discountPercent}% OFF</span>
                )}
              </div>
              {product.weight && (
                <span className="quickview-weight-label">Pack size: <strong>{product.weight}</strong></span>
              )}
            </div>

            <p className="quickview-desc">{product.shortDescription}</p>

            {product.highlights && (
              <ul className="quickview-highlights">
                {product.highlights.slice(0, 3).map((item, idx) => (
                  <li key={idx}>
                    <Sparkles size={14} className="highlight-icon" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="quickview-actions-section">
              {product.isComingSoon || !product.stock ? (
                <div className="quickview-btn-group">
                  <button
                    type="button"
                    className="btn btn-accent btn-quickview-add"
                    onClick={() => setShowNotify(true)}
                  >
                    <Bell size={18} /> Notify Me When In Stock
                  </button>

                  <button
                    type="button"
                    className={`btn btn-secondary btn-quickview-wishlist ${inWishlist ? 'active' : ''}`}
                    onClick={handleToggleWishlist}
                    aria-label="Wishlist"
                  >
                    <Heart size={18} className={inWishlist ? 'heart-active' : ''} />
                  </button>
                </div>
              ) : (
                <>
                  <div className="quickview-qty-row">
                    <span className="qty-label">Quantity:</span>
                    <QuantitySelector 
                      quantity={quantity}
                      onIncrease={() => setQuantity((prev) => prev + 1)}
                      onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
                      max={product.stockCount || 10}
                    />
                  </div>

                  <div className="quickview-btn-group">
                    <button
                      type="button"
                      className={`btn btn-primary btn-quickview-add ${isAdding ? 'btn-adding' : ''}`}
                      onClick={handleAddToCart}
                      disabled={isAdding}
                    >
                      {isAdding ? (
                        <>
                          <Check size={18} /> Added to Cart
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={18} /> Add to Cart — ₹{product.price * quantity}
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className={`btn btn-secondary btn-quickview-wishlist ${inWishlist ? 'active' : ''}`}
                      onClick={handleToggleWishlist}
                      aria-label="Wishlist"
                    >
                      <Heart size={18} className={inWishlist ? 'heart-active' : ''} />
                    </button>
                  </div>
                </>
              )}

              <Link 
                to={`/product/${product.id}`}
                className="quickview-view-full"
                onClick={onClose}
              >
                <span>View Full Product Details & Nutritional Facts</span>
                <ExternalLink size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <NotifyModal
        product={product}
        isOpen={showNotify}
        onClose={() => setShowNotify(false)}
      />
    </div>
  );
};
