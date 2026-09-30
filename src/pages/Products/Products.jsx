import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, X, Grid3X3, Grid2X2 } from 'lucide-react';
import { productService } from '../../services/productService';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { FilterPanel } from '../../components/FilterPanel/FilterPanel';
import { EmptyState } from '../../components/EmptyState/EmptyState';
import './Products.css';

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedMinRating, setSelectedMinRating] = useState(0);
  const [sortBy, setSortBy] = useState('featured');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [gridCols, setGridCols] = useState(3);

  // Sync category & search from URL params
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
    const search = searchParams.get('search');
    if (search !== null) setSearchQuery(search);
  }, [searchParams]);

  useEffect(() => {
    const fetchInitial = async () => {
      setLoading(true);
      try {
        const [allCats, allProds] = await Promise.all([
          productService.getCategories(),
          productService.getProducts()
        ]);
        setCategories(allCats);
        setProducts(allProds);
      } catch (e) {
        console.error('Failed to load shop products', e);
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, []);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category
    if (selectedCategory && selectedCategory !== 'all') {
      result = result.filter(p => p.categorySlug.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      );
    }

    // Price Range
    if (selectedPriceRange === 'under-300') {
      result = result.filter(p => p.price < 300);
    } else if (selectedPriceRange === '300-600') {
      result = result.filter(p => p.price >= 300 && p.price <= 600);
    } else if (selectedPriceRange === '600-1000') {
      result = result.filter(p => p.price > 600 && p.price <= 1000);
    } else if (selectedPriceRange === 'above-1000') {
      result = result.filter(p => p.price > 1000);
    }

    // Min Rating
    if (selectedMinRating > 0) {
      result = result.filter(p => p.rating >= selectedMinRating);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [products, selectedCategory, searchQuery, selectedPriceRange, selectedMinRating, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedMinRating(0);
    setSearchQuery('');
    setSearchParams({});
  };

  const currentCategoryName = useMemo(() => {
    if (selectedCategory === 'all') return 'All Products';
    const found = categories.find(c => c.slug === selectedCategory);
    return found ? found.name : 'All Products';
  }, [selectedCategory, categories]);

  return (
    <div className="shop-page">
      {/* Header Banner */}
      <section className="shop-header-banner">
        <div className="container">
          <span className="shop-banner-tag">Tapua Store</span>
          <h1 className="shop-banner-title">{currentCategoryName}</h1>
          <p className="shop-banner-desc">
            Explore 100% natural Raw White Makhana, sun-ripened dry fruits, premium whole nuts, and handcrafted gift hampers.
          </p>
        </div>
      </section>

      <div className="container shop-layout">
        {/* Desktop Sidebar Filters */}
        <aside className="shop-sidebar">
          <FilterPanel
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(slug) => {
              setSelectedCategory(slug);
              setSearchParams(slug === 'all' ? {} : { category: slug });
            }}
            selectedPriceRange={selectedPriceRange}
            onSelectPriceRange={setSelectedPriceRange}
            selectedMinRating={selectedMinRating}
            onSelectMinRating={setSelectedMinRating}
            onResetFilters={handleResetFilters}
          />
        </aside>

        {/* Main Products Grid & Controls */}
        <main className="shop-main-content">
          {/* Controls Bar */}
          <div className="shop-controls-bar">
            {/* Search Input */}
            <div className="shop-search-wrapper">
              <Search size={18} className="shop-search-icon" />
              <input
                type="text"
                placeholder="Search within products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="shop-search-input"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="shop-search-clear"
                  aria-label="Clear search"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Mobile Filter Trigger Button */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="btn btn-outline btn-sm mobile-filter-btn"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>

            {/* Right Side: Count and Sort */}
            <div className="controls-right">
              <span className="product-counter">
                Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'Product' : 'Products'}
              </span>

              <div className="sort-wrapper">
                <label htmlFor="sort-select" className="sort-label">Sort by:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-dropdown"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rating</option>
                  <option value="newest">Newest Harvest</option>
                </select>
              </div>

              {/* Grid Switcher for desktop */}
              <div className="grid-switcher">
                <button
                  className={`grid-switch-btn ${gridCols === 3 ? 'active' : ''}`}
                  onClick={() => setGridCols(3)}
                  aria-label="3 column grid"
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  className={`grid-switch-btn ${gridCols === 2 ? 'active' : ''}`}
                  onClick={() => setGridCols(2)}
                  aria-label="2 column grid"
                >
                  <Grid2X2 size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedCategory !== 'all' || selectedPriceRange !== 'all' || selectedMinRating > 0 || searchQuery) && (
            <div className="active-filter-chips">
              <span className="chips-label">Active Filters:</span>
              {selectedCategory !== 'all' && (
                <span className="filter-chip">
                  Category: {currentCategoryName}
                  <button onClick={() => setSelectedCategory('all')}><X size={12} /></button>
                </span>
              )}
              {searchQuery && (
                <span className="filter-chip">
                  Query: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><X size={12} /></button>
                </span>
              )}
              {selectedPriceRange !== 'all' && (
                <span className="filter-chip">
                  Price: {selectedPriceRange}
                  <button onClick={() => setSelectedPriceRange('all')}><X size={12} /></button>
                </span>
              )}
              {selectedMinRating > 0 && (
                <span className="filter-chip">
                  Rating: {selectedMinRating}★+
                  <button onClick={() => setSelectedMinRating(0)}><X size={12} /></button>
                </span>
              )}
              <button onClick={handleResetFilters} className="clear-all-chips-btn">
                Clear All
              </button>
            </div>
          )}

          {/* Product Grid or Empty State */}
          {filteredProducts.length > 0 ? (
            <div className={`shop-products-grid cols-${gridCols}`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon="search"
              title="No Products Found"
              message="We couldn't find any products matching your current filters. Try changing or clearing your search criteria."
              actionText="Reset All Filters"
              actionLink="/shop"
            />
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileDrawerOpen && (
        <div className="mobile-filter-modal-backdrop" onClick={() => setMobileDrawerOpen(false)}>
          <div className="mobile-filter-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-filter-header">
              <h3>Filter Products</h3>
              <button 
                onClick={() => setMobileDrawerOpen(false)}
                className="close-drawer-btn"
                aria-label="Close filters"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mobile-filter-body">
              <FilterPanel
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(slug) => {
                  setSelectedCategory(slug);
                  setSearchParams(slug === 'all' ? {} : { category: slug });
                }}
                selectedPriceRange={selectedPriceRange}
                onSelectPriceRange={setSelectedPriceRange}
                selectedMinRating={selectedMinRating}
                onSelectMinRating={setSelectedMinRating}
                onResetFilters={handleResetFilters}
                isMobileDrawer={true}
                onCloseMobileDrawer={() => setMobileDrawerOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
