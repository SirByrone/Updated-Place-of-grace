import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => (
  <div className="loading-spinner-container" role="status" aria-label="Loading">
    <div className="loading-spinner"></div>
    <span className="sr-only">Loading...</span>
  </div>
);

export default LoadingSpinner;
