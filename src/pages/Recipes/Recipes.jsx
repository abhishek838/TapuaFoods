import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Flame, ChefHat, X, Check, ShoppingBag, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { RECIPES } from '../../data/recipes';
import './Recipes.css';

export const Recipes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeRecipe, setActiveRecipe] = useState(null);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const categories = ['All', 'Snacks', 'Desserts', 'Breakfast', 'Baking', 'Main Course'];

  const filteredRecipes = selectedCategory === 'All'
    ? RECIPES
    : RECIPES.filter(r => r.category.toLowerCase() === selectedCategory.toLowerCase());

  const handleToggleIngredient = (idx) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const handleOpenRecipe = (recipe) => {
    setActiveRecipe(recipe);
    setCheckedIngredients({});
  };

  return (
    <div className="recipes-page">
      {/* Hero Banner */}
      <section className="recipes-hero">
        <div className="container">
          <div className="recipes-hero-content">
            <div className="recipes-eyebrow">
              <Sparkles size={15} />
              <span>THE ARTISANAL MITHILA KITCHEN</span>
            </div>
            <h1 className="recipes-hero-title">Culinary Creations with Fox Nuts</h1>
            <p className="recipes-hero-sub">
              From traditional festive kheer to 5-minute morning protein smoothies and guilt-free evening chaats — explore pure, wholesome recipes crafted around Tapua Raw White Makhana.
            </p>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="container recipes-nav-container">
        <div className="recipes-tabs-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`recipe-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Recipes Grid */}
      <section className="container recipes-grid-section">
        <div className="recipes-grid">
          {filteredRecipes.map((recipe) => (
            <article key={recipe.id} className="recipe-card" onClick={() => handleOpenRecipe(recipe)}>
              <div className="recipe-card-media">
                <img src={recipe.image} alt={recipe.title} className="recipe-card-img" loading="lazy" />
              </div>

              <div className="recipe-card-body">
                <div className="recipe-meta-row">
                  <div className="recipe-meta-badges">
                    <span className="recipe-category">{recipe.category}</span>
                    <span className="recipe-difficulty-pill">{recipe.difficulty}</span>
                  </div>
                  <div className="recipe-meta-stats">
                    <span className="recipe-time-pill">
                      <Clock size={12} />
                      <span>{recipe.totalTime}</span>
                    </span>
                    <span className="recipe-calories">
                      <Flame size={12} />
                      <span>{recipe.calories}</span>
                    </span>
                  </div>
                </div>

                <h3 className="recipe-card-title">{recipe.title}</h3>
                <p className="recipe-card-desc">{recipe.shortDescription}</p>

                <div className="recipe-card-footer">
                  <button type="button" className="btn-view-recipe">
                    <span>View Full Recipe</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Recipe Detail Modal */}
      {activeRecipe && (
        <div className="recipe-modal-overlay" onClick={() => setActiveRecipe(null)} role="dialog" aria-modal="true">
          <div className="recipe-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="recipe-modal-close" 
              onClick={() => setActiveRecipe(null)}
              aria-label="Close recipe"
            >
              <X size={20} />
            </button>

            <div className="recipe-modal-header">
              <div className="recipe-modal-media">
                <img src={activeRecipe.image} alt={activeRecipe.title} />
              </div>
              <div className="recipe-modal-intro">
                <span className="recipe-modal-badge">{activeRecipe.category}</span>
                <h2 className="recipe-modal-title">{activeRecipe.title}</h2>
                <p className="recipe-modal-lead">{activeRecipe.shortDescription}</p>

                <div className="recipe-quick-stats">
                  <div className="stat-pill">
                    <Clock size={15} />
                    <span>Prep: {activeRecipe.prepTime}</span>
                  </div>
                  <div className="stat-pill">
                    <ChefHat size={15} />
                    <span>Cook: {activeRecipe.cookTime}</span>
                  </div>
                  <div className="stat-pill">
                    <Flame size={15} />
                    <span>{activeRecipe.calories}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="recipe-modal-body">
              {/* Left Column: Ingredients */}
              <div className="recipe-ingredients-col">
                <div className="ingredients-header">
                  <h3>Ingredients Checklist</h3>
                  <span className="ingredients-sub">Serves: {activeRecipe.servings}</span>
                </div>

                <ul className="ingredients-checklist">
                  {activeRecipe.ingredients.map((ing, idx) => (
                    <li 
                      key={idx} 
                      className={`ingredient-item ${checkedIngredients[idx] ? 'is-checked' : ''}`}
                      onClick={() => handleToggleIngredient(idx)}
                    >
                      <span className="checkbox-custom">
                        {checkedIngredients[idx] && <Check size={14} />}
                      </span>
                      <span className="ingredient-text">{ing}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to="/shop?category=makhana" 
                  className="btn btn-primary btn-shop-ingredients"
                  onClick={() => setActiveRecipe(null)}
                >
                  <ShoppingBag size={16} />
                  <span>Shop Raw White Makhana</span>
                </Link>
              </div>

              {/* Right Column: Step by Step Method */}
              <div className="recipe-method-col">
                <h3>Method & Steps</h3>
                <ol className="recipe-steps-list">
                  {activeRecipe.instructions.map((step, idx) => (
                    <li key={idx} className="step-item">
                      <span className="step-number">{idx + 1}</span>
                      <p className="step-text">{step}</p>
                    </li>
                  ))}
                </ol>

                {activeRecipe.chefTips && (
                  <div className="chef-tips-box">
                    <div className="chef-tip-label">
                      <Sparkles size={14} />
                      <span>Chef’s Secret</span>
                    </div>
                    <p>{activeRecipe.chefTips}</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
