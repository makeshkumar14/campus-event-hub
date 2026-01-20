"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  // Access session data (user info) and status
  const { data: session, status } = useSession();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle smooth scrolling to anchor tags
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "";
  };

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        document.body.style.overflow = "";
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`} id="navbar">
      <div className="nav-container">
        <Link href="/" className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">CampusVibe</span>
        </Link>

        <ul
          className={`nav-links ${isMobileMenuOpen ? "active" : ""}`}
          id="navLinks"
        >
          <li>
            <a href="#events" onClick={(e) => handleNavClick(e, "#events")}>
              Events
            </a>
          </li>
          <li>
            <a href="#features" onClick={(e) => handleNavClick(e, "#features")}>
              Features
            </a>
          </li>
          <li>
            <a href="#why" onClick={(e) => handleNavClick(e, "#why")}>
              Why Us
            </a>
          </li>
          <li>
            <a href="#clubs" onClick={(e) => handleNavClick(e, "#clubs")}>
              Top Clubs
            </a>
          </li>

          {/* --- AUTHENTICATION LOGIC START --- */}
          {status === "loading" ? (
            // 1. Loading State
            <li>
              <span className="nav-loading">...</span>
            </li>
          ) : status === "authenticated" && session?.user ? (
            // 2. LOGGED IN VIEW
            <li className="user-profile-item">
              <div className="user-menu-container">
                <div className="user-info">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      className="user-avatar"
                      referrerPolicy="no-referrer" // FIX: Allows Google images to load
                    />
                  ) : (
                    <div className="user-avatar-placeholder">
                      {session.user.name?.charAt(0) || "U"}
                    </div>
                  )}
                  <span className="user-name">
                    {session.user.name?.split(" ")[0]}
                  </span>
                </div>
                <button onClick={() => signOut()} className="nav-btn-secondary">
                  Logout
                </button>
              </div>
            </li>
          ) : (
            // 3. LOGGED OUT VIEW
            <li>
              <button onClick={() => signIn("google")} className="nav-btn">
                Sign In
              </button>
            </li>
          )}
          {/* --- AUTHENTICATION LOGIC END --- */}

          <li>
            <a
              href="#register"
              className="nav-btn register-btn"
              onClick={(e) => handleNavClick(e, "#register")}
            >
              Register Club
            </a>
          </li>
        </ul>

        <div
          className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
          id="hamburger"
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* Inline Styles for User Profile Elements */}
      <style jsx>{`
        .user-menu-container {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid var(--primary, #8b5cf6);
          object-fit: cover;
        }
        .user-avatar-placeholder {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary, #8b5cf6);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 14px;
        }
        .user-name {
          font-weight: 500;
          color: var(--text-primary, #ffffff);
          font-size: 0.95rem;
        }
        .nav-btn-secondary {
          padding: 6px 16px;
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: var(--text-primary, #ffffff);
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .nav-btn-secondary:hover {
          background: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-1px);
        }
        .nav-loading {
          color: rgba(255, 255, 255, 0.5);
        }
        .register-btn {
          margin-left: 10px;
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .user-menu-container {
            flex-direction: column;
            gap: 15px;
            margin-top: 15px;
            padding-top: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            width: 100%;
            align-items: center;
          }
          .user-info {
            flex-direction: column;
          }
          .register-btn {
            margin-left: 0;
            margin-top: 10px;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
