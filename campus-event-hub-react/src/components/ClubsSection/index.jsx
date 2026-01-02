import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { clubs } from '../../data/eventsData';

const ClubsSection = () => {
  const sortedClubs = [...clubs].sort((a, b) => a.rank - b.rank);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const maxXp = parseInt(sortedClubs[0].xp.replace(/,/g, ''));

  return (
    <section className="clubs-section" id="clubs" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-tag">Leaderboard</span>
          <h2>Top Performing <span className="gradient-text">Clubs</span></h2>
          <p className="section-desc">
            The most active and engaging clubs on campus right now
          </p>
        </div>
        
        {/* Circular Progress Showcase */}
        <div className="circle-showcase reveal">
          {sortedClubs.map((club, index) => {
            const xpValue = parseInt(club.xp.replace(/,/g, ''));
            const percentage = (xpValue / maxXp) * 100;
            
            return (
              <div className={`circle-card rank-${index + 1}`} key={club.id}>
                <div className="circle-rank">
                  {index === 0 ? '👑' : index === 1 ? '🥈' : '🥉'}
                </div>
                <CircularProgress 
                  percentage={percentage}
                  isVisible={isVisible}
                  delay={index * 300}
                  rank={index + 1}
                />
                <div className="circle-info">
                  <span className="circle-avatar">{club.avatar}</span>
                  <h4 className="circle-name">{club.name}</h4>
                  <div className="circle-xp">
                    <span className="circle-xp-value">{club.xp}</span>
                    <span className="circle-xp-label">XP Points</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="clubs-cta reveal">
          <div className="cta-content-row">
            <span>Want to see your club on top?</span>
            <Link to="/club-rankings" className="btn btn-outline">View Full Rankings</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

// Circular Progress Component
const CircularProgress = ({ percentage, isVisible, delay, rank }) => {
  const [progress, setProgress] = useState(0);
  const circumference = 2 * Math.PI * 90;
  
  useEffect(() => {
    if (!isVisible) return;
    
    const timeout = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = percentage / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= percentage) {
          setProgress(percentage);
          clearInterval(timer);
        } else {
          setProgress(current);
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [isVisible, percentage, delay]);
  
  const strokeDashoffset = circumference - (progress / 100) * circumference;
  
  const getGradientId = () => {
    if (rank === 1) return 'goldGradient';
    if (rank === 2) return 'silverGradient';
    return 'bronzeGradient';
  };
  
  return (
    <div className="circular-progress">
      <svg viewBox="0 0 200 200">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffd700" />
            <stop offset="100%" stopColor="#ffa500" />
          </linearGradient>
          <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e0e0e0" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </linearGradient>
          <linearGradient id="bronzeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cd7f32" />
            <stop offset="100%" stopColor="#8b4513" />
          </linearGradient>
        </defs>
        <circle
          className="circle-bg"
          cx="100"
          cy="100"
          r="90"
        />
        <circle
          className="circle-progress"
          cx="100"
          cy="100"
          r="90"
          stroke={`url(#${getGradientId()})`}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
      <div className="circle-percentage">
        {Math.round(progress)}%
      </div>
    </div>
  );
};

export default ClubsSection;
