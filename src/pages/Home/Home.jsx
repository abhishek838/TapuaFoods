import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  ShieldCheck, 
  Award, 
  HeartHandshake, 
  Leaf,
  ChevronRight,
  Star,
  Quote,
  Clock,
  Flame,
  Calendar,
  ExternalLink,
  ShoppingBag,
  Bell
} from 'lucide-react';
import { productService } from '../../services/productService';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { CategoryCard } from '../../components/CategoryCard/CategoryCard';
import { ProductSlider } from '../../components/ProductSlider/ProductSlider';
import { MadhubaniSection } from '../../components/MadhubaniSection/MadhubaniSection';
import { VillageStorySection } from '../../components/VillageStorySection/VillageStorySection';
import { OurRange } from '../../components/OurRange/OurRange';
import { NotifyModal } from '../../components/NotifyModal/NotifyModal';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import { DEMO_REVIEWS } from '../../data/reviews';
import { RECIPES } from '../../data/recipes';
import { STORIES } from '../../data/stories';
import heroMakhanaStageImg from '../../assets/images/hero-makhana-stage.jpg';
import frontPackImg from '../../assets/images/tapua-front-pack.png';
import teaCtcImg from '../../assets/images/tea-ctc-assam.jpg';
import teaElaichiImg from '../../assets/images/tea-elaichi-masala.jpg';
import makhanaPeriPeriImg from '../../assets/images/makhana-peri-peri.jpg';
import hamperImg from '../../assets/images/gift-hamper-royal.jpg';
import almondsImg from '../../assets/images/almonds-california.jpg';
import cashewsImg from '../../assets/images/cashews-w240.jpg';
import pumpkinSeedsImg from '../../assets/images/pumpkin-seeds-green.jpg';
import chiaSeedsImg from '../../assets/images/chia-seeds.jpg';
import healthySnacksImg from '../../assets/images/healthy-snacks-mix.jpg';
import datesImg from '../../assets/images/medjool-dates.jpg';
import './Home.css';

export const Home = () => {
  const [categories, setCategories] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [notifyProduct, setNotifyProduct] = useState(null);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const HERO_ITEMS = [
    {
      id: 'makhana',
      tabLabel: '🪷 Raw White Makhana',
      name: 'Mithila Raw White Makhana (GI-Tagged)',
      category: 'Flagship GI-Tagged Harvest',
      originTag: 'GI-Tagged Mithila',
      subTag: 'Wetland Harvest, Bihar',
      purityTag: '100% Raw & Unroasted',
      farmTag: 'Direct Mallah Farmers',
      price: 249,
      mrp: 299,
      save: '17%',
      image: heroMakhanaStageImg,
      amazonUrl: 'https://amzn.in/d/0bffsdiy',
      isComingSoon: false,
      productObj: {
        id: 1,
        name: 'Single-Origin Raw White Makhana',
        price: 249,
        image: frontPackImg,
        weight: '250g Pouch',
        category: 'Makhana'
      }
    },
    {
      id: 'tea',
      tabLabel: '🍵 Assam CTC Tea',
      name: 'Tapua Royal Assam CTC Leaf Tea',
      category: 'Estate Harvest Chai',
      originTag: 'Upper Assam Valley',
      subTag: 'Orthodox Golden Tips',
      purityTag: 'Single Estate Harvest',
      farmTag: 'Airtight Keepsake Tin',
      price: 249,
      mrp: 299,
      save: '17%',
      image: teaCtcImg,
      amazonUrl: null,
      isComingSoon: false,
      productObj: {
        id: 19,
        name: 'Tapua Royal Assam CTC Leaf Tea (Gold Blend)',
        price: 249,
        image: teaCtcImg,
        weight: '200g Tin Canister',
        category: 'Tea & Chai'
      }
    },
    {
      id: 'periperi',
      tabLabel: '🌶️ Peri Peri Makhana',
      name: 'Tapua Spiced Peri Peri Roasted Makhana',
      category: 'Gourmet Snacking Line',
      originTag: 'Artisanal Craft Blend',
      subTag: 'Olive Oil Roasted',
      purityTag: 'African Bird\'s Eye Chili',
      farmTag: 'Pre-Launch VIP Preview',
      price: 149,
      mrp: 180,
      save: '17%',
      image: makhanaPeriPeriImg,
      amazonUrl: null,
      isComingSoon: true,
      productObj: {
        id: 21,
        name: 'Tapua Spiced Peri Peri Roasted Makhana',
        price: 149,
        image: makhanaPeriPeriImg,
        weight: '70g Snack Pouch',
        category: 'Flavoured Makhana'
      }
    },
    {
      id: 'masala',
      tabLabel: '☕ Masala Chai',
      name: 'Tapua Shahi Elaichi & Spices Chai',
      category: 'Whole Spice Infusion',
      originTag: 'Kerala & Assam Origin',
      subTag: 'Crushed Idukki Elaichi',
      purityTag: 'Whole Spices Infused',
      farmTag: 'Terracotta Tin Canister',
      price: 299,
      mrp: 350,
      save: '15%',
      image: teaElaichiImg,
      amazonUrl: null,
      isComingSoon: false,
      productObj: {
        id: 20,
        name: 'Tapua Shahi Elaichi & Spices Masala Chai Patti',
        price: 299,
        image: teaElaichiImg,
        weight: '250g Luxury Tin',
        category: 'Tea & Chai'
      }
    }
  ];

  const currentHero = HERO_ITEMS[activeHeroIdx];

  const handleQuickAdd = (heroItem) => {
    if (heroItem.productObj) {
      addToCart(heroItem.productObj, 1);
      showToast(`Added "${heroItem.name}" to cart!`, 'success');
    }
  };

  const handleNotifyHero = (heroItem) => {
    setNotifyProduct(heroItem.productObj || { name: heroItem.name });
    setIsNotifyOpen(true);
  };

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const [cats, featured, bestsellers] = await Promise.all([
          productService.getCategories(),
          productService.getFeaturedProducts(),
          productService.getBestsellers()
        ]);
        setCategories(cats);
        setFeaturedProducts(featured);
        setBestsellerProducts(bestsellers);
      } catch (err) {
        console.error('Failed to load homepage data', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  const filteredFeatured = activeTab === 'all'
    ? featuredProducts
    : featuredProducts.filter(p => p.categorySlug === activeTab);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-tag animate-fade-in">
              <Leaf size={14} className="hero-tag-icon" />
              <span>Authentic Mithila GI-Region Harvest</span>
            </div>

            <h1 className="hero-title animate-fade-in">
              Natural Goodness, <br />
              <span className="hero-title-accent">Packed for You</span>
            </h1>

            <p className="hero-subtitle animate-fade-in">
              Premium makhana, dry fruits, nuts and healthy snacks for everyday goodness. Pure, unadulterated nourishment direct from wetland ponds to your doorstep.
            </p>

            <div className="hero-cta-group animate-fade-in">
              <Link to="/shop" className="btn btn-accent btn-lg hero-cta-primary">
                Shop Now <ArrowRight size={18} />
              </Link>
              <a href="#categories" className="btn btn-secondary btn-lg hero-cta-secondary">
                Explore Categories
              </a>
            </div>

            {/* Quick Hero Highlights */}
            <div className="hero-highlights">
              <div className="highlight-pill">
                <CheckCircle size={15} className="pill-icon" />
                <span>100% Raw Makhana</span>
              </div>
              <div className="highlight-pill">
                <CheckCircle size={15} className="pill-icon" />
                <span>Zero Preservatives</span>
              </div>
              <div className="highlight-pill">
                <CheckCircle size={15} className="pill-icon" />
                <span>Farmer Sourced</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-wrapper animate-fade-in">
            <div className="hero-stage-card">
              <div className="hero-stage-image-wrap">
                <img
                  src={currentHero.image}
                  alt={currentHero.name}
                  className="hero-stage-img"
                  key={currentHero.id}
                />

                {/* Floating Heritage Origin Badge - Top Left */}
                <div className="hero-float-badge badge-top-left">
                  <div className="badge-glow-icon">
                    <Sparkles size={15} />
                  </div>
                  <div className="badge-meta">
                    <span className="badge-title">{currentHero.originTag}</span>
                    <span className="badge-subtitle">{currentHero.subTag}</span>
                  </div>
                </div>

                {/* Floating Purity Guarantee Badge - Top Right */}
                <div className="hero-float-badge badge-top-right">
                  <div className="badge-glow-icon badge-icon-gold">
                    <ShieldCheck size={15} />
                  </div>
                  <div className="badge-meta">
                    <span className="badge-title">{currentHero.purityTag}</span>
                    <span className="badge-subtitle">{currentHero.farmTag}</span>
                  </div>
                </div>

                {/* Floating Interactive Action Card - Bottom */}
                <div className="hero-float-action-card">
                  <div className="action-card-info">
                    <span className="action-card-category">{currentHero.category}</span>
                    <h3 className="action-card-title">{currentHero.name}</h3>
                    <div className="action-card-pricing">
                      <span className="action-card-price">₹{currentHero.price}</span>
                      {currentHero.mrp && <span className="action-card-mrp">MRP ₹{currentHero.mrp}</span>}
                      {currentHero.save && <span className="action-card-save">Save {currentHero.save}</span>}
                    </div>
                  </div>

                  <div className="action-card-buttons">
                    {currentHero.amazonUrl ? (
                      <a
                        href={currentHero.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-amazon-hero"
                        title="Buy directly on Amazon India with Prime delivery"
                      >
                        <ExternalLink size={14} /> Buy on Amazon
                      </a>
                    ) : currentHero.isComingSoon ? (
                      <button
                        type="button"
                        className="btn btn-notify-hero"
                        onClick={() => handleNotifyHero(currentHero)}
                      >
                        <Bell size={14} /> Notify Me
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary btn-hero-quick-add"
                        onClick={() => handleQuickAdd(currentHero)}
                      >
                        <ShoppingBag size={14} /> Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Showcase Tabs Switcher */}
            <div className="hero-stage-selector" role="tablist" aria-label="Featured Harvest Showcase">
              {HERO_ITEMS.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeHeroIdx === idx}
                  className={`hero-selector-tab ${activeHeroIdx === idx ? 'active' : ''}`}
                  onClick={() => setActiveHeroIdx(idx)}
                >
                  <span className="tab-indicator"></span>
                  <span className="tab-label">{item.tabLabel}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST VALUE PROPOSITIONS STRIP */}
      <section className="trust-strip">
        <div className="container trust-strip-grid">
          <div className="trust-strip-item">
            <Award size={24} className="trust-icon" />
            <div>
              <h4 className="trust-title">Premium Quality</h4>
              <p className="trust-desc">Graded for size and pristine freshness</p>
            </div>
          </div>
          <div className="trust-strip-item">
            <Leaf size={24} className="trust-icon" />
            <div>
              <h4 className="trust-title">Carefully Selected</h4>
              <p className="trust-desc">Natural ingredients with zero chemical processing</p>
            </div>
          </div>
          <div className="trust-strip-item">
            <ShieldCheck size={24} className="trust-icon" />
            <div>
              <h4 className="trust-title">Hygienically Packed</h4>
              <p className="trust-desc">Sealed in food-grade, airtight pouches</p>
            </div>
          </div>
          <div className="trust-strip-item">
            <HeartHandshake size={24} className="trust-icon" />
            <div>
              <h4 className="trust-title">Quality You Can Trust</h4>
              <p className="trust-desc">Honest Indian nutrition for your whole family</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section id="categories" className="section categories-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">
              <Sparkles size={13} /> Our Range
            </span>
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              From our signature Mithila Raw White Makhana to California almonds and organic superseeds.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* 3b. OUR RANGE — PURE FOODS FROM ACROSS BHARAT */}
      <OurRange />

      {/* 4. FEATURED PRODUCTS */}
      <section className="section featured-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Handpicked Selections</span>
            <h2 className="section-title">Featured Products</h2>
            <p className="section-subtitle">
              Everyday healthy snacking essentials loved by mindful eaters across India.
            </p>

            {/* Filter Tabs */}
            <div className="featured-tabs">
              <button
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Featured
              </button>
              <button
                className={`tab-btn ${activeTab === 'makhana' ? 'active' : ''}`}
                onClick={() => setActiveTab('makhana')}
              >
                Raw Makhana
              </button>
              <button
                className={`tab-btn ${activeTab === 'nuts' ? 'active' : ''}`}
                onClick={() => setActiveTab('nuts')}
              >
                Nuts & Dry Fruits
              </button>
              <button
                className={`tab-btn ${activeTab === 'gift-hampers' ? 'active' : ''}`}
                onClick={() => setActiveTab('gift-hampers')}
              >
                Gift Hampers
              </button>
            </div>
          </div>

          <div className="products-grid">
            {filteredFeatured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="section-bottom-cta">
            <Link to="/shop" className="btn btn-secondary btn-lg">
              View All Products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE TAPUA */}
      <section className="section why-tapua-section">
        <div className="container why-tapua-container">
          <div className="why-tapua-text">
            <span className="section-tag">The Tapua Promise</span>
            <h2 className="why-title">Why Choose Tapua Foods?</h2>
            <p className="why-lead">
              We started with a single conviction: authentic Indian superfoods deserve to reach your kitchen in their purest, most natural state.
            </p>

            <div className="why-points-list">
              <div className="why-point">
                <div className="why-point-num">01</div>
                <div>
                  <h4 className="why-point-title">Authentic Mithila Heritage</h4>
                  <p className="why-point-desc">
                    Over 85% of the world's premium makhana is harvested in Mithila. We work hand-in-hand with traditional wetland cultivators who preserve indigenous farming practices.
                  </p>
                </div>
              </div>

              <div className="why-point">
                <div className="why-point-num">02</div>
                <div>
                  <h4 className="why-point-title">Pure Raw White Makhana (Unroasted)</h4>
                  <p className="why-point-desc">
                    Unlike heavily oiled or chemically seasoned snacks, our flagship product is genuine 100% Raw White Makhana, ready for clean fasting recipes and custom roasting.
                  </p>
                </div>
              </div>

              <div className="why-point">
                <div className="why-point-num">03</div>
                <div>
                  <h4 className="why-point-title">Hygienic Multi-Barrier Packaging</h4>
                  <p className="why-point-desc">
                    Every batch undergoes multi-stage manual grading and is sealed in moisture-proof packaging to lock in crispness and delicate natural flavour.
                  </p>
                </div>
              </div>
            </div>

            <Link to="/about" className="btn btn-primary why-learn-btn">
              Discover Our Story <ArrowRight size={16} />
            </Link>
          </div>

          <div className="why-tapua-visual">
            <div className="why-image-card">
              <img
                src={almondsImg}
                alt="Tapua Foods Fresh Ingredients"
                className="why-main-img"
              />
              <div className="why-accent-box">
                <span className="accent-num">100%</span>
                <span className="accent-label">Natural & Raw Ingredients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5b. THE ART OF MITHILA — MADHUBANI SECTION */}
      <MadhubaniSection />

      {/* 5c. OUR STORY — NAMED AFTER A REAL VILLAGE IN BIHAR */}
      <VillageStorySection />

      {/* 6. PROMOTIONAL BANNER */}
      <section className="promo-banner-section">
        <div className="container">
          <div className="promo-banner-card">
            <div className="promo-banner-content">
              <span className="promo-tag">Special Collection</span>
              <h2 className="promo-title">Good Food. Better Choices.</h2>
              <p className="promo-subtitle">
                Gift your loved ones the blessings of vibrant wellness. Discover our handcrafted festive boxes featuring Raw Makhana, royal cashews, and California almonds.
              </p>
              <Link to="/shop?category=gift-hampers" className="btn btn-accent btn-lg promo-cta">
                Explore Our Collection <ArrowRight size={18} />
              </Link>
            </div>
            <div className="promo-banner-image">
              <img src={hamperImg} alt="Tapua Royal Gift Box" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. BEST SELLERS CAROUSEL / SLIDER */}
      <section className="section bestsellers-section">
        <div className="container">
          <ProductSlider
            products={bestsellerProducts}
            title="Our Bestsellers"
            subtitle="Most ordered superfoods loved by thousands of health-conscious families."
          />
        </div>
      </section>

      {/* 7b. WHESOME CULINARY RECIPES SPOTLIGHT */}
      <section className="section recipes-spotlight-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-tag"><Sparkles size={13} /> The Artisanal Kitchen</span>
              <h2 className="section-title">Wholesome Makhana Recipes</h2>
              <p className="section-subtitle">
                From traditional festive kheer to 5-minute morning smoothies — clean, wholesome cooking.
              </p>
            </div>
            <Link to="/recipes" className="btn btn-secondary btn-header-cta">
              <span>View All Recipes</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="recipes-spotlight-grid">
            {RECIPES.slice(0, 3).map((recipe) => (
              <article key={recipe.id} className="recipe-spotlight-card">
                <div className="spotlight-media">
                  <img src={recipe.image} alt={recipe.title} loading="lazy" />
                </div>
                <div className="spotlight-body">
                  <div className="spotlight-meta-row">
                    <span className="spotlight-cat">{recipe.category}</span>
                    <span className="spotlight-time-pill"><Clock size={12} /> {recipe.totalTime}</span>
                  </div>
                  <h3 className="spotlight-title">{recipe.title}</h3>
                  <p className="spotlight-desc">{recipe.shortDescription}</p>
                  <Link to="/recipes" className="spotlight-link">
                    <span>Read Full Recipe</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7c. STORIES FROM MITHILA SPOTLIGHT */}
      <section className="section stories-spotlight-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="section-tag"><Sparkles size={13} /> Sacred Wetlands & Culture</span>
              <h2 className="section-title">Stories from Mithila</h2>
              <p className="section-subtitle">
                Heritage chronicles, Mallah farmer stories, and superfood nutrition research.
              </p>
            </div>
            <Link to="/stories" className="btn btn-secondary btn-header-cta">
              <span>Explore All Stories</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="stories-spotlight-grid">
            {STORIES.slice(0, 3).map((story) => (
              <article key={story.id} className="story-spotlight-card">
                <div className="story-spotlight-media">
                  <img src={story.image} alt={story.title} loading="lazy" />
                  <span className="story-spotlight-cat">{story.category}</span>
                </div>
                <div className="story-spotlight-body">
                  <span className="story-spotlight-date"><Calendar size={12} /> {story.date}</span>
                  <h3 className="story-spotlight-title">{story.title}</h3>
                  <p className="story-spotlight-excerpt">{story.excerpt}</p>
                  <div className="story-spotlight-footer">
                    <Link to="/stories" className="story-spotlight-btn">
                      <span>Read Story</span>
                      <ArrowRight size={14} />
                    </Link>
                    {story.amazonUrl && (
                      <a href={story.amazonUrl} target="_blank" rel="noopener noreferrer" className="amazon-pill-small">
                        <span>Amazon Prime</span>
                        <ExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7d. AMAZON PRIME BANNER */}
      <section className="amazon-prime-banner">
        <div className="container amazon-banner-container">
          <div className="amazon-banner-text">
            <span className="amazon-badge-tag">OFFICIAL STORE ON AMAZON INDIA</span>
            <h3 className="amazon-banner-title">Need Makhana Delivered in 48 Hours?</h3>
            <p className="amazon-banner-desc">Tapua Foods single-origin Raw White Makhana is officially live on Amazon India with Amazon Prime express delivery across India.</p>
          </div>
          <a 
            href="https://amzn.in/d/0bffsdiy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-amazon-prime"
          >
            <span>Buy on Amazon Prime</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </section>

      {/* 8. CUSTOMER REVIEWS (DEMO DATA CLEARLY LABELED) */}
      <section className="section reviews-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Customer Voices</span>
            <h2 className="section-title">What Our Patrons Say</h2>
            <div className="demo-data-badge-notice">
              <span>* DEMO REVIEWS • Pre-production preview data</span>
            </div>
          </div>

          <div className="reviews-grid">
            {DEMO_REVIEWS.map((rev) => (
              <div key={rev.id} className="review-card">
                <Quote size={28} className="review-quote-icon" />
                <div className="review-rating-row">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} className="review-star" />
                  ))}
                </div>
                <p className="review-comment">"{rev.comment}"</p>
                <div className="review-author-meta">
                  <div className="author-avatar">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h5 className="author-name">{rev.name}</h5>
                    <span className="author-loc">{rev.location} • Verified Buyer</span>
                  </div>
                </div>
                <span className="review-product-tag">Purchased: {rev.productName}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. INSTAGRAM / COMMUNITY SOCIAL SECTION */}
      <section className="section social-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Community & Lifestyle</span>
            <h2 className="section-title">Follow The Tapua Journey</h2>
            <p className="section-subtitle">
              Wholesome snacking inspiration, fasting recipes, and harvest stories from Mithila.
            </p>
            <div style={{marginTop: '1rem'}}>
              <a 
                href="https://www.instagram.com/tapuafoods/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <span>Follow @tapuafoods on Instagram</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="social-grid">
            <div className="social-item">
              <img src={frontPackImg} alt="Tapua Makhana Lifestyle" />
              <div className="social-overlay">
                <span>#TapuaFoods</span>
              </div>
            </div>
            <div className="social-item">
              <img src={cashewsImg} alt="Royal Cashews" />
              <div className="social-overlay">
                <span>#PureNourishment</span>
              </div>
            </div>
            <div className="social-item">
              <img src={pumpkinSeedsImg} alt="Green Pumpkin Seeds" />
              <div className="social-overlay">
                <span>#Superseeds</span>
              </div>
            </div>
            <div className="social-item">
              <img src={chiaSeedsImg} alt="Organic Chia" />
              <div className="social-overlay">
                <span>#HealthyHabits</span>
              </div>
            </div>
            <div className="social-item">
              <img src={datesImg} alt="Medjool Dates" />
              <div className="social-overlay">
                <span>#NaturalSweetness</span>
              </div>
            </div>
            <div className="social-item">
              <img src={healthySnacksImg} alt="Healthy Snack Mix" />
              <div className="social-overlay">
                <span>#GuiltFreeMunching</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Launch Notify VIP Modal */}
      <NotifyModal
        product={notifyProduct}
        isOpen={isNotifyOpen}
        onClose={() => setIsNotifyOpen(false)}
      />
    </div>
  );
};
