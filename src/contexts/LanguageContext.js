import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const translations = {
    en: {
      home: 'Home',
      about: 'About',
      programs: 'Programs',
      impact: 'Impact',
      help: 'Help',
      gallery: 'Gallery',
      news: 'News',
      contact: 'Contact',
      donate: 'Donate',
      search: 'Search...',
      language: 'Language',
      english: 'English',
      kiswahili: 'Kiswahili'
    },
    sw: {
      home: 'Nyumbani',
      about: 'Kuhusu',
      programs: 'Mipango',
      impact: 'Athari',
      help: 'Msaada',
      gallery: 'Picha',
      news: 'Habari',
      contact: 'Mawasiliano',
      donate: 'Sadaka',
      search: 'Tafuta...',
      language: 'Lugha',
      english: 'English',
      kiswahili: 'Kiswahili'
    }
  };

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const value = {
    language,
    setLanguage,
    searchQuery,
    setSearchQuery,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
