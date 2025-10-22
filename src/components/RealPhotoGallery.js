import React, { useState, useEffect, useCallback, useMemo } from 'react';
import UpdatesSection from './UpdatesSection';
import './RealPhotoGallery.css';

const RealPhotoGallery = () => {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadingStates, setLoadingStates] = useState({});
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);

  // Real photo collections based on actual folders
  const collections = useMemo(() => [
    {
      id: 'all',
      name: 'All Photos',
      icon: '📸',
      color: '#3b82f6',
      description: 'Complete photo collection'
    },
    {
      id: 'children',
      name: 'Our Children',
      icon: '👶',
      color: '#10b981',
      description: 'Daily life and activities of our children'
    },
    {
      id: 'events',
      name: 'Special Events',
      icon: '🎉',
      color: '#f59e0b',
      description: 'Celebrations, graduations, and special moments'
    },
    {
      id: 'facilities',
      name: 'Our Facilities',
      icon: '🏠',
      color: '#8b5cf6',
      description: 'Buildings, rooms, and infrastructure'
    },
    {
      id: 'team',
      name: 'Our Team',
      icon: '👥',
      color: '#ef4444',
      description: 'Staff, volunteers, and caregivers'
    },
    {
      id: 'updates',
      name: 'Latest Updates',
      icon: '🆕',
      color: '#06b6d4',
      description: 'Most recent photos and updates',
      priority: 0
    },
    {
      id: 'gallery',
      name: 'Gallery',
      icon: '🖼️',
      color: '#06b6d4',
      description: 'General gallery photos'
    }
  ], []);

  // Real photos from assets/photos folders
  const photos = useMemo(() => [
    // Children Category
    { 
      id: 1,
      src: "/assets/photos/children/children-art-2024.jpg", 
      thumbnail: "/assets/photos/children/children-art-2024.jpg",
      caption: "Children expressing creativity through art",
      category: "children",
      alt: "Children creating beautiful artwork with paint and creative materials"
    },
    { 
      id: 2,
      src: "/assets/photos/children/children-learning-2024.jpg", 
      thumbnail: "/assets/photos/children/children-learning-2024.jpg",
      caption: "Children engaged in learning activities",
      category: "children",
      alt: "Three children sitting at a table working on educational activities with books and pencils"
    },
    { 
      id: 3,
      src: "/assets/photos/children/children-mealtime-2024.jpg", 
      thumbnail: "/assets/photos/children/children-mealtime-2024.jpg",
      caption: "Nutritious meals for healthy development",
      category: "children",
      alt: "Children sitting together enjoying a healthy meal in the dining area"
    },
    { 
      id: 4,
      src: "/assets/photos/children/children-playing-2024.jpg", 
      thumbnail: "/assets/photos/children/children-playing-2024.jpg",
      caption: "Children enjoying recreational activities",
      category: "children",
      alt: "Children playing together in the playground with smiles on their faces"
    },
    
    // Events Category
    { 
      id: 5,
      src: "/assets/photos/events/graduation-2024.jpg", 
      thumbnail: "/assets/photos/events/graduation-2024.jpg",
      caption: "Graduation ceremonies and achievements",
      category: "events",
      alt: "Graduation ceremony with children in caps and gowns celebrating their academic success",
      date: "2024-12-20",
      isNew: true
    },
    { 
      id: 6,
      src: "/assets/photos/events/christmas-party-2024.jpg", 
      thumbnail: "/assets/photos/events/christmas-party-2024.jpg",
      caption: "Christmas celebration with children",
      category: "events",
      alt: "Children celebrating Christmas with decorations, gifts, and festive activities",
      date: "2024-12-18",
      isNew: true
    },
    { 
      id: 7,
      src: "/assets/photos/events/volunteer-day-2024.jpg", 
      thumbnail: "/assets/photos/events/volunteer-day-2024.jpg",
      caption: "Volunteer appreciation day",
      category: "events",
      alt: "Volunteers and children together during a special appreciation event",
      date: "2024-12-12",
      isNew: true
    },
    { 
      id: 8,
      src: "/assets/photos/events/christmas-celebration-new-2024.jpg", 
      thumbnail: "/assets/photos/events/christmas-celebration-new-2024.jpg",
      caption: "Children celebrating Christmas with joy and excitement",
      category: "events",
      alt: "Children in festive attire celebrating Christmas with decorations and holiday spirit",
      date: "2024-12-08",
      isNew: true
    },
    { 
      id: 9,
      src: "/assets/photos/events/community-outreach-2024.jpg", 
      thumbnail: "/assets/photos/events/community-outreach-2024.jpg",
      caption: "Community outreach and engagement",
      category: "events",
      alt: "Children and staff participating in community outreach activities and programs",
      date: "2024-11-30"
    },
    { 
      id: 10,
      src: "/assets/photos/events/children-playing-new-2024.jpg", 
      thumbnail: "/assets/photos/events/children-playing-new-2024.jpg",
      caption: "Children enjoying playtime and recreational activities",
      category: "events",
      alt: "Happy children engaged in various play activities and games together",
      date: "2024-11-25"
    },
    
    // Facilities Category
    { 
      id: 11,
      src: "/assets/photos/facilities/main-building-2024.jpg", 
      thumbnail: "/assets/photos/facilities/main-building-2024.jpg",
      caption: "Main building exterior",
      category: "facilities",
      alt: "Exterior view of the main building showing the architecture and grounds",
      date: "2024-12-01",
      isNew: true
    },
    { 
      id: 12,
      src: "/assets/photos/facilities/dormitory-interior-1-2024.jpg", 
      thumbnail: "/assets/photos/facilities/dormitory-interior-1-2024.jpg",
      caption: "Comfortable dormitory living spaces",
      category: "facilities",
      alt: "Clean and organized dormitory with comfortable sleeping arrangements",
      date: "2024-11-20"
    },
    { 
      id: 13,
      src: "/assets/photos/facilities/dormitory-interior-2-2024.jpg", 
      thumbnail: "/assets/photos/facilities/dormitory-interior-2-2024.jpg",
      caption: "Additional dormitory facilities",
      category: "facilities",
      alt: "Another view of the dormitory showing sleeping arrangements and storage",
      date: "2024-11-15"
    },
    { 
      id: 14,
      src: "/assets/photos/facilities/dormitory-interior-3-2024.jpg", 
      thumbnail: "/assets/photos/facilities/dormitory-interior-3-2024.jpg",
      caption: "Dormitory interior design",
      category: "facilities",
      alt: "Interior view of dormitory showing layout and organization",
      date: "2024-11-10"
    },
    { 
      id: 15,
      src: "/assets/photos/facilities/corridors-2024.jpg", 
      thumbnail: "/assets/photos/facilities/corridors-2024.jpg",
      caption: "Clean and safe corridors",
      category: "facilities",
      alt: "Well-maintained corridors providing safe passage throughout the facility",
      date: "2024-11-05"
    },
    { 
      id: 16,
      src: "/assets/photos/facilities/neat-bed-2024.jpg", 
      thumbnail: "/assets/photos/facilities/neat-bed-2024.jpg",
      caption: "Neat and organized sleeping areas",
      category: "facilities",
      alt: "Well-organized sleeping area with neat bed arrangements",
      date: "2024-10-30"
    },
    
    // Team Category
    { 
      id: 17,
      src: "/assets/photos/team/founder-with-child-2024.jpg", 
      thumbnail: "/assets/photos/team/founder-with-child-2024.jpg",
      caption: "Our founder with one of our children",
      category: "team",
      alt: "Founder of the children's home spending time with a child, showing care and connection",
      date: "2024-12-22",
      isNew: true
    },
    { 
      id: 18,
      src: "/assets/photos/team/johnston-kioko.jpg", 
      thumbnail: "/assets/photos/team/johnston-kioko.jpg",
      caption: "Johnston Kioko - BOARD CHAIR",
      category: "team",
      alt: "Johnston Kioko, Board Chair, providing leadership and guidance to the organization",
      date: "2024-12-01",
      isNew: true
    },
    { 
      id: 19,
      src: "/assets/photos/team/julius-ndukuthyo.jpg", 
      thumbnail: "/assets/photos/team/julius-ndukuthyo.jpg",
      caption: "Julius Ndukuthyo - MEDIA AND PUBLICITY",
      category: "team",
      alt: "Julius Ndukuthyo, Media and Publicity Manager, handling communications and outreach",
      date: "2024-11-28"
    },
    { 
      id: 20,
      src: "/assets/photos/team/kevin-mutai.jpg", 
      thumbnail: "/assets/photos/team/kevin-mutai.jpg",
      caption: "Kevin Mutai - SOCIAL WORKER",
      category: "team",
      alt: "Kevin Mutai, Social Worker, providing support and guidance to children and families",
      date: "2024-11-25"
    },
    { 
      id: 21,
      src: "/assets/photos/team/maria-kioko.jpg", 
      thumbnail: "/assets/photos/team/maria-kioko.jpg",
      caption: "Late Maria Kioko - FOUNDER",
      category: "team",
      alt: "Late Maria Kioko, Founder of Place of Grace Community Centre, whose vision and dedication established this safe haven for children",
      date: "2024-11-20"
    },
    { 
      id: 22,
      src: "/assets/photos/team/ruth-munanie.jpg", 
      thumbnail: "/assets/photos/team/ruth-munanie.jpg",
      caption: "Ruth Munanie - EXECUTIVE DIRECTOR",
      category: "team",
      alt: "Ruth Munanie, Executive Director, leading the organization with vision and dedication",
      date: "2024-11-15"
    },
    
    // Gallery Category
    { 
      id: 23,
      src: "/assets/photos/gallery/collection-1-2024.jpg", 
      thumbnail: "/assets/photos/gallery/collection-1-2024.jpg",
      caption: "Gallery collection photo 1",
      category: "gallery",
      alt: "Beautiful gallery collection showcasing our work",
      date: "2024-12-01",
      isNew: true
    },
    { 
      id: 24,
      src: "/assets/photos/gallery/collection-2-2024.jpg", 
      thumbnail: "/assets/photos/gallery/collection-2-2024.jpg",
      caption: "Gallery collection photo 2",
      category: "gallery",
      alt: "Another beautiful gallery collection photo",
      date: "2024-11-28",
      isNew: true
    },
    { 
      id: 25,
      src: "/assets/photos/gallery/collection-3-2024.jpg", 
      thumbnail: "/assets/photos/gallery/collection-3-2024.jpg",
      caption: "Gallery collection photo 3",
      category: "gallery",
      alt: "Gallery collection showcasing our impact",
      date: "2024-11-25"
    },
    { 
      id: 26,
      src: "/assets/photos/gallery/collection-4-2024.jpg", 
      thumbnail: "/assets/photos/gallery/collection-4-2024.jpg",
      caption: "Gallery collection photo 4",
      category: "gallery",
      alt: "Gallery collection highlighting our mission",
      date: "2024-11-20"
    },
    { 
      id: 27,
      src: "/assets/photos/gallery/collection-5-2024.jpg", 
      thumbnail: "/assets/photos/gallery/collection-5-2024.jpg",
      caption: "Gallery collection photo 5",
      category: "gallery",
      alt: "Gallery collection showing our community impact",
      date: "2024-11-15"
    },
    { 
      id: 28,
      src: "/assets/photos/gallery/collection-6-2024.jpg", 
      thumbnail: "/assets/photos/gallery/collection-6-2024.jpg",
      caption: "Gallery collection photo 6",
      category: "gallery",
      alt: "Gallery collection demonstrating our success"
    },
    
    // Updates Category - Priority 0 (Highest Priority)
    { 
      id: 29,
      src: "/assets/photos/Updates/IMG-20251021-WA0017.jpg", 
      thumbnail: "/assets/photos/Updates/IMG-20251021-WA0017.jpg",
      caption: "Latest children activities and moments",
      category: "updates",
      alt: "Recent photos of children engaged in various activities",
      priority: 0,
      isNew: true
    },
    { 
      id: 30,
      src: "/assets/photos/Updates/IMG-20251021-WA0018.jpg", 
      thumbnail: "/assets/photos/Updates/IMG-20251021-WA0018.jpg",
      caption: "Recent events and celebrations",
      category: "updates",
      alt: "Latest events and special moments captured",
      priority: 0,
      isNew: true
    },
    { 
      id: 31,
      src: "/assets/photos/Updates/IMG-20251021-WA0019.jpg", 
      thumbnail: "/assets/photos/Updates/IMG-20251021-WA0019.jpg",
      caption: "New facility improvements",
      category: "updates",
      alt: "Recent facility updates and improvements",
      priority: 0,
      isNew: true
    },
    { 
      id: 32,
      src: "/assets/photos/Updates/IMG-20250910-WA0002.jpg", 
      thumbnail: "/assets/photos/Updates/IMG-20250910-WA0002.jpg",
      caption: "Team activities and interactions",
      category: "updates",
      alt: "Recent team moments and activities",
      priority: 0,
      isNew: true
    },
    { 
      id: 33,
      src: "/assets/photos/Updates/IMG-20250910-WA0003.jpg", 
      thumbnail: "/assets/photos/Updates/IMG-20250910-WA0003.jpg",
      caption: "Gallery collection updates",
      category: "updates",
      alt: "New photos added to our gallery collection",
      priority: 0,
      isNew: true
    },
    { 
      id: 34,
      src: "/assets/photos/Updates/IMG-20250910-WA0004.jpg", 
      thumbnail: "/assets/photos/Updates/IMG-20250910-WA0004.jpg",
      caption: "Children learning and development",
      category: "updates",
      alt: "Children engaged in learning activities",
      priority: 0,
      isNew: true
    },
    { 
      id: 35,
      src: "/assets/photos/Updates/IMG-20250910-WA0005.jpg", 
      thumbnail: "/assets/photos/Updates/IMG-20250910-WA0005.jpg",
      caption: "Community outreach activities",
      category: "updates",
      alt: "Community engagement and outreach programs",
      priority: 0,
      isNew: true
    },
    { 
      id: 36,
      src: "/assets/photos/Updates/IMG-20250910-WA0006.jpg", 
      thumbnail: "/assets/photos/Updates/IMG-20250910-WA0006.jpg",
      caption: "Special moments and celebrations",
      category: "updates",
      alt: "Special events and celebrations",
      priority: 0,
      isNew: true
    }
  ], []);

  // Filter photos by collection with priority sorting
  const filteredPhotos = useMemo(() => {
    let filtered = photos;
    
    // Filter by collection
    if (selectedCollection !== 'all') {
      filtered = filtered.filter(photo => photo.category === selectedCollection);
    }
    
    // Sort by priority (Updates first, then by category)
    filtered.sort((a, b) => {
      // Updates photos get highest priority (priority: 0)
      if (a.category === 'updates' && b.category !== 'updates') return -1;
      if (b.category === 'updates' && a.category !== 'updates') return 1;
      
      // Then sort by priority if available
      if (a.priority !== undefined && b.priority !== undefined) {
        return a.priority - b.priority;
      }
      
      // Finally sort by ID for consistent ordering
      return a.id - b.id;
    });
    
    return filtered;
  }, [photos, selectedCollection]);

  // Image loading handler
  const handleImageLoad = useCallback((photoId) => {
    setLoadingStates(prev => ({
      ...prev,
      [photoId]: 'loaded'
    }));
  }, []);

  const handleImageError = useCallback((photoId) => {
    setLoadingStates(prev => ({
      ...prev,
      [photoId]: 'error'
    }));
  }, []);

  // Lightbox functions
  const openLightbox = useCallback((photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
    setSelectedPhoto(null);
    document.body.style.overflow = '';
  }, []);

  const nextPhoto = useCallback(() => {
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(filteredPhotos[nextIndex]);
  }, [currentIndex, filteredPhotos]);

  const prevPhoto = useCallback(() => {
    const prevIndex = currentIndex === 0 ? filteredPhotos.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(filteredPhotos[prevIndex]);
  }, [currentIndex, filteredPhotos]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isLightboxOpen) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          prevPhoto();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextPhoto();
          break;
        case ' ':
          e.preventDefault();
          nextPhoto();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, closeLightbox, prevPhoto, nextPhoto]);

  // Touch navigation for mobile
  const handleTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextPhoto();
    } else if (isRightSwipe) {
      prevPhoto();
    }
  }, [touchStart, touchEnd, nextPhoto, prevPhoto]);

  // Collection stats
  const collectionStats = useMemo(() => {
    const stats = {};
    collections.forEach(collection => {
      if (collection.id === 'all') {
        stats[collection.id] = photos.length;
      } else {
        stats[collection.id] = photos.filter(photo => photo.category === collection.id).length;
      }
    });
    return stats;
  }, [collections, photos]);

  return (
    <div className="real-photo-gallery">
      {/* Updates Section */}
      <UpdatesSection />
      
      {/* Collection Header */}
      <div className="gallery-header">
        <h1>Photo Gallery</h1>
        <p>Explore our collection of memories and moments</p>
      </div>

      {/* Collection Tabs */}
      <div className="collection-tabs">
        {collections.map(collection => (
          <button
            key={collection.id}
            className={`collection-tab ${selectedCollection === collection.id ? 'active' : ''}`}
            onClick={() => setSelectedCollection(collection.id)}
            style={{ '--tab-color': collection.color }}
          >
            <span className="tab-icon">{collection.icon}</span>
            <span className="tab-name">{collection.name}</span>
            <span className="tab-count">{collectionStats[collection.id]}</span>
            {collection.description && (
              <span className="tab-description">{collection.description}</span>
            )}
          </button>
        ))}
      </div>

      {/* Photo Grid */}
      <div className="photo-grid">
        {filteredPhotos.map((photo, index) => (
          <div 
            key={photo.id} 
            className={`photo-item ${photo.isNew ? 'new' : ''}`}
            onClick={() => openLightbox(photo, index)}
          >
            <div className="photo-container">
              <img
                src={photo.src}
                alt={photo.alt}
                className={`photo-image ${loadingStates[photo.id] || 'loading'}`}
                onLoad={() => handleImageLoad(photo.id)}
                onError={() => handleImageError(photo.id)}
              />
              
              {/* Loading Spinner */}
              {loadingStates[photo.id] === 'loading' && (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                </div>
              )}
              
              {/* Error State */}
              {loadingStates[photo.id] === 'error' && (
                <div className="error-state">
                  <span>⚠️</span>
                  <p>Failed to load</p>
                </div>
              )}
              
              {/* NEW Badge only for Updates photos */}
              {photo.category === 'updates' && photo.isNew && (
                <div className="new-badge">NEW</div>
              )}
              
              {/* Photo Info Overlay */}
              <div className="photo-overlay">
                <div className="photo-info">
                  <h3>{photo.caption}</h3>
                </div>
                <div className="photo-actions">
                  <span className="view-icon">👁️</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && selectedPhoto && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            {/* Lightbox Header */}
            <div className="lightbox-header">
              <div className="lightbox-info">
                <h3>{selectedPhoto.caption}</h3>
              </div>
              <button className="lightbox-close" onClick={closeLightbox}>
                ✕
              </button>
            </div>

            {/* Lightbox Image */}
            <div 
              className="lightbox-image-container"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="lightbox-image"
                onLoad={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
                style={{ opacity: imageLoading ? 0.5 : 1 }}
              />
              {imageLoading && (
                <div className="lightbox-loading">
                  <div className="loading-spinner">
                    <div className="spinner"></div>
                  </div>
                </div>
              )}
              
              {/* Navigation Arrows */}
              {filteredPhotos.length > 1 && (
                <>
                  <button 
                    className="lightbox-nav prev" 
                    onClick={prevPhoto}
                    aria-label="Previous photo"
                  >
                    ‹
                  </button>
                  <button 
                    className="lightbox-nav next" 
                    onClick={nextPhoto}
                    aria-label="Next photo"
                  >
                    ›
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Footer */}
            <div className="lightbox-footer">
              <div className="lightbox-counter">
                {currentIndex + 1} of {filteredPhotos.length}
              </div>
              <div className="lightbox-category">
                {collections.find(c => c.id === selectedPhoto.category)?.name}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Small Rotating Photo Alerts */}
      <div className="gallery-footer">
        <div className="footer-updates">
          <h3>Recent Activity</h3>
          <div className="activity-photos">
            {filteredPhotos.slice(0, 4).map((photo, index) => (
              <div 
                key={photo.id}
                className={`activity-photo ${index === 0 ? 'featured' : ''}`}
                onClick={() => openLightbox(photo, index)}
              >
                <img
                  src={photo.thumbnail}
                  alt={photo.caption}
                  className="activity-image"
                />
                <div className="activity-overlay">
                  <span className="activity-category">{photo.category}</span>
                  {photo.category === 'updates' && photo.isNew && <span className="activity-new">NEW</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealPhotoGallery;
