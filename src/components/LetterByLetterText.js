import React, { useState, useEffect, useRef, useCallback } from 'react';
import './LetterByLetterText.css';

const LetterByLetterText = ({ 
  text, 
  delay = 0, 
  duration = 0.05, 
  className = '',
  isVisible = false,
  reverse = false,
  showCursor = true
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  const animateText = useCallback(() => {
    if (reverse) {
      // Reverse animation - show letters from end to beginning (e to H for "Home")
      if (currentIndex < text.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(text.substring(text.length - currentIndex - 1));
          setCurrentIndex(prev => prev + 1);
        }, delay + (currentIndex * duration * 1000));
      } else if (currentIndex === text.length && !isComplete) {
        setIsComplete(true);
      }
    } else {
      // Forward animation - show letters one by one
      if (currentIndex < text.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, delay + (currentIndex * duration * 1000));
      } else if (currentIndex === text.length && !isComplete) {
        setIsComplete(true);
      }
    }
  }, [currentIndex, text, delay, duration, isComplete, reverse]);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedText('');
      setCurrentIndex(0);
      setIsComplete(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      return;
    }

    if (isVisible && currentIndex < text.length) {
      animateText();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isVisible, currentIndex, text, delay, duration, animateText]);

  return (
    <span className={`letter-by-letter-text ${className} ${isComplete ? 'complete' : ''}`}>
      {displayedText}
      {!isComplete && showCursor && <span className="cursor">|</span>}
    </span>
  );
};

export default LetterByLetterText;
