import React from 'react';
import './ImpactSection.css';

const ImpactSection = ({ title, stats, description, className = '' }) => {
  return (
    <section className={`impact-section ${className}`}>
      <div className="container">
        {title && <h2 className="section-title">{title}</h2>}
        {description && <p className="section-description">{description}</p>}
        
        {stats && (
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <h3 className="stat-number">{stat.number}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ImpactSection; 