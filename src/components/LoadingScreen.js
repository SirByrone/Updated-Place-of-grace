import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    const showTimer = setTimeout(() => {
      setShowContent(true);
    }, 300);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15 + 5; // Random progress increments
      });
    }, 200);

    // Complete loading after progress reaches 100%
    const completeTimer = setTimeout(() => {
      if (loadingProgress >= 100) {
        setFadeOut(true);
        setTimeout(() => {
          onLoadingComplete();
        }, 800); // Wait for fade out animation
      }
    }, 2500); // Minimum loading time

    return () => {
      clearTimeout(showTimer);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [loadingProgress, onLoadingComplete]);

  const handleLogoError = () => {
    setLogoError(true);
  };

  return (
    <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
      {/* Background with animated gradient */}
      <div className="loading-background">
        <div className="gradient-overlay"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" style={{
              '--delay': `${i * 0.2}s`,
              '--duration': `${2 + i * 0.1}s`,
              '--size': `${3 + i * 2}px`,
              '--opacity': `${0.3 + i * 0.02}`
            }}></div>
          ))}
        </div>
      </div>

      {/* Main content container */}
      <div className="loading-content">
        {/* Logo container with animation */}
        <div className={`logo-container ${showContent ? 'animate-in' : ''}`}>
          <div className="logo-wrapper">
            {!logoError ? (
              <img 
                src="/assets/logo.jpg" 
                alt="Place of Grace Community Centre Logo" 
                className="loading-logo"
                onError={handleLogoError}
              />
            ) : (
              <div className="logo-fallback">
                <div className="logo-placeholder">POG</div>
              </div>
            )}
            <div className="logo-glow"></div>
          </div>
        </div>

        {/* Organization name with typewriter effect */}
        <div className={`org-name ${showContent ? 'animate-in' : ''}`}>
          <h1 className="org-title">
            <span className="title-line">Place of Grace</span>
            <span className="title-line">Community Centre</span>
          </h1>
          <div className="title-underline"></div>
        </div>

        {/* Tagline */}
        <div className={`tagline ${showContent ? 'animate-in' : ''}`}>
          <p>Empowering Lives, Building Communities</p>
        </div>

        {/* Loading progress bar */}
        <div className={`progress-container ${showContent ? 'animate-in' : ''}`}>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="progress-text">
            <span className="loading-text">Loading...</span>
            <span className="progress-percentage">{Math.round(loadingProgress)}%</span>
          </div>
        </div>

        {/* Loading dots animation */}
        <div className={`loading-dots ${showContent ? 'animate-in' : ''}`}>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>

      {/* Corner decorative elements */}
      <div className="corner-decoration top-left"></div>
      <div className="corner-decoration top-right"></div>
      <div className="corner-decoration bottom-left"></div>
      <div className="corner-decoration bottom-right"></div>
    </div>
  );
};

export default LoadingScreen;
