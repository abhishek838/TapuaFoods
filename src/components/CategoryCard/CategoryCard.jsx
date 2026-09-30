import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './CategoryCard.css';

export const CategoryCard = ({ category }) => {
  if (!category) return null;

  return (
    <Link to={`/shop?category=${category.slug}`} className="category-card card-hover">
      <div className={`category-card-image-box ${category.imageFit === 'contain' ? 'media-contain' : ''}`}>
        <img
          src={category.image}
          alt={category.name}
          className={`category-card-img ${category.imageFit === 'contain' ? 'img-contain' : ''}`}
          loading="lazy"
        />
        <div className="category-card-overlay"></div>
        {category.tagline && (
          <span className="category-tagline-badge">{category.tagline}</span>
        )}
      </div>

      <div className="category-card-content">
        <div className="category-header">
          <h3 className="category-name">{category.name}</h3>
          <span className="category-item-count">{category.itemCount}+ Items</span>
        </div>
        <p className="category-desc">{category.description}</p>
        <span className="category-explore-link">
          Explore Collection <ArrowUpRight size={16} className="explore-arrow" />
        </span>
      </div>
    </Link>
  );
};
