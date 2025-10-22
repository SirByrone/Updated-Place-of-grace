/**
 * SEO Component for Dynamic Meta Tags
 * Optimizes each page for search engines with specific meta data
 */

import React, { useEffect } from 'react';

const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  structuredData,
  canonical,
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  section
}) => {
  // Default values
  const defaultTitle = "Place of Grace Children's Home Kenya | Support Vulnerable Children";
  const defaultDescription = "Help vulnerable children in Nairobi, Kenya through our education, healthcare & rehabilitation programs. Donate, volunteer, or sponsor a child today. Contact: +254 722 860 321";
  const defaultImage = "https://www.placeofgracecommunitycentre.org/assets/logo.jpg";
  const defaultUrl = "https://www.placeofgracecommunitycentre.org";
  const siteName = "Place of Grace Children's Home";

  // Construct full title
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaImage = image || defaultImage;
  const metaUrl = url || defaultUrl;
  const canonicalUrl = canonical || metaUrl;

  // Keywords array to string
  const metaKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {metaKeywords && <meta name="keywords" content={metaKeywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      )}
      
      {/* Author and Publication Info */}
      {author && <meta name="author" content={author} />}
      {publishedTime && <meta name="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta name="article:modified_time" content={modifiedTime} />}
      {section && <meta name="article:section" content={section} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:alt" content={`${title ? title : 'Place of Grace Children\'s Home'} - Supporting vulnerable children in Kenya`} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:locale" content="en_KE" />
      <meta property="og:locale:alternate" content="sw_KE" />
      
      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@PlaceOfGraceKE" />
      <meta name="twitter:creator" content="@PlaceOfGraceKE" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      <meta name="twitter:image:alt" content={`${title ? title : 'Place of Grace Children\'s Home'} - Supporting vulnerable children in Kenya`} />
      
      {/* Article specific meta for news/blog posts */}
      {type === 'article' && (
        <>
          <meta property="article:author" content={author || 'Place of Grace Children\'s Home'} />
          <meta property="article:publisher" content="Place of Grace Children's Home" />
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          <meta property="article:tag" content="children's home" />
          <meta property="article:tag" content="Kenya" />
          <meta property="article:tag" content="nonprofit" />
        </>
      )}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

// Pre-defined SEO configurations for different pages
export const seoConfigs = {
  home: {
    title: "Support Vulnerable Children in Kenya",
    description: "Place of Grace Children's Home provides education, healthcare, and psychosocial support to vulnerable children in Nairobi, Kenya. Donate, volunteer, or sponsor a child today.",
    keywords: ["children's home Kenya", "vulnerable children support", "donate to children Kenya", "child sponsorship Kenya", "orphanage Nairobi", "help children Kenya"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Home - Place of Grace Children's Home",
      "description": "Support vulnerable children in Kenya through comprehensive care programs",
      "url": "https://www.placeofgracecommunitycentre.org/"
    }
  },
  
  about: {
    title: "About Us - Our Mission & Story",
    description: "Learn about Place of Grace Children's Home mission to provide love, care, and hope to vulnerable children in Nairobi, Kenya since 2009. Discover our story and impact.",
    keywords: ["about Place of Grace", "children's home mission", "nonprofit Kenya story", "vulnerable children care", "child protection Kenya"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Place of Grace Children's Home",
      "description": "Learn about our mission to support vulnerable children in Kenya"
    }
  },
  
  programs: {
    title: "Our Programs - Education, Healthcare & Support",
    description: "Discover our comprehensive programs: education support, healthcare services, psychosocial support, and skills development for vulnerable children in Kenya.",
    keywords: ["children education Kenya", "child healthcare Kenya", "psychosocial support", "skills development children", "education programs Kenya"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Children's Care Programs",
      "description": "Comprehensive care programs for vulnerable children",
      "provider": {
        "@type": "NGO",
        "name": "Place of Grace Children's Home"
      }
    }
  },
  
  getInvolved: {
    title: "Donate, Volunteer & Sponsor a Child",
    description: "Get involved with Place of Grace Children's Home. Donate to support our programs, volunteer your time, or sponsor a child's education and care. Every contribution makes a difference.",
    keywords: ["donate to children Kenya", "volunteer children's home", "child sponsorship Kenya", "help children Kenya", "nonprofit volunteer Kenya"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "DonateAction",
      "name": "Support Vulnerable Children",
      "description": "Donate to help vulnerable children in Kenya"
    }
  },
  
  gallery: {
    title: "Photo & Video Gallery",
    description: "View photos and videos of daily life at Place of Grace Children's Home. See our facilities, children's activities, events, and the positive impact of our programs.",
    keywords: ["children's home photos", "Kenya orphanage gallery", "children activities photos", "nonprofit gallery", "Place of Grace photos"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ImageGallery",
      "name": "Place of Grace Children's Home Gallery",
      "description": "Photos and videos showcasing our children and programs"
    }
  },
  
  contact: {
    title: "Contact Us - Get in Touch",
    description: "Contact Place of Grace Children's Home in Nairobi, Kenya. Phone: +254 722 860 321, Email: placeofgraceoutreach@gmail.com. Visit us at Donholm Phase Five Policeline Road.",
    keywords: ["contact children's home", "Place of Grace contact", "Nairobi children's home contact", "Kenya orphanage contact"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contact Place of Grace Children's Home",
      "description": "Get in touch with us to learn more or get involved"
    }
  },
  
  news: {
    title: "News & Updates",
    description: "Stay updated with the latest news, events, and stories from Place of Grace Children's Home. Read about our impact, upcoming events, and success stories.",
    keywords: ["children's home news", "Kenya nonprofit news", "children success stories", "orphanage updates", "Place of Grace news"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Place of Grace Children's Home News",
      "description": "Latest news and updates from our children's home"
    }
  },
  
  impact: {
    title: "Our Impact & Success Stories",
    description: "Discover the positive impact Place of Grace Children's Home has made in the lives of vulnerable children. Read success stories and see our transparency reports.",
    keywords: ["children's home impact", "success stories Kenya", "nonprofit transparency", "child transformation stories", "Kenya children's home results"],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Impact and Success Stories",
      "description": "See the positive impact we've made in children's lives"
    }
  }
};

export default SEO;

