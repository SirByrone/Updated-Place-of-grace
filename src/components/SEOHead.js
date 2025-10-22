/**
 * SEO Head Component for Place of Grace Children's Home
 * Dynamic SEO meta tags and structured data for each page
 */

import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { updateSEO, SEO_CONFIG } from '../utils/seo';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  canonical, 
  ogType = 'website',
  structuredData = null,
  noIndex = false,
  noFollow = false 
}) => {
  const location = useLocation();

  useEffect(() => {
    // Determine current page from location
    const currentPage = location.pathname.slice(1) || 'home';
    
    // Update SEO for current page
    updateSEO(currentPage, {
      title,
      description,
      keywords,
      image,
      canonical,
      ogType
    });

    // Add structured data if provided
    if (structuredData) {
      addStructuredData(structuredData);
    }

    // Handle noindex/nofollow
    if (noIndex || noFollow) {
      updateRobotsMeta(noIndex, noFollow);
    }

    // Track page view for analytics
    trackPageView(currentPage, title);

  }, [location.pathname, title, description, keywords, image, canonical, ogType, structuredData, noIndex, noFollow]);

  // Add structured data to head
  const addStructuredData = (data) => {
    // Remove existing structured data
    const existingScript = document.querySelector('script[data-structured="true"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.setAttribute('data-structured', 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  };

  // Update robots meta tag
  const updateRobotsMeta = (noIndex, noFollow) => {
    let content = '';
    if (noIndex) content += 'noindex';
    if (noFollow) content += ',nofollow';
    if (!noIndex && !noFollow) content = 'index,follow';

    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  };

  // Track page view
  const trackPageView = (page, pageTitle) => {
    // Google Analytics
    if (window.gtag) {
      window.gtag('config', process.env.REACT_APP_GA_ID || '', {
        page_title: pageTitle,
        page_location: `${SEO_CONFIG.domain}${location.pathname}`,
        page_path: location.pathname
      });
    }

    // Facebook Pixel
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }

    // Custom analytics
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'page_view',
        page: page,
        title: pageTitle,
        url: `${SEO_CONFIG.domain}${location.pathname}`
      });
    }
  };

  return null; // This component doesn't render anything
};

// Predefined SEO configurations for common pages
export const SEOConfigs = {
  home: {
    title: 'Place of Grace Community Centre - Empowering Children & Communities in Kenya',
    description: 'Place of Grace Community Centre is a non-profit organization dedicated to providing education, healthcare, and support to vulnerable children and communities in Kenya. Join us in making a difference.',
    keywords: 'Place of Grace, Community Centre, Kenya, children\'s home, education, healthcare, non-profit, charity, orphanage, community development',
    image: '/assets/logo.jpg',
    ogType: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Place of Grace Community Centre',
      url: SEO_CONFIG.domain,
      description: SEO_CONFIG.defaultDescription,
      publisher: {
        '@type': 'Organization',
        name: SEO_CONFIG.siteName
      }
    }
  },
  about: {
    title: 'About Us - Place of Grace Community Centre | Our Mission & Vision',
    description: 'Learn about Place of Grace Community Centre\'s mission to empower vulnerable children and communities in Kenya through education, healthcare, and comprehensive support programs.',
    keywords: 'about Place of Grace, mission, vision, Kenya charity, community development, children\'s home Kenya, non-profit organization',
    image: '/about-image.jpg',
    ogType: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Place of Grace Community Centre',
      description: 'Learn about our mission, vision, and commitment to empowering children and communities in Kenya.',
      url: `${SEO_CONFIG.domain}/about`,
      mainEntity: {
        '@type': 'Organization',
        name: SEO_CONFIG.siteName,
        description: SEO_CONFIG.defaultDescription
      }
    }
  },
  programs: {
    title: 'Our Programs - Place of Grace Community Centre | Education & Healthcare Services',
    description: 'Discover our comprehensive programs including children\'s education, healthcare services, community development, and psychosocial support at Place of Grace Community Centre.',
    keywords: 'children\'s programs, education programs, healthcare services, community development, psychosocial support, Kenya charity programs',
    image: '/programs-image.jpg',
    ogType: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Community Programs',
      description: 'Comprehensive education, healthcare, and community development programs',
      provider: {
        '@type': 'Organization',
        name: SEO_CONFIG.siteName
      },
      areaServed: {
        '@type': 'Country',
        name: 'Kenya'
      }
    }
  },
  contact: {
    title: 'Contact Us - Place of Grace Community Centre | Get in Touch',
    description: 'Contact Place of Grace Community Centre in Kenya. Reach out for donations, volunteering opportunities, or to learn more about our programs. Phone: +254-722-869-321',
    keywords: 'contact Place of Grace, Kenya charity contact, donate, volunteer, children\'s home contact, community centre Kenya',
    image: '/contact-image.jpg',
    ogType: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Place of Grace Community Centre',
      description: 'Get in touch with us for donations, volunteering, or to learn more about our programs.',
      url: `${SEO_CONFIG.domain}/contact`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: SEO_CONFIG.phone,
        email: SEO_CONFIG.email,
        contactType: 'customer service'
      }
    }
  },
  getInvolved: {
    title: 'Get Involved - Place of Grace Community Centre | Donate, Volunteer, Sponsor',
    description: 'Get involved with Place of Grace Community Centre. Donate, volunteer, sponsor a child, or support our programs to help vulnerable children in Kenya.',
    keywords: 'donate, volunteer, sponsor a child, get involved, Kenya charity, children\'s home support, community development Kenya',
    image: '/get-involved-image.jpg',
    ogType: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Get Involved',
      description: 'Ways to support our mission and help children in Kenya',
      url: `${SEO_CONFIG.domain}/get-involved`,
      potentialAction: [
        {
          '@type': 'DonateAction',
          target: `${SEO_CONFIG.domain}/donate`
        },
        {
          '@type': 'VolunteerAction',
          target: `${SEO_CONFIG.domain}/volunteer`
        }
      ]
    }
  },
  gallery: {
    title: 'Photo Gallery - Place of Grace Community Centre | Our Children & Activities',
    description: 'View photos and videos showcasing our children, activities, facilities, and community programs at Place of Grace Community Centre in Kenya.',
    keywords: 'photo gallery, children photos, community activities, Place of Grace photos, Kenya charity gallery, children\'s home photos',
    image: '/gallery-image.jpg',
    ogType: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'ImageGallery',
      name: 'Photo Gallery',
      description: 'Photos and videos showcasing our children and activities',
      url: `${SEO_CONFIG.domain}/gallery`
    }
  },
  news: {
    title: 'News & Updates - Place of Grace Community Centre | Latest News',
    description: 'Stay updated with the latest news, events, and updates from Place of Grace Community Centre. Read about our programs, achievements, and community initiatives.',
    keywords: 'news, updates, events, Place of Grace news, Kenya charity news, community centre updates',
    image: '/news-image.jpg',
    ogType: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'NewsMediaOrganization',
      name: 'Place of Grace Community Centre News',
      url: `${SEO_CONFIG.domain}/news`
    }
  },
  impact: {
    title: 'Our Impact - Place of Grace Community Centre | Making a Difference in Kenya',
    description: 'See the impact of Place of Grace Community Centre\'s work in Kenya. Learn about our achievements, success stories, and the difference we\'re making in children\'s lives.',
    keywords: 'impact, success stories, achievements, children\'s home impact, Kenya charity impact, community development results',
    image: '/impact-image.jpg',
    ogType: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Our Impact',
      description: 'Success stories and achievements of our programs',
      url: `${SEO_CONFIG.domain}/impact`
    }
  },
  transparency: {
    title: 'Transparency - Place of Grace Community Centre | Financial Reports & Accountability',
    description: 'Learn about Place of Grace Community Centre\'s transparency, financial reports, and accountability. See how your donations are used to help children in Kenya.',
    keywords: 'transparency, financial reports, accountability, Kenya charity transparency, donation usage, nonprofit accountability',
    image: '/transparency-image.jpg',
    ogType: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Transparency',
      description: 'Financial reports and accountability information',
      url: `${SEO_CONFIG.domain}/transparency`
    }
  },
  inclusion: {
    title: 'Inclusion & Diversity - Place of Grace Community Centre | Equal Opportunities',
    description: 'Place of Grace Community Centre promotes inclusion and diversity. Learn about our commitment to equal opportunities and supporting all children regardless of background.',
    keywords: 'inclusion, diversity, equal opportunities, children\'s rights, Kenya charity inclusion, community diversity',
    image: '/inclusion-image.jpg',
    ogType: 'article',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Inclusion & Diversity',
      description: 'Our commitment to inclusion and diversity',
      url: `${SEO_CONFIG.domain}/inclusion`
    }
  },
  faq: {
    title: 'FAQ - Place of Grace Community Centre | Frequently Asked Questions',
    description: 'Find answers to frequently asked questions about Place of Grace Community Centre, our programs, donations, volunteering, and how to get involved.',
    keywords: 'FAQ, frequently asked questions, Place of Grace FAQ, Kenya charity FAQ, children\'s home questions',
    image: '/faq-image.jpg',
    ogType: 'website',
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      name: 'Frequently Asked Questions',
      description: 'Answers to frequently asked questions about our organization',
      url: `${SEO_CONFIG.domain}/faq`
    }
  }
};

export default SEOHead;
