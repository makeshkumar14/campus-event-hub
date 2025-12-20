import { useEffect } from 'react';
import BackgroundAnimation from './components/BackgroundAnimation';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import EventsSlider from './components/EventsSlider';
import AllEventsGrid from './components/AllEventsGrid';
import WhySection from './components/WhySection';
import FeaturesSection from './components/FeaturesSection';
import ClubsSection from './components/ClubsSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import { useScrollReveal, useMouseFollower, useParallax } from './hooks/useAnimations';

function App() {
  // Initialize custom hooks
  useScrollReveal();
  useMouseFollower();
  useParallax();

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

  useEffect(() => {
    console.log('🚀 CampusVibe React loaded successfully!');
  }, []);

  return (
    <>
      <BackgroundAnimation />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <EventsSlider />
      <AllEventsGrid />
      <WhySection />
      <FeaturesSection />
      <ClubsSection />
      <CTASection />
      <Footer />
    </>
  );
}

export default App;
