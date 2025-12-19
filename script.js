/* ============================================
   CampusVibe - JavaScript Interactions
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all features
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initParticles();
  initCounterAnimation();
  initSmoothScroll();
  initFormHandler();
  initTiltEffect();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  });
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navLinks.classList.remove("active");
      document.body.style.overflow = "";
    });
  });
}

/**
 * Scroll reveal animations
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const revealPoint = 150;

    reveals.forEach((element, index) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealPoint) {
        setTimeout(() => {
          element.classList.add("active");
        }, index * 100);
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Initial check
}

/**
 * Particle background effect
 */
function initParticles() {
  const particlesContainer = document.getElementById("particles");
  const particleCount = 50;

  for (let i = 0; i < particleCount; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  // Random position
  particle.style.left = Math.random() * 100 + "%";
  particle.style.top = Math.random() * 100 + "%";

  // Random animation delay
  particle.style.animationDelay = Math.random() * 4 + "s";

  // Random size
  const size = Math.random() * 3 + 1;
  particle.style.width = size + "px";
  particle.style.height = size + "px";

  container.appendChild(particle);
}

/**
 * Counter animation for stats
 */
function initCounterAnimation() {
  const counters = document.querySelectorAll(".stat-number");
  const speed = 200;

  const animateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
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
  };

  // Use Intersection Observer to trigger animation when visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function formatNumber(num) {
  if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "K+";
  }
  return num + "+";
}

/**
 * Smooth scroll for navigation links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Form submission handler
 */
function initFormHandler() {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const btn = form.querySelector("button");
    const originalContent = btn.innerHTML;

    // Show loading state
    btn.innerHTML = "<span>Registering...</span>";
    btn.disabled = true;

    // Simulate API call
    setTimeout(() => {
      // Success animation
      btn.innerHTML = "<span>✓ Registered Successfully!</span>";
      btn.style.background = "linear-gradient(135deg, #10B981, #059669)";

      // Reset form
      form.reset();

      // Reset button after delay
      setTimeout(() => {
        btn.innerHTML = originalContent;
        btn.style.background = "";
        btn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

/**
 * 3D Tilt effect for feature cards
 */
function initTiltEffect() {
  const cards = document.querySelectorAll("[data-tilt]");

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
  });
}

/**
 * Parallax effect for hero section
 */
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero-content");
  const heroVisual = document.querySelector(".hero-visual");

  if (hero && scrolled < window.innerHeight) {
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    hero.style.opacity = 1 - scrolled / (window.innerHeight * 0.8);
  }

  if (heroVisual && scrolled < window.innerHeight) {
    heroVisual.style.transform = `translateY(${scrolled * 0.2}px)`;
  }

  // Animate gradient orbs based on scroll
  const orbs = document.querySelectorAll(".gradient-orb");
  orbs.forEach((orb, index) => {
    const speed = 0.05 + index * 0.02;
    orb.style.transform = `translate(${scrolled * speed}px, ${
      scrolled * speed
    }px)`;
  });
});

/**
 * Typing effect for hero (optional enhancement)
 */
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

/**
 * Dynamic color theme based on time of day (optional)
 */
function setDynamicTheme() {
  const hour = new Date().getHours();
  const root = document.documentElement;

  if (hour >= 6 && hour < 12) {
    // Morning - Warmer tones
    root.style.setProperty("--accent-purple", "#9333EA");
    root.style.setProperty("--accent-pink", "#F43F5E");
  } else if (hour >= 12 && hour < 18) {
    // Afternoon - Vibrant
    root.style.setProperty("--accent-purple", "#8B5CF6");
    root.style.setProperty("--accent-pink", "#EC4899");
  } else {
    // Night - Cooler tones
    root.style.setProperty("--accent-purple", "#7C3AED");
    root.style.setProperty("--accent-cyan", "#22D3EE");
  }
}

// Uncomment to enable dynamic theming
// setDynamicTheme();

/**
 * Intersection Observer for lazy loading and animations
 */
const lazyLoadObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("loaded");
        lazyLoadObserver.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "50px",
    threshold: 0.1,
  }
);

// Observe elements that should lazy load
document.querySelectorAll(".lazy-load").forEach((el) => {
  lazyLoadObserver.observe(el);
});

/**
 * Mouse follower effect (subtle glow)
 */
function initMouseFollower() {
  const follower = document.createElement("div");
  follower.classList.add("mouse-follower");
  follower.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s ease;
    `;
  document.body.appendChild(follower);

  let mouseX = 0,
    mouseY = 0;
  let followerX = 0,
    followerY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    follower.style.left = followerX + "px";
    follower.style.top = followerY + "px";

    requestAnimationFrame(animate);
  }

  animate();
}

// Initialize mouse follower on desktop only
if (window.innerWidth > 768) {
  initMouseFollower();
}

/**
 * Keyboard navigation support
 */
document.addEventListener("keydown", (e) => {
  // ESC to close mobile menu
  if (e.key === "Escape") {
    const navLinks = document.getElementById("navLinks");
    const hamburger = document.getElementById("hamburger");

    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
});

/**
 * Performance optimization - Debounce scroll events
 */
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll-heavy functions
window.addEventListener(
  "scroll",
  debounce(() => {
    // Additional scroll handlers can go here
  }, 10)
);

console.log("🚀 CampusVibe loaded successfully!");
