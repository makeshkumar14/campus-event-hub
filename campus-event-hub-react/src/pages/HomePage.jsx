import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import EventsSlider from '../components/EventsSlider';
import AllEventsGrid from '../components/AllEventsGrid';
import WhySection from '../components/WhySection';
import FeaturesSection from '../components/FeaturesSection';
import ClubsSection from '../components/ClubsSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import { useScrollReveal, useMouseFollower, useParallax } from '../hooks/useAnimations';

function HomePage() {
  const location = useLocation();
  
  // Initialize custom hooks
  useScrollReveal();
  useMouseFollower();
  useParallax();

  // Scroll to hash section when navigating back, or scroll to top on reload
  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      // Scroll to top on page load/reload
      window.scrollTo(0, 0);
    }
  }, [location]);

  // Initialize tilt effect for cards
  useEffect(() => {
    const initTiltEffect = () => {
      const cards = document.querySelectorAll('[data-tilt]');
      
      cards.forEach((card) => {
        const handleMouseMove = (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        };

        const handleMouseLeave = () => {
          card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Wait for DOM to be fully loaded
    setTimeout(initTiltEffect, 100);
  }, []);

  return (
    <>
      <Hero />
      <EventsSlider />
      <AllEventsGrid />
      <ClubsSection />
      <FeaturesSection />
      <WhySection />
      <CTASection />
      <Footer />
    </>
  );
}

export default HomePage;
