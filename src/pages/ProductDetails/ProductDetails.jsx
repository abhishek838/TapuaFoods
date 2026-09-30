import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  ShoppingBag, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Check, 
  ChevronRight, 
  MapPin, 
  Share2,
  Bell,
  ExternalLink
} from 'lucide-react';
import { productService } from '../../services/productService';
import { Rating } from '../../components/Rating/Rating';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { NotifyModal } from '../../components/NotifyModal/NotifyModal';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import './ProductDetails.css';

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pinCode, setPinCode] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 480) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const prod = await productService.getProductById(id);
        setProduct(prod);
        setSelectedImage(prod.image);
        setQuantity(1);

        const related = await productService.getRelatedProducts(prod.id, prod.categorySlug, 4);
        setRelatedProducts(related);
      } catch (err) {
        console.error('Error fetching product', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="product-details-loading container">
        <div className="skeleton-box"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container not-found-wrapper">
        <h2>Product Not Found</h2>
        <p>The product you are looking for does not exist or has been retired.</p>
        <Link to="/shop" className="btn btn-primary">Browse All Products</Link>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, quantity);
    showToast(`Added ${quantity} × "${product.name}" to cart!`, 'success');
    setTimeout(() => setIsAdding(false), 700);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleCheckDelivery = (e) => {
    e.preventDefault();
    if (pinCode.length === 6 && /^\d+$/.test(pinCode)) {
      setDeliveryEstimate(`Delivering to ${pinCode} in 3–4 business days (FREE delivery eligible)`);
    } else {
      setDeliveryEstimate('Please enter a valid 6-digit Indian PIN code');
    }
  };

  return (
    <div className="product-details-page">
      {/* Breadcrumb Navigation */}
      <div className="container breadcrumb-container">
        <nav className="breadcrumb-nav" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} />
          <Link to="/shop">Shop</Link>
          <ChevronRight size={14} />
          <Link to={`/shop?category=${product.categorySlug}`}>{product.category}</Link>
          <ChevronRight size={14} />
          <span className="breadcrumb-current">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Showcase Section */}
      <section className="container product-hero-grid">
        {/* Left: Product Image Gallery */}
        <div className="product-gallery">
          <div className="product-main-image-frame">
            <img
              src={selectedImage || product.image}
              alt={product.name}
              className="product-main-img"
            />
            {product.badge && (
              <span className={`product-gallery-badge badge-${product.badgeType || 'accent'}`}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="product-thumbnails-strip">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbnail-btn ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt={`${product.name} thumbnail ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Actions */}
        <div className="product-info-panel">
          <div className="info-header">
            <span className="product-category-tag">{product.category}</span>
            <div className="product-actions-top">
              <button
                className={`top-action-btn ${inWishlist ? 'active' : ''}`}
                onClick={() => toggleWishlist(product)}
                aria-label="Wishlist toggle"
              >
                <Heart size={18} className={inWishlist ? "heart-active" : ""} />
              </button>
            </div>
          </div>

          <h1 className="product-title">{product.name}</h1>

          {/* Rating */}
          <div className="product-rating-row">
            <Rating rating={product.rating} reviewsCount={product.reviewsCount} size={18} />
            <span className="verified-badge">✓ Verified Genuine Product</span>
          </div>

          {/* Pricing */}
          <div className="product-price-box">
            <div className="price-main-row">
              <span className="price-big">₹{product.price}</span>
              {product.originalPrice && (
                <span className="mrp-strikethrough">MRP: ₹{product.originalPrice}</span>
              )}
              {product.discountPercent && (
                <span className="save-badge">Save {product.discountPercent}%</span>
              )}
            </div>
            <span className="tax-inclusive-tag">Inclusive of all taxes</span>
          </div>

          {/* Short description */}
          <p className="product-short-description">{product.shortDescription}</p>

          {/* Pack Weight & Highlights */}
          {product.weight && (
            <div className="pack-size-selector">
              <span className="selector-label">Net Quantity:</span>
              <div className="size-pill active">{product.weight}</div>
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="purchase-controls">
            {product.isComingSoon || !product.stock ? (
              <div className="coming-soon-details-panel">
                <div className="coming-soon-callout">
                  <div className="coming-soon-badge-row">
                    <span className="badge badge-accent">PRE-LAUNCH PREVIEW</span>
                    <span className="callout-tag">Currently In Trial Batches</span>
                  </div>
                  <p className="coming-soon-note">
                    This artisanal flavour is currently in development at our Mithila craft facility. Pre-register your interest to receive first access when the limited batch launches.
                  </p>
                </div>

                <div className="cta-button-group">
                  <button
                    type="button"
                    className="btn btn-lg btn-accent btn-notify-detail"
                    onClick={() => setIsNotifyOpen(true)}
                  >
                    <Bell size={18} /> Notify Me on Launch (Get 15% Off)
                  </button>

                  {product.amazonUrl && (
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-lg btn-amazon"
                    >
                      <ExternalLink size={18} /> Check on Amazon
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="quantity-wrapper">
                  <span className="qty-label">Quantity:</span>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity(q => q + 1)}
                    onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                    size="large"
                  />
                </div>

                <div className="cta-button-group">
                  <button
                    className={`btn btn-lg btn-primary btn-add-cart ${isAdding ? 'btn-adding' : ''}`}
                    onClick={handleAddToCart}
                    disabled={!product.stock || isAdding}
                  >
                    {isAdding ? (
                      <>
                        <Check size={18} /> Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} /> Add to Cart
                      </>
                    )}
                  </button>

                  <button
                    className="btn btn-lg btn-accent btn-buy-now"
                    onClick={handleBuyNow}
                    disabled={!product.stock}
                  >
                    Buy Now
                  </button>

                  {product.amazonUrl && (
                    <a
                      href={product.amazonUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-lg btn-amazon"
                      title="Buy directly with Amazon Prime delivery"
                    >
                      <ExternalLink size={18} /> Buy on Amazon Prime
                    </a>
                  )}
                </div>
              </>
            )}
          </div>

          {/* PIN code delivery checker */}
          <div className="pincode-checker-box">
            <div className="pincode-header">
              <MapPin size={16} className="pincode-icon" />
              <span>Check Delivery Speed to Your Location:</span>
            </div>
            <form onSubmit={handleCheckDelivery} className="pincode-form">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter 6-digit PIN code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="pincode-input"
              />
              <button type="submit" className="btn btn-secondary btn-sm">Check</button>
            </form>
            {deliveryEstimate && (
              <p className="delivery-result-text">{deliveryEstimate}</p>
            )}
          </div>

          {/* Trust Guarantees */}
          <div className="product-trust-strip">
            <div className="trust-item">
              <ShieldCheck size={18} className="trust-icon" />
              <span>100% Authentic Quality</span>
            </div>
            <div className="trust-item">
              <Truck size={18} className="trust-icon" />
              <span>Free Delivery Above ₹499</span>
            </div>
            <div className="trust-item">
              <RotateCcw size={18} className="trust-icon" />
              <span>7-Day Easy Replacement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section: Description, Nutrition, Sourcing, Reviews */}
      <section className="container product-tabs-section">
        <div className="tabs-nav-bar">
          <button
            className={`tab-link ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description & Highlights
          </button>
          <button
            className={`tab-link ${activeTab === 'nutrition' ? 'active' : ''}`}
            onClick={() => setActiveTab('nutrition')}
          >
            Nutritional Facts
          </button>
          <button
            className={`tab-link ${activeTab === 'sourcing' ? 'active' : ''}`}
            onClick={() => setActiveTab('sourcing')}
          >
            Sourcing & Packaging
          </button>
          <button
            className={`tab-link ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Customer Reviews ({product.reviewsCount})
          </button>
        </div>

        <div className="tab-content-card">
          {activeTab === 'description' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="tab-heading">About {product.name}</h3>
              <p className="tab-body-text">{product.description}</p>

              {product.highlights && (
                <div className="highlights-box">
                  <h4>Product Highlights</h4>
                  <ul className="highlights-list">
                    {product.highlights.map((h, i) => (
                      <li key={i}>
                        <Check size={16} className="highlight-check" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="meta-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Ingredients:</span>
                  <span className="spec-val">{product.ingredients}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Shelf Life:</span>
                  <span className="spec-val">{product.shelfLife}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Country of Origin:</span>
                  <span className="spec-val">{product.origin}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'nutrition' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="tab-heading">Nutritional Values (Approximate)</h3>
              <p className="nutrition-intro">
                Laboratory verified nutritional values per serving and per 100g, preserved with nitrogen flush packaging.
              </p>
              {product.nutritionalFacts ? (
                <div className="nutrition-table-wrapper">
                  <table className="nutrition-table">
                    <thead>
                      <tr>
                        <th>Nutrient Parameter</th>
                        <th>Per 100g</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(product.nutritionalFacts).map(([key, val]) => (
                        <tr key={key}>
                          <td className="nutrient-name">
                            {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                          </td>
                          <td className="nutrient-val">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Nutritional facts available on physical packaging.</p>
              )}
            </div>
          )}

          {activeTab === 'sourcing' && (
            <div className="tab-pane animate-fade-in">
              <h3 className="tab-heading">Ethical Wetland Sourcing & Quality Control</h3>
              <p className="tab-body-text">
                Tapua Foods operates directly at the primary agricultural source in Mithila, Bihar. Our Raw White Makhana is naturally cultivated in freshwater wetland ponds by multi-generational farming families without synthetic growth accelerants.
              </p>
              <div className="quality-steps-grid">
                <div className="step-card">
                  <div className="step-num">1</div>
                  <h4>Deep Pond Harvesting</h4>
                  <p>Hand-collected seeds from the pond bed at sunrise by skilled Mithila harvesters.</p>
                </div>
                <div className="step-card">
                  <div className="step-num">2</div>
                  <h4>Gentle Sun-Drying</h4>
                  <p>Naturally sun-cured on clean bamboo mats to preserve vital dietary fiber and vitamins.</p>
                </div>
                <div className="step-card">
                  <div className="step-num">3</div>
                  <h4>Hygienic Packaging</h4>
                  <p>Sealed in multi-barrier pouches at our certified food facility to prevent oxidation.</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="tab-pane animate-fade-in">
              <div className="reviews-tab-header">
                <div>
                  <h3 className="tab-heading">Patron Ratings & Experiences</h3>
                  <div className="overall-score-row">
                    <span className="score-num">{product.rating}</span>
                    <Rating rating={product.rating} reviewsCount={product.reviewsCount} size={20} />
                  </div>
                </div>
                <div className="demo-notice-pill">
                  * Pre-production demo reviews
                </div>
              </div>

              <div className="reviews-list">
                <div className="review-item">
                  <div className="review-item-header">
                    <strong>Priyanka Deshmukh</strong>
                    <span className="review-date">3 days ago</span>
                  </div>
                  <Rating rating={5} showCount={false} />
                  <p className="review-text">
                    Exceptional crunch and completely clean. We use this Raw White Makhana for fasting and roasting at home with pure cow ghee and rock salt.
                  </p>
                </div>

                <div className="review-item">
                  <div className="review-item-header">
                    <strong>Rohan Sen</strong>
                    <span className="review-date">2 weeks ago</span>
                  </div>
                  <Rating rating={5} showCount={false} />
                  <p className="review-text">
                    The quality matches the promise. Fresh, uniform large sizes and zero bitter seeds.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <section className="container related-products-section">
          <div className="section-header">
            <span className="section-tag">Pair With</span>
            <h2 className="section-title">You May Also Like</h2>
          </div>
          <div className="products-grid">
            {relatedProducts.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Floating Sticky Mobile Action Bar */}
      {showStickyBar && (
        <aside className="sticky-mobile-bar" aria-label="Quick Add Bar">
          <div className="sticky-mobile-bar-inner container">
            <div className="sticky-product-info">
              <img 
                src={selectedImage || product.image} 
                alt={product.name} 
                className="sticky-bar-thumb" 
              />
              <div className="sticky-bar-text">
                <span className="sticky-bar-title">{product.name}</span>
                <span className="sticky-bar-price">₹{product.price}</span>
              </div>
            </div>
            <div className="sticky-bar-actions">
              {product.isComingSoon || !product.stock ? (
                <button
                  type="button"
                  className="btn btn-accent btn-sm sticky-btn-buy"
                  onClick={() => setIsNotifyOpen(true)}
                >
                  <Bell size={15} />
                  <span>Notify Me</span>
                </button>
              ) : (
                <>
                  <button 
                    type="button"
                    className={`btn btn-primary btn-sm sticky-btn-cart ${isAdding ? 'btn-adding' : ''}`}
                    onClick={handleAddToCart}
                    disabled={!product.stock || isAdding}
                  >
                    {isAdding ? <Check size={16} /> : <ShoppingBag size={16} />}
                    <span>{isAdding ? 'Added' : 'Add to Cart'}</span>
                  </button>
                  <button 
                    type="button"
                    className="btn btn-accent btn-sm sticky-btn-buy"
                    onClick={handleBuyNow}
                    disabled={!product.stock}
                  >
                    Buy Now
                  </button>
                </>
              )}
            </div>
          </div>
        </aside>
      )}

      {/* Notify Modal for Coming Soon Products */}
      <NotifyModal
        product={product}
        isOpen={isNotifyOpen}
        onClose={() => setIsNotifyOpen(false)}
      />
    </div>
  );
};
