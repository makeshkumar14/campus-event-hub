'use client';

import { useEffect, useRef, useState } from 'react';

const heroImages = [
  '/images/hero-slide-1.jpg',
  '/images/hero-slide-2.jpg',
  '/images/hero-slide-4.jpg',
  '/images/hero-slide-5.jpg',
];

interface StatNumberProps {
  target: number;
  label: string;
}

const StatNumber = ({ target, label }: StatNumberProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const formatNumber = (num: number): string => {
      if (num >= 1000) {
        return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K+';
      }
      return num + '+';
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const counter = entry.target as HTMLElement;
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
  const [currentImage, setCurrentImage] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    const loadImages = heroImages.map((src) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    });

    Promise.all(loadImages).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [imagesLoaded]);

  return (
    <section className="hero" id="hero">
      {/* Background Image Slideshow */}
      <div className="hero-slideshow">
        {heroImages.map((img, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentImage ? 'active' : ''}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        <div className="hero-overlay" />
      </div>

      <div className="hero-content">
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
    </section>
  );
};

export default Hero;
