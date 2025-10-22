import React from 'react';
import { Link } from 'react-router-dom';
import './CallToActionSection.css';

const CallToActionSection = ({ headline, description, buttonText, buttonLink }) => {
  return (
    <section className="call-to-action-section">
      <div className="cta-content">
        <h2 className="cta-headline">{headline}</h2>
        <p className="cta-description">{description}</p>
        <Link to={buttonLink} className="cta-button">{buttonText}</Link>
      </div>
    </section>
  );
};

export default CallToActionSection;