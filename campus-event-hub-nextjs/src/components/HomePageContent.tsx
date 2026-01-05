'use client';

import { useEffect } from 'react';
import Hero from '@/components/Hero';
import EventsSlider from '@/components/EventsSlider';
import AllEventsGrid from '@/components/AllEventsGrid';
import ClubsSection from '@/components/ClubsSection';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import { useScrollReveal, useMouseFollower, useParallax } from '@/hooks/useAnimations';

const HomePageContent = () => {
  // Initialize custom hooks
  useScrollReveal();
  useMouseFollower();
  useParallax();

  // Initialize tilt effect for cards
  useEffect(() => {
    const initTiltEffect = () => {
      const cards = document.querySelectorAll('[data-tilt]');

      cards.forEach((card) => {
        const handleMouseMove = (e: Event) => {
          const mouseEvent = e as MouseEvent;
          const cardElement = card as HTMLElement;
          const rect = cardElement.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          const rotateX = (y - centerY) / 20;
          const rotateY = (centerX - x) / 20;

          cardElement.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        };

        const handleMouseLeave = () => {
          (card as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
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
      <CTASection />
      <Footer />
    </>
  );
};

export default HomePageContent;
