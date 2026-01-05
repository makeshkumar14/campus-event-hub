'use client';

import { useEffect } from 'react';

const BackgroundAnimation = () => {
  useEffect(() => {
    // Create particles
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer);
    }

    function createParticle(container: HTMLElement) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 4 + 's';
      const size = Math.random() * 3 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      container.appendChild(particle);
    }

    return () => {
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="bg-animation">
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
      <div className="gradient-orb orb-4"></div>
      <div className="gradient-orb orb-5"></div>
      <div className="floating-line line-1"></div>
      <div className="floating-line line-2"></div>
      <div className="floating-line line-3"></div>
      <div className="shooting-stars">
        <div className="shooting-star star-1"></div>
        <div className="shooting-star star-2"></div>
        <div className="shooting-star star-3"></div>
        <div className="shooting-star star-4"></div>
        <div className="shooting-star star-5"></div>
        <div className="shooting-star star-6"></div>
        <div className="shooting-star star-7"></div>
        <div className="shooting-star star-8"></div>
        <div className="shooting-star star-9"></div>
        <div className="shooting-star star-10"></div>
        <div className="shooting-star star-11"></div>
        <div className="shooting-star star-12"></div>
      </div>
      <div className="particles" id="particles"></div>
    </div>
  );
};

export default BackgroundAnimation;
