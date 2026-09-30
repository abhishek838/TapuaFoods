import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, CheckCircle } from 'lucide-react';
import { OUR_RANGE } from '../../data/categories';
import './OurRange.css';

export const OurRange = () => {
  return (
    <section className="our-range-section" aria-label="Our Range of Pure Foods">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-centered">
          <div className="range-eyebrow">
            <span className="eyebrow-dot"></span>
            <span>OUR RANGE</span>
            <span className="eyebrow-dot"></span>
          </div>
          <h2 className="range-title">Pure Foods from across Bharat</h2>
          <p className="range-subtitle">
            Cultivated with reverent heritage farming traditions, processed hygienically, and packaged to deliver nature&rsquo;s uncompromised vitality.
          </p>
        </div>

        {/* 6 Category Grid */}
        <div className="range-grid">
          {OUR_RANGE.map((item) => {
            const isComingSoon = item.status === 'coming-soon';

            return (
              <div 
                key={item.id} 
                className={`range-card ${isComingSoon ? 'is-coming-soon' : 'is-available'}`}
              >
                <div className={`range-card-media ${item.imageFit === 'contain' ? 'media-contain' : ''}`}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className={`range-card-img ${item.imageFit === 'contain' ? 'img-contain' : ''}`} 
                  />
                  
                  {/* Status Badge */}
                  <span className={`range-status-badge badge-${item.status}`}>
                    {isComingSoon ? (
                      <>
                        <Clock size={12} />
                        <span>Launching Soon</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle size={12} />
                        <span>{item.count}</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="range-card-body">
                  <div className="range-card-top">
                    <h3 className="range-card-title">{item.title}</h3>
                    <span className="range-card-count">{item.count}</span>
                  </div>

                  <p className="range-card-desc">{item.description}</p>

                  <div className="range-card-footer">
                    {isComingSoon ? (
                      <span className="range-launching-tag">
                        Coming to shelves soon
                      </span>
                    ) : (
                      <Link to={item.link} className="range-explore-btn">
                        <span>Explore Collection</span>
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
