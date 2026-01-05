'use client';

import { useState } from 'react';

const CTASection = () => {
  const [formState, setFormState] = useState({
    clubName: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ clubName: '', email: '' });

      // Reset success state after delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section className="cta-section" id="register">
      <div className="cta-glow"></div>
      <div className="container">
        <div className="cta-content reveal">
          <h2>
            Ready to <span className="gradient-text">Elevate</span> Your Club?
          </h2>
          <p>
            Join 250+ clubs already on CampusVibe. Free registration, premium exposure.
          </p>
          <div className="cta-features">
            <div className="cta-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Free Forever</span>
            </div>
            <div className="cta-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>5 Min Setup</span>
            </div>
            <div className="cta-feature">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              <span>Instant Reach</span>
            </div>
          </div>
          <form className="register-form" id="registerForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="clubName"
                placeholder="Club Name" 
                required 
                value={formState.clubName}
                onChange={handleChange}
              />
              <input 
                type="email" 
                name="email"
                placeholder="Official Email" 
                required 
                value={formState.email}
                onChange={handleChange}
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary glow-btn large"
              disabled={isSubmitting}
              style={isSuccess ? { background: 'linear-gradient(135deg, #10B981, #059669)' } : {}}
            >
              <span>
                {isSubmitting 
                  ? 'Registering...' 
                  : isSuccess 
                    ? '✓ Registered Successfully!' 
                    : 'Register Your Club'}
              </span>
              {!isSubmitting && !isSuccess && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
