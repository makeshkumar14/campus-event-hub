import { useEffect, useRef } from 'react';

const StatNumber = ({ target, label }) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const formatNumber = (num) => {
      if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K+';
      }
      return num + '+';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target;
            const speed = 200;
            const increment = target / speed;
            let current = 0;

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.innerText = formatNumber(Math.ceil(current));
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = formatNumber(target);
              }
            };

            updateCounter();
            observer.unobserve(counter);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [target]);

  return (
    <div className="stat-item">
      <span className="stat-number" ref={ref} data-target={target}>0</span>
      <span className="stat-label">{label}</span>
    </div>
  );
};

const Hero = () => {
  return (
    <section className="hero" id="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="pulse-dot"></span>
          <span>🎉 100+ Events Happening This Week</span>
        </div>
        <h1 className="hero-title">
          <span className="title-line">Discover</span>
          <span className="title-line gradient-text">Campus Events</span>
          <span className="title-line">Like Never Before</span>
        </h1>
        <p className="hero-subtitle">
          One platform. Every club. All events. Never miss what matters on your campus.
        </p>
        <div className="hero-cta">
          <a href="#events" className="btn btn-primary glow-btn">
            <span>Explore Events</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <a href="#register" className="btn btn-secondary">
            <span>Register Your Club</span>
          </a>
        </div>
        <div className="hero-stats">
          <StatNumber target={250} label="Active Clubs" />
          <div className="stat-divider"></div>
          <StatNumber target={1500} label="Events Hosted" />
          <div className="stat-divider"></div>
          <StatNumber target={50000} label="Students Connected" />
        </div>
      </div>
      <div className="hero-visual">
        <div className="iconic-events-section">
          <div className="iconic-header">
            <span className="iconic-badge pulse-glow">⭐ ICONIC ANNUAL EVENTS</span>
            <p className="iconic-subtitle">The events that define our campus culture</p>
          </div>
          <div className="floating-cards">
            <div className="iconic-card card-1">
              <div className="card-glow"></div>
              <div className="card-ribbon">🔥 LEGENDARY</div>
              <div className="iconic-card-image">
                <img src="/images/aaruush_event.png" alt="AARUUSH" />
              </div>
              <div className="iconic-card-content">
                <span className="iconic-tag">🏆 Tech Fest</span>
                <h3>AARUUSH</h3>
                <p>National Tech Symposium</p>
                <span className="iconic-attendance">5000+ Attendees</span>
              </div>
            </div>
            <div className="iconic-card card-2">
              <div className="card-glow"></div>
              <div className="card-ribbon">🔥 LEGENDARY</div>
              <div className="iconic-card-image">
                <img src="/images/milan_event.png" alt="MILAN" />
              </div>
              <div className="iconic-card-content">
                <span className="iconic-tag music">🎭 Cultural</span>
                <h3>MILAN</h3>
                <p>Grand Cultural Festival</p>
                <span className="iconic-attendance">8000+ Attendees</span>
              </div>
            </div>
            <div className="iconic-card card-3">
              <div className="card-glow"></div>
              <div className="card-ribbon">🔥 LEGENDARY</div>
              <div className="iconic-card-image">
                <img src="/images/texus_event.png" alt="TEXUS" />
              </div>
              <div className="iconic-card-content">
                <span className="iconic-tag">💡 Innovation</span>
                <h3>TEXUS</h3>
                <p>Technical Extravaganza</p>
                <span className="iconic-attendance">4000+ Attendees</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
