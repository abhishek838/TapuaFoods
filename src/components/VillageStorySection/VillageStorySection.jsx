import React from 'react';
import { Link } from 'react-router-dom';
import { QrCode, Users, Award, ExternalLink, ArrowRight } from 'lucide-react';
import './VillageStorySection.css';

export const VillageStorySection = () => {
  return (
    <section className="village-story-section" aria-label="Our Origin Story">
      <div className="container village-story-container">
        
        {/* Decorative watermark / subtle badge */}
        <div className="story-origin-badge">
          <span className="badge-line"></span>
          <span className="badge-text">OUR STORY</span>
        </div>

        {/* Heading */}
        <h2 className="village-story-heading">
          Named After a <span className="italic-serif-highlight">Real Village</span> in Bihar
        </h2>

        {/* Subtitle quote */}
        <blockquote className="village-quote">
          &ldquo;Tapua&rdquo; is a real village in the Mithila plains of Bihar — the heartland of India&rsquo;s finest makhana.
        </blockquote>

        {/* Narrative paragraph */}
        <p className="village-narrative-text">
          We are <strong>Tapua Agritech Solutions LLP</strong> — a D2C agritech startup that sources single-origin, GI-tagged Mithila Makhana directly from Mallah (fisherfolk) farming communities. We bypass every middleman, pay farmers fairly, and bring you makhana that carries the full story of where it came from.
        </p>

        {/* 3 Pillar Cards */}
        <div className="village-pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon-box">
              <span className="pillar-emoji" role="img" aria-label="QR Code">🔍</span>
            </div>
            <div className="pillar-metric">QR</div>
            <div className="pillar-label">FULL TRACEABILITY</div>
            <p className="pillar-subtext">Scan any Tapua pack to view harvest date, farmer collective & batch test report.</p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <span className="pillar-emoji" role="img" aria-label="Handshake">🤝</span>
            </div>
            <div className="pillar-metric">200+</div>
            <div className="pillar-label">PARTNER FARMERS</div>
            <p className="pillar-subtext">Direct fair-trade contracts with indigenous Mallah wetland farming families.</p>
          </div>

          <div className="pillar-card">
            <div className="pillar-icon-box">
              <span className="pillar-emoji" role="img" aria-label="Tag">🏷️</span>
            </div>
            <div className="pillar-metric">GI</div>
            <div className="pillar-label">TAGGED ORIGIN</div>
            <p className="pillar-subtext">Certified Geographical Indication confirming authentic Mithila wetland cultivation.</p>
          </div>
        </div>

        {/* Amazon & About Link row */}
        <div className="village-footer-actions">
          <a 
            href="https://amzn.in/d/0bffsdiy" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary btn-amazon-link"
          >
            <span>Buy on Amazon India</span>
            <ExternalLink size={16} />
          </a>
          <Link to="/about" className="btn btn-secondary btn-about-link">
            <span>Read Full Origin Story</span>
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
};
