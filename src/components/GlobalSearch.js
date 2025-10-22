/**
 * Global Search Component - Child-Friendly Search Functionality
 * Implements robust search across all website content
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { sanitizeSearchQuery } from '../utils/security';
import './GlobalSearch.css';

const GlobalSearch = ({ isVisible, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const navigate = useNavigate();

  // Search data - comprehensive content indexing
  const searchData = [
    // Pages
    { 
      title: 'Home', 
      content: 'Welcome to Place of Grace Children\'s Home. We provide love, care, and hope for vulnerable children since 2009.',
      url: '/',
      category: 'page',
      keywords: ['home', 'welcome', 'place of grace', 'children', 'love', 'care', 'hope']
    },
    { 
      title: 'About Us', 
      content: 'Learn about our mission, vision, and the story behind Place of Grace Children\'s Home.',
      url: '/about',
      category: 'page',
      keywords: ['about', 'mission', 'vision', 'story', 'history', 'who we are']
    },
    { 
      title: 'Our Programs', 
      content: 'Discover our educational, healthcare, and rehabilitation programs for children.',
      url: '/programs',
      category: 'page',
      keywords: ['programs', 'education', 'healthcare', 'rehabilitation', 'services', 'activities']
    },
    { 
      title: 'Gallery', 
      content: 'View photos and videos of our children, facilities, and daily activities.',
      url: '/gallery',
      category: 'page',
      keywords: ['gallery', 'photos', 'pictures', 'videos', 'children', 'facilities', 'activities']
    },
    { 
      title: 'Contact Us', 
      content: 'Get in touch with us. Phone: +254 722 860 321, Email: placeofgraceoutreach@gmail.com',
      url: '/contact',
      category: 'page',
      keywords: ['contact', 'phone', 'email', 'address', 'get in touch', 'reach us']
    },
    { 
      title: 'News & Updates', 
      content: 'Latest news, events, and updates from Place of Grace Children\'s Home.',
      url: '/news',
      category: 'page',
      keywords: ['news', 'updates', 'events', 'latest', 'announcements', 'happenings']
    },
    { 
      title: 'Get Involved', 
      content: 'Learn how to volunteer, donate, or partner with us to help vulnerable children.',
      url: '/get-involved',
      category: 'page',
      keywords: ['volunteer', 'donate', 'partner', 'help', 'support', 'get involved', 'contribute']
    },
    { 
      title: 'Our Impact', 
      content: 'See the positive impact we\'ve made in the lives of children and the community.',
      url: '/impact',
      category: 'page',
      keywords: ['impact', 'success', 'stories', 'results', 'achievements', 'outcomes']
    },
    { 
      title: 'FAQ', 
      content: 'Frequently asked questions about our programs, admission, and services.',
      url: '/faq',
      category: 'page',
      keywords: ['faq', 'questions', 'answers', 'help', 'common questions', 'information']
    },
    { 
      title: 'Transparency', 
      content: 'Our financial reports, governance, and accountability information.',
      url: '/transparency',
      category: 'page',
      keywords: ['transparency', 'financial', 'reports', 'governance', 'accountability', 'finances']
    },

    // Services & Programs
    { 
      title: 'Education Support', 
      content: 'We provide quality education and school sponsorships for all children.',
      url: '/programs#education',
      category: 'service',
      keywords: ['education', 'school', 'learning', 'sponsorship', 'academic', 'studies']
    },
    { 
      title: 'Healthcare Services', 
      content: 'Medical care, nutrition programs, and health monitoring for children.',
      url: '/programs#healthcare',
      category: 'service',
      keywords: ['healthcare', 'medical', 'nutrition', 'health', 'doctor', 'medicine']
    },
    { 
      title: 'Psychosocial Support', 
      content: 'Counseling and emotional support to help children heal and grow.',
      url: '/programs#psychosocial',
      category: 'service',
      keywords: ['counseling', 'emotional', 'support', 'healing', 'therapy', 'mental health']
    },
    { 
      title: 'Skills Development', 
      content: 'Life skills training and vocational programs for older children.',
      url: '/programs#skills',
      category: 'service',
      keywords: ['skills', 'training', 'vocational', 'life skills', 'employment', 'work']
    },

    // Contact Information
    { 
      title: 'Phone Number', 
      content: 'Call us at +254 722 860 321',
      url: '/contact',
      category: 'contact',
      keywords: ['phone', 'call', 'telephone', 'number', '+254', '722', '860', '321']
    },
    { 
      title: 'Email Address', 
      content: 'Email us at placeofgraceoutreach@gmail.com',
      url: '/contact',
      category: 'contact',
      keywords: ['email', 'mail', 'placeofgraceoutreach', 'gmail', 'contact email']
    },
    { 
      title: 'Our Location', 
      content: 'Visit us at Donholm Phase Five Policeline Road, Nairobi',
      url: '/contact',
      category: 'contact',
      keywords: ['address', 'location', 'donholm', 'nairobi', 'policeline', 'visit']
    },

    // Common searches children might make
    { 
      title: 'How to Help Children', 
      content: 'Learn different ways you can help vulnerable children through donations, volunteering, or sponsorship.',
      url: '/get-involved',
      category: 'help',
      keywords: ['help children', 'help kids', 'support children', 'vulnerable children', 'orphans']
    },
    { 
      title: 'Donate Money', 
      content: 'Make a donation to support our programs and help care for children.',
      url: '/get-involved#donate',
      category: 'help',
      keywords: ['donate', 'donation', 'money', 'give', 'support', 'contribute', 'help financially']
    },
    { 
      title: 'Volunteer with Us', 
      content: 'Join our volunteer program and make a direct impact in children\'s lives.',
      url: '/get-involved#volunteer',
      category: 'help',
      keywords: ['volunteer', 'help', 'join', 'participate', 'work with children', 'give time']
    }
  ];

  // Perform search with child-friendly approach
  const performSearch = useCallback((query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      return;
    }

    const sanitizedQuery = sanitizeSearchQuery(query.toLowerCase());
    const results = [];

    searchData.forEach(item => {
      let score = 0;
      const searchableText = `${item.title} ${item.content} ${item.keywords.join(' ')}`.toLowerCase();

      // Exact title match (highest priority)
      if (item.title.toLowerCase().includes(sanitizedQuery)) {
        score += 100;
      }

      // Keyword match (high priority)
      item.keywords.forEach(keyword => {
        if (keyword.toLowerCase().includes(sanitizedQuery)) {
          score += 50;
        }
      });

      // Content match (medium priority)
      if (item.content.toLowerCase().includes(sanitizedQuery)) {
        score += 25;
      }

      // Fuzzy matching for common misspellings
      const words = sanitizedQuery.split(' ');
      words.forEach(word => {
        if (word.length > 3 && searchableText.includes(word.substring(0, word.length - 1))) {
          score += 10;
        }
      });

      if (score > 0) {
        results.push({ ...item, score });
      }
    });

    // Sort by relevance score and limit results
    const sortedResults = results
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);

    setSearchResults(sortedResults);
  }, []);

  // Handle search input with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm) {
        setIsSearching(true);
        performSearch(searchTerm);
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, performSearch]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isVisible) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < searchResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && searchResults[selectedIndex]) {
            handleResultClick(searchResults[selectedIndex]);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible, searchResults, selectedIndex, onClose]);

  // Handle search result click
  const handleResultClick = (result) => {
    navigate(result.url);
    onClose();
    setSearchTerm('');
    setSearchResults([]);
    setSelectedIndex(-1);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = sanitizeSearchQuery(e.target.value);
    setSearchTerm(value);
    setSelectedIndex(-1);
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'page': return '📄';
      case 'service': return '🎯';
      case 'contact': return '📞';
      case 'help': return '❤️';
      default: return '🔍';
    }
  };

  // Get category name for display
  const getCategoryName = (category) => {
    switch (category) {
      case 'page': return 'Page';
      case 'service': return 'Service';
      case 'contact': return 'Contact';
      case 'help': return 'How to Help';
      default: return 'Result';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="global-search-overlay" onClick={onClose}>
      <div className="global-search-container" onClick={e => e.stopPropagation()}>
        <div className="search-header">
          <div className="search-input-container">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search for anything... (e.g., 'contact', 'help children', 'donate')"
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
              autoFocus
              aria-label="Search website"
            />
            <button 
              className="search-close"
              onClick={onClose}
              aria-label="Close search"
            >
              ×
            </button>
          </div>
        </div>

        <div className="search-results">
          {isSearching && (
            <div className="search-loading">
              <span className="loading-spinner"></span>
              Searching...
            </div>
          )}

          {searchTerm && !isSearching && searchResults.length === 0 && (
            <div className="no-results">
              <span className="no-results-icon">😔</span>
              <h3>No results found</h3>
              <p>Try searching for:</p>
              <ul className="search-suggestions">
                <li>"contact" - to find our phone and email</li>
                <li>"help children" - to learn how to support us</li>
                <li>"programs" - to see what we do</li>
                <li>"donate" - to make a contribution</li>
              </ul>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="results-list">
              <p className="results-count">
                Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
              </p>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleResultClick(result)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleResultClick(result);
                    }
                  }}
                >
                  <div className="result-category">
                    <span className="category-icon">{getCategoryIcon(result.category)}</span>
                    <span className="category-name">{getCategoryName(result.category)}</span>
                  </div>
                  <h4 className="result-title">{result.title}</h4>
                  <p className="result-content">{result.content}</p>
                  <span className="result-url">{result.url}</span>
                </div>
              ))}
            </div>
          )}

          {!searchTerm && (
            <div className="search-suggestions-default">
              <h3>Popular Searches</h3>
              <div className="suggestion-chips">
                <button onClick={() => setSearchTerm('contact')}>Contact Us</button>
                <button onClick={() => setSearchTerm('help children')}>Help Children</button>
                <button onClick={() => setSearchTerm('donate')}>Donate</button>
                <button onClick={() => setSearchTerm('volunteer')}>Volunteer</button>
                <button onClick={() => setSearchTerm('programs')}>Our Programs</button>
                <button onClick={() => setSearchTerm('gallery')}>Photos</button>
              </div>
            </div>
          )}
        </div>

        <div className="search-footer">
          <p className="search-hint">
            💡 Use <kbd>↑</kbd> <kbd>↓</kbd> arrows to navigate, <kbd>Enter</kbd> to select, <kbd>Esc</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;
