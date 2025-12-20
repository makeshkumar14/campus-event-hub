const WhySection = () => {
  return (
    <section className="why-section" id="why">
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">The Problem</span>
          <h2>Why <span className="gradient-text">CampusVibe</span>?</h2>
        </div>
        <div className="why-grid">
          <div className="problem-card reveal">
            <div className="problem-icon">😵</div>
            <h3>Information Overload</h3>
            <p>
              Events scattered across WhatsApp groups, Instagram, and notice
              boards. You always miss what matters.
            </p>
          </div>
          <div className="solution-arrow reveal">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
              <path
                d="M10 30h40M40 20l10 10-10 10"
                stroke="url(#arrowGrad)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient
                  id="arrowGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="solution-card reveal">
            <div className="solution-icon">✨</div>
            <h3>One Unified Hub</h3>
            <p>
              All campus events, all clubs, one beautiful platform. Filter,
              discover, and RSVP in seconds.
            </p>
          </div>
        </div>
        <div className="benefits-grid">
          <div className="benefit-item reveal">
            <div className="benefit-icon">🎯</div>
            <span>Personalized Feed</span>
          </div>
          <div className="benefit-item reveal">
            <div className="benefit-icon">⚡</div>
            <span>Real-time Updates</span>
          </div>
          <div className="benefit-item reveal">
            <div className="benefit-icon">🔔</div>
            <span>Smart Reminders</span>
          </div>
          <div className="benefit-item reveal">
            <div className="benefit-icon">📊</div>
            <span>Club Analytics</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
