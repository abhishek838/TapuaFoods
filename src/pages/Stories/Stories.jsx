import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Clock, ArrowRight, User, ExternalLink, Sparkles, X, Share2 } from 'lucide-react';
import { STORIES } from '../../data/stories';
import { useToast } from '../../context/ToastContext';
import './Stories.css';

export const Stories = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeStory, setActiveStory] = useState(null);
  const { showToast } = useToast();

  const categories = ['All', 'Heritage & Culture', 'Nutrition & Health', 'Fasting & Vrat', 'Announcements', 'Industry & Global'];

  const filteredStories = selectedCategory === 'All'
    ? STORIES
    : STORIES.filter(s => s.category.toLowerCase() === selectedCategory.toLowerCase());

  const featuredStory = STORIES[0];
  const regularStories = selectedCategory === 'All' 
    ? STORIES.slice(1) 
    : filteredStories;

  const handleShare = (story) => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Story link copied to clipboard!', 'success');
  };

  return (
    <div className="stories-page">
      {/* Hero Header */}
      <section className="stories-hero">
        <div className="container">
          <div className="stories-hero-content">
            <div className="stories-eyebrow">
              <Sparkles size={15} />
              <span>THE TAPUA CHRONICLES</span>
            </div>
            <h1 className="stories-hero-title">Stories from the Sacred Wetlands</h1>
            <p className="stories-hero-sub">
              Deep dives into 2,500-year-old Mithila traditions, Mallah harvesting journeys, nutritional science, and the living culture behind India&rsquo;s most revered superfood.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="container stories-nav-container">
        <div className="stories-tabs-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`stories-tab-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Story Banner (Only on 'All') */}
      {selectedCategory === 'All' && featuredStory && (
        <section className="container featured-story-section">
          <article className="featured-story-card" onClick={() => setActiveStory(featuredStory)}>
            <div className="featured-media-col">
              <img src={featuredStory.image} alt={featuredStory.title} className="featured-img" />
            </div>
            <div className="featured-body-col">
              <div className="story-meta-row">
                <div className="story-badge-group">
                  <span className="featured-badge-pill">Featured Story</span>
                  <span className="story-category-tag">{featuredStory.category}</span>
                </div>
                <span className="story-read-time">
                  <Clock size={13} /> {featuredStory.readTime}
                </span>
              </div>

              <h2 className="featured-title">{featuredStory.title}</h2>
              <p className="featured-excerpt">{featuredStory.excerpt}</p>

              <div className="featured-footer">
                <div className="author-row">
                  <User size={14} />
                  <span>{featuredStory.author}</span>
                  <span className="dot-divider">•</span>
                  <Calendar size={14} />
                  <span>{featuredStory.date}</span>
                </div>

                <button type="button" className="btn-read-story">
                  <span>Read Full Article</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Stories Grid */}
      <section className="container stories-grid-section">
        <div className="stories-grid">
          {regularStories.map((story) => (
            <article 
              key={story.id} 
              className="story-card"
              onClick={() => setActiveStory(story)}
            >
              <div className="story-card-media">
                <img src={story.image} alt={story.title} className="story-card-img" loading="lazy" />
              </div>

              <div className="story-card-body">
                <div className="story-card-meta">
                  <span className="story-category-pill">{story.category}</span>
                  <div className="story-meta-sub">
                    <span><Calendar size={12} /> {story.date}</span>
                    <span><Clock size={12} /> {story.readTime}</span>
                  </div>
                </div>

                <h3 className="story-card-title">{story.title}</h3>
                <p className="story-card-excerpt">{story.excerpt}</p>

                <div className="story-card-footer">
                  <button type="button" className="story-readmore-btn">
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </button>

                  {story.amazonUrl && (
                    <a 
                      href={story.amazonUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="story-amazon-pill"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span>Amazon Prime</span>
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Story Detail Reader Modal */}
      {activeStory && (
        <div className="story-modal-overlay" onClick={() => setActiveStory(null)} role="dialog" aria-modal="true">
          <div className="story-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="story-modal-close" 
              onClick={() => setActiveStory(null)}
              aria-label="Close story"
            >
              <X size={20} />
            </button>

            <header className="story-reader-header">
              <span className="reader-category-tag">{activeStory.category}</span>
              <h1 className="reader-title">{activeStory.title}</h1>

              <div className="reader-meta-bar">
                <div className="reader-author-info">
                  <span className="author-name">By {activeStory.author}</span>
                  <span className="pub-date">{activeStory.date}</span>
                  <span className="read-time"><Clock size={14} /> {activeStory.readTime}</span>
                </div>

                <button 
                  type="button" 
                  className="reader-share-btn"
                  onClick={() => handleShare(activeStory)}
                  title="Share article"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </button>
              </div>
            </header>

            <div className="story-reader-hero-media">
              <img src={activeStory.image} alt={activeStory.title} />
            </div>

            <div className="story-reader-article-content">
              {activeStory.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return <h3 key={idx} className="reader-subheading">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n').filter(Boolean);
                  return (
                    <ul key={idx} className="reader-bullet-list">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (/^\d+\.\s/.test(paragraph)) {
                  const items = paragraph.split('\n').filter(Boolean);
                  return (
                    <ol key={idx} className="reader-ordered-list">
                      {items.map((item, i) => (
                        <li key={i}>{item.replace(/^\d+\.\s/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return <p key={idx} className="reader-paragraph">{paragraph}</p>;
              })}
            </div>

            <footer className="story-reader-footer">
              <div className="reader-cta-card">
                <div>
                  <h4>Taste the Authentic Farm-Gate Harvest</h4>
                  <p>Pure GI-tagged Raw White Makhana straight from Mithila farmer cooperatives.</p>
                </div>
                <div className="reader-cta-buttons">
                  <Link 
                    to="/shop?category=makhana" 
                    className="btn btn-primary"
                    onClick={() => setActiveStory(null)}
                  >
                    Shop Tapua Makhana
                  </Link>
                  <a 
                    href="https://amzn.in/d/0bffsdiy" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-amazon-link"
                  >
                    Buy on Amazon
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};
