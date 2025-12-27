import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.pageYOffset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
    document.body.style.overflow = '';
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = '';
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
      <div className="nav-container">
        <a href="#" className="logo">
          <span className="logo-text">CampusVibe</span>
        </a>
        <ul className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`} id="navLinks">
          <li><a href="#hero" onClick={(e) => handleNavClick(e, '#hero')}>Home</a></li>
          <li><a href="#events" onClick={(e) => handleNavClick(e, '#events')}>Events</a></li>
          <li><a href="#clubs" onClick={(e) => handleNavClick(e, '#clubs')}>Top Clubs</a></li>
          <li><a href="#register" className="nav-cta-btn" onClick={(e) => handleNavClick(e, '#register')}>Register</a></li>
        </ul>
        <div
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          id="hamburger"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
