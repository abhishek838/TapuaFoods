import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Award, 
  HeartHandshake, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Compass, 
  Sun, 
  Droplets, 
  Flame, 
  PackageCheck 
} from 'lucide-react';
import frontPackImg from '../../assets/images/tapua-front-pack.png';
import wetlandsSunriseImg from '../../assets/images/mithila-wetlands-sunrise.jpg';
import artisanalDryingImg from '../../assets/images/mithila-artisanal-drying.jpg';
import rawMakhanaBowlImg from '../../assets/images/tapua-raw-makhana-bowl.jpg';
import logoImg from '../../assets/images/tapua-logo.png';
import './AboutUs.css';

const HERO_STAGES = [
  {
    id: 'wetlands',
    title: 'Sacred Wetland Ponds',
    subtitle: 'Harvested at Dawn',
    badge: 'GI-Tagged Origin',
    location: '26.15° N, 85.90° E • Darbhanga, Mithila',
    description: 'Pristine freshwater wetlands where wild lotus plants thrive naturally under morning mist.',
    image: wetlandsSunriseImg,
    tag: 'Stage 01 • Wetland Ecology'
  },
  {
    id: 'drying',
    title: 'Sun-Drying on Bamboo',
    subtitle: 'Artisanal Heritage',
    badge: 'Ancient Craft',
    location: 'Traditional Mallah Harvester Craft',
    description: 'Seeds carefully sorted by local women artisans and slow-dried under the warm Mithila sun.',
    image: artisanalDryingImg,
    tag: 'Stage 02 • Village Sun-Curing'
  },
  {
    id: 'purity',
    title: 'Pristine White Makhana',
    subtitle: '100% Unroasted',
    badge: 'Zero Bleaching',
    location: 'Jumbo 4-Suta & 5-Suta Grading',
    description: 'Feather-light, nutrient-dense kernels delivered unroasted in their honest natural state.',
    image: rawMakhanaBowlImg,
    tag: 'Stage 03 • Pure Harvest'
  }
];

const JOURNEY_STEPS = [
  {
    num: '01',
    icon: Droplets,
    title: 'Sunrise Foraging',
    desc: 'Local Mallah divers gently wade into calm freshwater ponds at dawn to hand-gather seeds from muddy beds.'
  },
  {
    num: '02',
    icon: Sun,
    title: 'Bamboo Sun-Drying',
    desc: 'Cleaned seeds are sun-cured on handwoven bamboo mats under natural sunlight to preserve raw enzymes.'
  },
  {
    num: '03',
    icon: Flame,
    title: 'Clay Pot Popping',
    desc: 'Carefully roasted in traditional clay ovens and struck with wooden mallets—never puffed with industrial gas.'
  },
  {
    num: '04',
    icon: PackageCheck,
    title: 'Freshness Barrier Seal',
    desc: 'Graded kernel-by-kernel and packaged in moisture-lock multi-layer foil to guarantee crisp crunch.'
  }
];

export const AboutUs = () => {
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % HERO_STAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentStage = HERO_STAGES[activeStage];

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="container about-hero-container">
          <div className="about-hero-content animate-fade-in">
            <span className="section-tag">
              <Leaf size={14} /> Sacred Origin & Ancient Heritage
            </span>
            <h1 className="about-hero-title">
              From the Sacred Waters of Mithila to Your Everyday Table
            </h1>
            <p className="about-hero-lead">
              Tapua Foods was born from a deep reverence for India’s natural agricultural treasures. We bridge ancient wetland harvests with mindful modern lifestyles.
            </p>

            {/* Heritage Metric Cards */}
            <div className="about-heritage-metrics">
              <div className="heritage-metric-item">
                <span className="metric-val">500+ Yrs</span>
                <span className="metric-lbl">Artisan Heritage</span>
              </div>
              <div className="heritage-metric-item">
                <span className="metric-val">100%</span>
                <span className="metric-lbl">Raw & Unroasted</span>
              </div>
              <div className="heritage-metric-item">
                <span className="metric-val">GI-Tagged</span>
                <span className="metric-lbl">Mithila Makhana</span>
              </div>
              <div className="heritage-metric-item">
                <span className="metric-val">Zero</span>
                <span className="metric-lbl">Chemical Bleaching</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="about-hero-actions">
              <a href="#mithila" className="btn btn-primary btn-about-cta">
                <Compass size={16} />
                <span>Explore The Legend</span>
              </a>
              <Link to="/shop?category=makhana" className="btn btn-secondary btn-about-cta">
                <span>Shop Raw Makhana</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Interactive Heritage Visual Showcase */}
          <div className="about-hero-showcase animate-fade-in">
            <div className="showcase-card">
              {/* Media Container */}
              <div className="showcase-media-frame">
                <img 
                  key={currentStage.id}
                  src={currentStage.image} 
                  alt={currentStage.title} 
                  className="showcase-img animate-fade-in" 
                />

                {/* Floating Top Badge */}
                <div className="showcase-floating-badge top-badge">
                  <span className="pulse-indicator"></span>
                  <MapPin size={13} />
                  <span>{currentStage.location}</span>
                </div>

                {/* Floating Bottom Badge */}
                <div className="showcase-floating-badge bottom-badge">
                  <Sparkles size={14} className="badge-sparkle" />
                  <div className="badge-text-group">
                    <span className="badge-title">{currentStage.badge}</span>
                    <span className="badge-sub">{currentStage.subtitle}</span>
                  </div>
                </div>

                {/* Stage Tag Overlay */}
                <div className="showcase-stage-pill">
                  {currentStage.tag}
                </div>
              </div>

              {/* Stage Selector Tabs */}
              <div className="showcase-nav-bar">
                {HERO_STAGES.map((stage, idx) => (
                  <button
                    key={stage.id}
                    type="button"
                    className={`showcase-nav-btn ${activeStage === idx ? 'active' : ''}`}
                    onClick={() => setActiveStage(idx)}
                  >
                    <span className="nav-step-index">0{idx + 1}</span>
                    <span className="nav-step-name">{stage.title}</span>
                  </button>
                ))}
              </div>

              {/* Stage Description Bar */}
              <div className="showcase-caption-bar">
                <p>{currentStage.description}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Sacred Journey Section */}
      <section className="pond-journey-section">
        <div className="container">
          <div className="journey-header">
            <span className="section-tag">Pond to Pantry</span>
            <h2 className="section-title">The 4-Step Sacred Harvest Journey</h2>
            <p className="section-subtitle">
              How pristine lotus seeds transform from calm lakebeds into clean, crispy, chemical-free nutrition.
            </p>
          </div>

          <div className="journey-steps-grid">
            {JOURNEY_STEPS.map((step) => {
              const StepIcon = step.icon;
              return (
                <div key={step.num} className="journey-card">
                  <div className="journey-card-top">
                    <span className="journey-num">{step.num}</span>
                    <div className="journey-icon-box">
                      <StepIcon size={22} />
                    </div>
                  </div>
                  <h3 className="journey-step-title">{step.title}</h3>
                  <p className="journey-step-desc">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section id="mithila" className="section story-section">
        <div className="container story-grid">
          <div className="story-img-card">
            <img src={frontPackImg} alt="Tapua Foods Raw White Makhana Pouch" className="story-product-img" />
            <div className="story-badge">
              <img src={logoImg} alt="Tapua Emblem" className="story-logo-stamp" />
              <span>Certified Origin</span>
            </div>
          </div>

          <div className="story-text-content">
            <span className="section-tag">Authentic Roots</span>
            <h2 className="story-title">The Legend of Mithila Makhana</h2>
            <p>
              In the serene freshwater ponds of Bihar’s Mithila region, lotus plants have thrived for centuries. Here, the harvest of fox nuts (Euryale ferox) is not an industrial process—it is a sacred art passed down across generations.
            </p>
            <p>
              Mithila farmers wade into calm waters at sunrise to hand-gather seeds from pond beds. The seeds are naturally sun-dried and popped using traditional earthen ovens.
            </p>
            <p className="highlight-text">
              <strong>Our Raw White Makhana is 100% UNROASTED:</strong> We do not mask our products with industrial oil or artificial seasonings. We deliver pristine, plump, pure white kernels so you can enjoy their honest, nutrient-dense natural state.
            </p>

            <div className="pillars-list">
              <div className="pillar-item">
                <CheckCircle2 size={18} className="pillar-check" />
                <span>Zero chemical bleaching or artificial puffing</span>
              </div>
              <div className="pillar-item">
                <CheckCircle2 size={18} className="pillar-check" />
                <span>Fair, direct compensation for wetland farming families</span>
              </div>
              <div className="pillar-item">
                <CheckCircle2 size={18} className="pillar-check" />
                <span>Laboratory verified purity and freshness packaging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Guiding North Star</span>
            <h2 className="section-title">The Tapua Foods Principles</h2>
            <p className="section-subtitle">
              Four fundamental values that guide every harvest, grading table, and packaging seal.
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon-circle">
                <Leaf size={28} />
              </div>
              <h3>1. Pure Nature First</h3>
              <p>
                No shortcuts, no synthetic additives, and no chemical processing. If nature didn't grow it, you won't find it in our packs.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-circle">
                <Award size={28} />
              </div>
              <h3>2. Uncompromising Grading</h3>
              <p>
                Every makhana kernel, almond, and cashew undergoes manual sorting to ensure uniform size, zero bitterness, and supreme crunch.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-circle">
                <HeartHandshake size={28} />
              </div>
              <h3>3. Farmer Empowerment</h3>
              <p>
                We work directly with rural communities in Bihar, offering guaranteed fair pricing and sustainable pond conservation practices.
              </p>
            </div>

            <div className="value-card">
              <div className="value-icon-circle">
                <ShieldCheck size={28} />
              </div>
              <h3>4. Freshness You Can Taste</h3>
              <p>
                Packed in multi-layer barrier pouches immediately after grading to ensure zero moisture ingress and long-lasting freshness.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="about-cta-section">
        <div className="container about-cta-inner">
          <h2>Taste the Difference of Authentic Purity</h2>
          <p>Explore our complete catalog of Raw White Makhana, dry fruits, nuts, and vitality seeds.</p>
          <Link to="/shop" className="btn btn-accent btn-lg">
            Shop Tapua Foods <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
};
