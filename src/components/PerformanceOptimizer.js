/**
 * Performance Optimization Component
 * Handles lazy loading, image optimization, and scroll performance
 */

import { useEffect, useCallback } from 'react';

const PerformanceOptimizer = () => {
  // Optimize scroll performance with throttling
  const throttledScrollHandler = useCallback(() => {
    let ticking = false;
    
    const updateScrollPosition = () => {
      // Handle scroll-based animations and effects
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Update scroll-to-top button visibility
      const scrollButton = document.querySelector('.scroll-to-top');
      if (scrollButton) {
        if (scrollY > windowHeight * 0.5) {
          scrollButton.classList.add('visible');
        } else {
          scrollButton.classList.remove('visible');
        }
      }
      
      // Trigger lazy loading for images in viewport
      const lazyImages = document.querySelectorAll('img[data-lazy]');
      lazyImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
          if (img.dataset.lazy) {
            img.src = img.dataset.lazy;
            img.removeAttribute('data-lazy');
          }
        }
      });
      
      ticking = false;
    };

    return () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };
  }, []);

  // Optimize image loading
  const optimizeImages = useCallback(() => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading attribute for better performance
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
      
      // Add decode hint for better rendering performance
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }
      
      // Optimize image format based on browser support
      if ('webp' in document.createElement('canvas').getContext('2d').__proto__) {
        // Browser supports WebP
        const src = img.src;
        if (src && !src.includes('.webp') && (src.includes('.jpg') || src.includes('.png'))) {
          // Could implement WebP conversion here if server supports it
        }
      }
    });
  }, []);

  // Preload critical resources
  const preloadCriticalResources = useCallback(() => {
    const criticalImages = [
      '/assets/logo.jpg',
      '/assets/photos/facilities/main-building-2024.jpg'
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  // Optimize CSS and reduce layout thrashing
  const optimizeCSS = useCallback(() => {
    // Add will-change property to frequently animated elements
    const animatedElements = document.querySelectorAll('.gallery-item, .nav-arrow, .lightbox-content');
    animatedElements.forEach(el => {
      el.style.willChange = 'transform';
    });

    // Use transform instead of changing top/left for better performance
    const modals = document.querySelectorAll('.lightbox, .modal');
    modals.forEach(modal => {
      modal.style.transform = 'translateZ(0)'; // Force GPU acceleration
    });
  }, []);

  // Memory management for event listeners
  const manageEventListeners = useCallback(() => {
    const scrollHandler = throttledScrollHandler();
    
    // Add optimized scroll listener
    window.addEventListener('scroll', scrollHandler, { passive: true });
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [throttledScrollHandler]);

  // Intersection Observer for better viewport detection
  const setupIntersectionObserver = useCallback(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
              }
            }
          });
        },
        {
          rootMargin: '50px 0px',
          threshold: 0.01
        }
      );

      // Observe all images with data-src
      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));

      return () => {
        imageObserver.disconnect();
      };
    }
  }, []);

  // Service Worker registration for caching
  const registerServiceWorker = useCallback(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            // Service Worker registered successfully
          })
          .catch(registrationError => {
            // Service Worker registration failed
          });
      });
    }
  }, []);

  // Web Vitals monitoring
  const monitorWebVitals = useCallback(() => {
    if (process.env.NODE_ENV === 'development') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Web Vitals monitoring enabled
        getCLS(() => {});
        getFID(() => {});
        getFCP(() => {});
        getLCP(() => {});
        getTTFB(() => {});
      });
    }
  }, []);

  // Initialize all optimizations
  useEffect(() => {
    let cleanupFunctions = [];

    // Run optimizations
    optimizeImages();
    preloadCriticalResources();
    optimizeCSS();
    
    // Setup observers and listeners
    cleanupFunctions.push(manageEventListeners());
    cleanupFunctions.push(setupIntersectionObserver());
    
    // Register service worker
    registerServiceWorker();
    
    // Monitor performance
    monitorWebVitals();

    // Cleanup on unmount
    return () => {
      cleanupFunctions.forEach(cleanup => {
        if (typeof cleanup === 'function') {
          cleanup();
        }
      });
    };
  }, [
    optimizeImages,
    preloadCriticalResources,
    optimizeCSS,
    manageEventListeners,
    setupIntersectionObserver,
    registerServiceWorker,
    monitorWebVitals
  ]);

  // This component doesn't render anything
  return null;
};

export default PerformanceOptimizer;
