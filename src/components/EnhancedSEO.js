import React, { useEffect } from 'react';

const EnhancedSEO = ({ title, description, keywords = [], url }) => {
  useEffect(() => {
    // Update document title
    if (title) {
      document.title = title;
    }

    // Add structured data for better indexing
    addStructuredData();
    
    // Track page view for SEO
    trackPageView();

  }, [title, description, keywords, url]);

  const addStructuredData = () => {
    // Organization schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Place of Grace Community Centre',
      url: 'https://www.placeofgracecommunitycentre.org',
      logo: 'https://www.placeofgracecommunitycentre.org/assets/logo.jpg',
      description: 'Empowering children and communities in Kenya',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Donholm Phase Five Policeline Road',
        addressLocality: 'Nairobi',
        addressCountry: 'KE'
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+254722860321',
          email: 'pogchome2019@gmail.com',
          contactType: 'customer service'
        },
        {
          '@type': 'ContactPoint',
          telephone: '+254722860321',
          email: 'placeofgraceoutreach@gmail.com',
          contactType: 'outreach'
        }
      ]
    };

    // Add to page
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(organizationSchema);
    document.head.appendChild(script);
  };

  const trackPageView = () => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: title,
        page_location: `https://www.placeofgracecommunitycentre.org${url}`,
        page_path: url
      });
    }
  };

  return null;
};

export default EnhancedSEO;
