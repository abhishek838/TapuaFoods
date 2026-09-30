import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import pondArt from '../../assets/images/madhubani-pond-art.png';
import motifsArt from '../../assets/images/madhubani-motifs-art.png';
import './MadhubaniSection.css';

export const MadhubaniSection = () => {
  return (
    <section className="madhubani-showcase-section" aria-label="The Art of Mithila">
      <div className="container madhubani-container">
        
        {/* Left Narrative Column */}
        <div className="madhubani-text-content">
          <div className="madhubani-eyebrow">
            <span className="eyebrow-line"></span>
            <span className="eyebrow-text">THE ART OF MITHILA</span>
          </div>

          <h2 className="madhubani-heading">
            Madhubani <span className="madhubani-italic-highlight">at the Heart</span> of Every Pack
          </h2>

          <p className="madhubani-paragraph">
            Madhubani (Mithila) painting is a 2,500-year-old tradition native to the same region where our makhana grows. Every Tapua pack features original Madhubani artwork, celebrating the culture and communities behind our food.
          </p>

          <div className="madhubani-cta-row">
            <Link to="/about" className="btn-madhubani-story">
              <span>OUR STORY</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/stories/madhubani-painting-guide" className="madhubani-art-link">
              <Sparkles size={14} />
              <span>Read the 2,500-Year Art Story</span>
            </Link>
          </div>
        </div>

        {/* Right Artwork Gallery */}
        <div className="madhubani-artwork-display">
          {/* Main Pond Harvesting Artwork */}
          <div className="artwork-card pond-card">
            <div className="artwork-inner">
              <img 
                src={pondArt} 
                alt="Madhubani artwork depicting women harvesting makhana in lotus pond" 
                className="artwork-img"
              />
            </div>
            <span className="artwork-caption">Pond Lotus Harvest • Traditional Mithila Composition</span>
          </div>

          {/* 4 Motifs Panel (Peacock, Sun, Fish, Sita-Ram) */}
          <div className="artwork-card motifs-card">
            <div className="artwork-inner">
              <img 
                src={motifsArt} 
                alt="Sacred Mithila motifs: Mayur peacock, Surya sun, Matsya fish, and Sita-Rama" 
                className="artwork-img"
              />
            </div>
            <span className="artwork-caption">Sacred Motifs: Peacock, Sun, Fish & Sita-Ram</span>
          </div>
        </div>

      </div>
    </section>
  );
};
