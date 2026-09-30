import React from 'react';
import { RotateCcw, Check, Star } from 'lucide-react';
import './FilterPanel.css';

export const FilterPanel = ({
  categories = [],
  selectedCategory = 'all',
  onSelectCategory,
  selectedPriceRange = 'all',
  onSelectPriceRange,
  selectedMinRating = 0,
  onSelectMinRating,
  onResetFilters,
  isMobileDrawer = false,
  onCloseMobileDrawer
}) => {
  const priceRanges = [
    { id: 'all', label: 'All Prices' },
    { id: 'under-300', label: 'Under ₹300', min: 0, max: 300 },
    { id: '300-600', label: '₹300 - ₹600', min: 300, max: 600 },
    { id: '600-1000', label: '₹600 - ₹1,000', min: 600, max: 1000 },
    { id: 'above-1000', label: 'Above ₹1,000', min: 1000, max: 99999 }
  ];

  const ratingOptions = [
    { value: 0, label: 'All Ratings' },
    { value: 4.8, label: '4.8 ★ & above' },
    { value: 4.5, label: '4.5 ★ & above' },
    { value: 4.0, label: '4.0 ★ & above' }
  ];

  return (
    <div className={`filter-panel ${isMobileDrawer ? 'mobile-panel' : ''}`}>
      <div className="filter-panel-header">
        <h3 className="filter-title">Filters</h3>
        <button
          onClick={onResetFilters}
          className="reset-filter-btn"
          aria-label="Reset all filters"
        >
          <RotateCcw size={14} /> Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Categories</h4>
        <ul className="filter-list">
          <li>
            <button
              className={`filter-item-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => onSelectCategory('all')}
            >
              <span className="filter-checkbox">
                {selectedCategory === 'all' && <Check size={12} />}
              </span>
              All Products
            </button>
          </li>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                className={`filter-item-btn ${selectedCategory === cat.slug ? 'active' : ''}`}
                onClick={() => onSelectCategory(cat.slug)}
              >
                <span className="filter-checkbox">
                  {selectedCategory === cat.slug && <Check size={12} />}
                </span>
                {cat.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Price Range</h4>
        <ul className="filter-list">
          {priceRanges.map((range) => (
            <li key={range.id}>
              <button
                className={`filter-item-btn ${selectedPriceRange === range.id ? 'active' : ''}`}
                onClick={() => onSelectPriceRange(range.id)}
              >
                <span className="filter-radio">
                  {selectedPriceRange === range.id && <span className="radio-inner" />}
                </span>
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating Filter */}
      <div className="filter-group">
        <h4 className="filter-group-title">Customer Rating</h4>
        <ul className="filter-list">
          {ratingOptions.map((rate) => (
            <li key={rate.value}>
              <button
                className={`filter-item-btn ${selectedMinRating === rate.value ? 'active' : ''}`}
                onClick={() => onSelectMinRating(rate.value)}
              >
                <span className="filter-radio">
                  {selectedMinRating === rate.value && <span className="radio-inner" />}
                </span>
                {rate.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isMobileDrawer && (
        <button
          onClick={onCloseMobileDrawer}
          className="btn btn-primary btn-full apply-mobile-filters-btn"
        >
          View Results
        </button>
      )}
    </div>
  );
};
