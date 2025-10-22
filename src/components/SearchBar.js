import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import './SearchBar.css';

const SearchBar = ({ isVisible, onClose }) => {
  const { searchQuery, setSearchQuery, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      setIsOpen(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    } else {
      setIsOpen(false);
    }
  }, [isVisible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    // Comprehensive searchable content
    const searchableContent = [
      // About & Mission
      { title: 'About Place of Grace', content: 'Learn about our mission, vision, and values for children in Kenya', url: '/about', category: 'About' },
      { title: 'Our Mission', content: 'Providing education, healthcare, and support to vulnerable children', url: '/about', category: 'About' },
      { title: 'Our Vision', content: 'Creating a better future for children and communities in Kenya', url: '/about', category: 'About' },
      { title: 'Our Values', content: 'Compassion, integrity, excellence, and community service', url: '/about', category: 'About' },
      { title: 'Our History', content: 'Founded in 2019, serving children and families for over 4 years', url: '/about', category: 'About' },
      
      // Programs & Services
      { title: 'Educational Programs', content: 'Primary and secondary education for children aged 6-18', url: '/programs', category: 'Programs' },
      { title: 'Healthcare Services', content: 'Medical care, nutrition, and wellness programs', url: '/programs', category: 'Programs' },
      { title: 'Vocational Training', content: 'Skills development and job training for older children', url: '/programs', category: 'Programs' },
      { title: 'Counseling Services', content: 'Psychological support and trauma counseling', url: '/programs', category: 'Programs' },
      { title: 'Recreation Activities', content: 'Sports, arts, and cultural activities for children', url: '/programs', category: 'Programs' },
      { title: 'Community Outreach', content: 'Supporting families and communities in need', url: '/programs', category: 'Programs' },
      
      // Impact & Success Stories
      { title: 'Success Stories', content: 'Real stories of children whose lives we have transformed', url: '/impact', category: 'Impact' },
      { title: 'Impact Statistics', content: 'Numbers showing our reach and effectiveness', url: '/impact', category: 'Impact' },
      { title: 'Children Helped', content: 'Over 200 children supported since 2019', url: '/impact', category: 'Impact' },
      { title: 'Education Achievements', content: 'High school graduation rates and academic success', url: '/impact', category: 'Impact' },
      { title: 'Community Impact', content: 'Positive changes in local communities', url: '/impact', category: 'Impact' },
      
      // How to Help
      { title: 'Donate Now', content: 'Make a financial contribution to support our work', url: '/get-involved', category: 'Support' },
      { title: 'Volunteer', content: 'Join our team as a volunteer and make a difference', url: '/get-involved', category: 'Support' },
      { title: 'Sponsor a Child', content: 'Provide ongoing support for a specific child', url: '/get-involved', category: 'Support' },
      { title: 'Fundraising', content: 'Organize events to raise funds and awareness', url: '/get-involved', category: 'Support' },
      { title: 'Corporate Partnership', content: 'Partner with us for corporate social responsibility', url: '/get-involved', category: 'Support' },
      { title: 'In-Kind Donations', content: 'Donate food, clothing, books, and other essentials', url: '/get-involved', category: 'Support' },
      
      // Gallery & Media
      { title: 'Photo Gallery', content: 'Pictures of our children, activities, and facilities', url: '/gallery', category: 'Media' },
      { title: 'Video Stories', content: 'Videos showcasing our work and impact', url: '/gallery', category: 'Media' },
      { title: 'Events Photos', content: 'Images from special events and celebrations', url: '/gallery', category: 'Media' },
      { title: 'Daily Life', content: 'Snapshots of children in their daily activities', url: '/gallery', category: 'Media' },
      
      // News & Updates
      { title: 'Latest News', content: 'Recent updates and announcements from our organization', url: '/news', category: 'News' },
      { title: 'Events Calendar', content: 'Upcoming events and important dates', url: '/news', category: 'News' },
      { title: 'Press Releases', content: 'Official statements and media coverage', url: '/news', category: 'News' },
      { title: 'Annual Reports', content: 'Yearly reports on our activities and finances', url: '/news', category: 'News' },
      { title: 'Newsletter', content: 'Monthly updates for supporters and donors', url: '/news', category: 'News' },
      
      // Contact & Information
      { title: 'Contact Information', content: 'Phone numbers, email addresses, and physical location', url: '/contact', category: 'Contact' },
      { title: 'Visit Us', content: 'Come and see our facilities and meet our children', url: '/contact', category: 'Contact' },
      { title: 'Office Hours', content: 'When our office is open for visits and inquiries', url: '/contact', category: 'Contact' },
      { title: 'Emergency Contact', content: '24/7 emergency contact information', url: '/contact', category: 'Contact' },
      
      // Specific Services
      { title: 'Orphanage Services', content: 'Residential care for orphaned and abandoned children', url: '/programs', category: 'Services' },
      { title: 'Foster Care', content: 'Temporary and permanent foster care programs', url: '/programs', category: 'Services' },
      { title: 'Adoption Support', content: 'Assistance with legal adoption processes', url: '/programs', category: 'Services' },
      { title: 'Family Reunification', content: 'Helping children reunite with their families', url: '/programs', category: 'Services' },
      { title: 'Aftercare Programs', content: 'Support for children who have left our care', url: '/programs', category: 'Services' },
      
      // Financial Information
      { title: 'Financial Transparency', content: 'How we use donations and manage finances', url: '/transparency', category: 'Transparency' },
      { title: 'Annual Budget', content: 'Detailed breakdown of our yearly expenses', url: '/transparency', category: 'Transparency' },
      { title: 'Donor Recognition', content: 'Acknowledging our generous supporters', url: '/transparency', category: 'Transparency' },
      { title: 'Audit Reports', content: 'Independent financial audits and reviews', url: '/transparency', category: 'Transparency' }
    ];

    const results = searchableContent.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.content.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  const handleResultClick = (url) => {
    onClose();
    setSearchQuery('');
    setSearchResults([]);
    // Navigate to the URL
    window.location.href = url;
  };

  return (
    <div className={`search-overlay ${isOpen ? 'open' : ''}`}>
      <div className="search-container" ref={searchRef}>
        <div className="search-header">
          <h3>{t('search')}</h3>
          <button className="search-close" onClick={onClose}>
            ✕
          </button>
        </div>
        
        <div className="search-input-container">
          <input
            ref={inputRef}
            type="text"
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        {searchResults.length > 0 && (
          <div className="search-results">
            <div className="search-results-header">
              <span className="results-count">{searchResults.length} results found</span>
              <span className="search-tip">💡 Try: "donate", "volunteer", "education", "healthcare"</span>
            </div>
            <div className="search-results-list">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleResultClick(result.url)}
                >
                  <div className="result-header">
                    <h4>{result.title}</h4>
                    <span className="result-category">{result.category}</span>
                  </div>
                  <p>{result.content}</p>
                  <div className="result-url">{result.url}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {searchQuery.length >= 2 && searchResults.length === 0 && (
          <div className="search-no-results">
            <p>No results found for "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
