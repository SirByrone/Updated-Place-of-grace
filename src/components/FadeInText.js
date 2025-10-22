import React, { useState, useEffect, useRef } from 'react';
import './FadeInText.css';

const FadeInText = ({ 
  children, 
  delay = 0, 
  duration = 1000, 
  direction = 'up',
  className = '',
  threshold = 0.1
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setTimeout(() => {
            setIsVisible(true);
            setHasAnimated(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold, hasAnimated]);

  const getAnimationClass = () => {
    const baseClass = 'fade-in-text';
    const directionClass = `fade-in-${direction}`;
    const visibleClass = isVisible ? 'fade-in-visible' : '';
    return `${baseClass} ${directionClass} ${visibleClass} ${className}`.trim();
  };

  return (
    <div 
      ref={elementRef}
      className={getAnimationClass()}
      style={{ '--animation-duration': `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeInText;
