import React from 'react';
import { Link } from 'react-router-dom';
import './HeroBanner.css';

const HeroBanner = ({ title, tagline, introText, imageSrc, videoSrc, cta1Text, cta1Link, cta2Text, cta2Link, cta3Text, cta3Link }) => {
  return (
    <section className="hero-banner">
      {videoSrc ? (
        <video autoPlay loop muted playsInline className="hero-video">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img src={imageSrc} alt="Children cycling to school" className="hero-image" />
      )}
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>{title}</h1>
        <p className="tagline">{tagline}</p>
        <p className="intro-text">{introText}</p>
        <div className="hero-ctas">
          <Link to={cta1Link} className="hero-cta-button primary">{cta1Text}</Link>
          <Link to={cta2Link} className="hero-cta-button">{cta2Text}</Link>
          <Link to={cta3Link} className="hero-cta-button">{cta3Text}</Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;