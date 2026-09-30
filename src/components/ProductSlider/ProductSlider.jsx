import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductSlider.css';

export const ProductSlider = ({ products = [], title = "Bestsellers", subtitle }) => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (!products || products.length === 0) return null;

  return (
    <div className="product-slider-wrapper">
      <div className="product-slider-header">
        <div className="slider-title-block">
          <h2 className="slider-title">{title}</h2>
          {subtitle && <p className="slider-subtitle">{subtitle}</p>}
        </div>
        <div className="slider-controls">
          <button
            onClick={() => scroll('left')}
            className="slider-arrow-btn prev-btn"
            aria-label="Previous products"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="slider-arrow-btn next-btn"
            aria-label="Next products"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="product-slider-container" ref={scrollContainerRef}>
        {products.map((product) => (
          <div key={product.id} className="product-slider-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};
