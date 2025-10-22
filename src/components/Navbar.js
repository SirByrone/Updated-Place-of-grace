import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import LetterByLetterText from './LetterByLetterText';
import SearchBar from './SearchBar';
import { useLanguage } from '../contexts/LanguageContext';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsLanguageOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const toggleLanguage = (e) => {
    e.stopPropagation();
    setIsLanguageOpen(!isLanguageOpen);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLanguageOpen(false);
    // Force re-render by updating a dummy state
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleNavClick = (e) => {
    closeMenu();
    
    // Add a small delay to allow the menu to close before scrolling
    setTimeout(() => {
      smoothScrollToTop();
    }, 150);
  };

  const handleDesktopNavClick = () => {
    // Smooth scroll to top for desktop navigation
    smoothScrollToTop();
  };

  const smoothScrollToTop = () => {
    // Set scrolling state for visual feedback
    setIsScrolling(true);
    
    // Enhanced smooth scroll with better performance and cross-browser support
    const startPosition = window.pageYOffset || document.documentElement.scrollTop;
    const startTime = performance.now();
    const duration = 1000; // Increased duration for smoother experience

    const animateScroll = (currentTime) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Enhanced easing function for smoother animation (ease-in-out)
      const easeInOut = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const currentPosition = startPosition * (1 - easeInOut);
      
      // Use both scrollTo methods for better browser compatibility
      window.scrollTo(0, currentPosition);
      document.documentElement.scrollTop = currentPosition;
      document.body.scrollTop = currentPosition; // For older browsers
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Ensure we're at the very top
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        
        // Reset scrolling state when animation completes
        setTimeout(() => {
          setIsScrolling(false);
        }, 100);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isScrolling ? 'scrolling' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <img 
            src="/assets/logo.jpg" 
            alt="Place of Grace Community Centre Logo" 
            className="logo-image"
          />
          <div className="logo-text-container">
            <span className="logo-text-main">Place of Grace</span>
            <span className="logo-text-sub">Community Centre</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-links-desktop">
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={handleDesktopNavClick}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={handleDesktopNavClick}
          >
            About Us
          </Link>
          <Link 
            to="/programs" 
            className={`nav-link ${isActive('/programs') ? 'active' : ''}`}
            onClick={handleDesktopNavClick}
          >
            Programs
          </Link>
          <Link 
            to="/impact" 
            className={`nav-link ${isActive('/impact') ? 'active' : ''}`}
            onClick={handleDesktopNavClick}
          >
            Impact
          </Link>
          <Link 
            to="/get-involved" 
            className={`nav-link ${isActive('/get-involved') ? 'active' : ''}`}
            onClick={handleDesktopNavClick}
          >
            How to Help
          </Link>
          <Link 
            to="/gallery" 
            className={`nav-link ${isActive('/gallery') ? 'active' : ''}`}
            onClick={handleDesktopNavClick}
          >
            Gallery
          </Link>
          <Link 
            to="/news" 
            className={`nav-link ${isActive('/news') ? 'active' : ''}`}
            onClick={handleDesktopNavClick}
          >
            News
          </Link>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={handleDesktopNavClick}
          >
            Contact
          </Link>
        </div>

        {/* Donate Button - Desktop */}
        <Link to="/get-involved" className="donate-button-desktop" onClick={handleDesktopNavClick}>
          Donate Now
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div className="mobile-logo">
            <img 
              src="/assets/logo.jpg" 
              alt="Place of Grace Logo" 
              className="mobile-logo-image"
            />
            <span className="mobile-logo-text">Place of Grace</span>
          </div>
          <button 
            className="mobile-menu-close"
            onClick={closeMenu}
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        {/* Search and Language Controls */}
        <div className="mobile-controls">
          <button 
            className="mobile-control-btn search-btn"
            onClick={toggleSearch}
            aria-label="Search"
          >
            🔍
          </button>
          <div className="language-dropdown">
            <button 
              className="mobile-control-btn language-btn"
              onClick={toggleLanguage}
              aria-label="Language"
            >
              🌐
            </button>
            {isLanguageOpen && (
              <div className="language-options">
                <button 
                  className={`language-option ${language === 'en' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('en')}
                >
                  🇺🇸 English
                </button>
                <button 
                  className={`language-option ${language === 'sw' ? 'active' : ''}`}
                  onClick={() => handleLanguageChange('sw')}
                >
                  🇰🇪 Kiswahili
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="mobile-menu-links">
          <Link 
            to="/" 
            className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <span className="mobile-nav-icon">🏠</span>
            <LetterByLetterText 
              text={t('home')} 
              delay={0.15} 
              duration={0.05} 
              isVisible={isMenuOpen}
              reverse={true}
              showCursor={false}
              className="reverse-typewriter"
            />
          </Link>
          <Link 
            to="/about" 
            className={`mobile-nav-link ${isActive('/about') ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <span className="mobile-nav-icon">ℹ️</span>
            <LetterByLetterText 
              text={t('about')} 
              delay={0.2} 
              duration={0.05} 
              isVisible={isMenuOpen}
              reverse={true}
              showCursor={false}
              className="reverse-typewriter"
            />
          </Link>
          <Link 
            to="/programs" 
            className={`mobile-nav-link ${isActive('/programs') ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <span className="mobile-nav-icon">📚</span>
            <LetterByLetterText 
              text={t('programs')} 
              delay={0.25} 
              duration={0.05} 
              isVisible={isMenuOpen}
              reverse={true}
              showCursor={false}
              className="reverse-typewriter"
            />
          </Link>
          <Link 
            to="/impact" 
            className={`mobile-nav-link ${isActive('/impact') ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <span className="mobile-nav-icon">📊</span>
            <LetterByLetterText 
              text={t('impact')} 
              delay={0.3} 
              duration={0.05} 
              isVisible={isMenuOpen}
              reverse={true}
              showCursor={false}
              className="reverse-typewriter"
            />
          </Link>
          <Link 
            to="/get-involved" 
            className={`mobile-nav-link ${isActive('/get-involved') ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <span className="mobile-nav-icon">💪</span>
            <LetterByLetterText 
              text={t('help')} 
              delay={0.35} 
              duration={0.05} 
              isVisible={isMenuOpen}
              reverse={true}
              showCursor={false}
              className="reverse-typewriter"
            />
          </Link>
          <Link 
            to="/gallery" 
            className={`mobile-nav-link ${isActive('/gallery') ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <span className="mobile-nav-icon">🖼️</span>
            <LetterByLetterText 
              text={t('gallery')} 
              delay={0.4} 
              duration={0.05} 
              isVisible={isMenuOpen}
              reverse={true}
              showCursor={false}
              className="reverse-typewriter"
            />
          </Link>
          <Link 
            to="/news" 
            className={`mobile-nav-link ${isActive('/news') ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <span className="mobile-nav-icon">📰</span>
            <LetterByLetterText 
              text={t('news')} 
              delay={0.45} 
              duration={0.05} 
              isVisible={isMenuOpen}
              reverse={true}
              showCursor={false}
              className="reverse-typewriter"
            />
          </Link>
          <Link 
            to="/contact" 
            className={`mobile-nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={handleNavClick}
          >
            <span className="mobile-nav-icon">📞</span>
            <LetterByLetterText 
              text={t('contact')} 
              delay={0.5} 
              duration={0.05} 
              isVisible={isMenuOpen}
              reverse={true}
              showCursor={false}
              className="reverse-typewriter"
            />
          </Link>
        </div>

        {/* Mobile Donate Button */}
        <div className="mobile-menu-footer">
          <Link to="/get-involved" className="mobile-donate-button" onClick={handleNavClick}>
            💝 <LetterByLetterText 
              text={t('donate')} 
              delay={0.55} 
              duration={0.05} 
              isVisible={isMenuOpen}
              reverse={true}
              showCursor={false}
              className="reverse-typewriter"
            />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={closeMenu}></div>
      )}

      {/* Search Bar */}
      <SearchBar 
        isVisible={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </nav>
  );
};

export default Navbar;