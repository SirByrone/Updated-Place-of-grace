import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './UpdatesSection.css';

const UpdatesSection = () => {
  const [currentUpdate, setCurrentUpdate] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Real updates with photos from Updates folder - memoized for performance
  const updates = useMemo(() => [
    {
      id: 1,
      title: "Recent Children Activities",
      description: "New photos from our children's daily activities",
      photo: "/assets/photos/Updates/IMG-20251021-WA0017.jpg",
      type: "children",
      color: "#10b981"
    },
    {
      id: 2,
      title: "Latest Events",
      description: "Recent events and celebrations captured",
      photo: "/assets/photos/Updates/IMG-20251021-WA0018.jpg",
      type: "events",
      color: "#f59e0b"
    },
    {
      id: 3,
      title: "Facility Updates",
      description: "New photos of our improved facilities",
      photo: "/assets/photos/Updates/IMG-20251021-WA0019.jpg",
      type: "facilities",
      color: "#8b5cf6"
    },
    {
      id: 4,
      title: "Team Moments",
      description: "Recent team activities and interactions",
      photo: "/assets/photos/Updates/IMG-20250910-WA0002.jpg",
      type: "team",
      color: "#ef4444"
    },
    {
      id: 5,
      title: "Gallery Updates",
      description: "New photos added to our collection",
      photo: "/assets/photos/Updates/IMG-20250910-WA0003.jpg",
      type: "gallery",
      color: "#06b6d4"
    }
  ], []);

  // Optimized auto-rotate updates every 4 seconds
  const rotateUpdate = useCallback(() => {
    setCurrentUpdate((prev) => (prev + 1) % updates.length);
  }, [updates.length]);

  useEffect(() => {
    const interval = setInterval(rotateUpdate, 4000);
    return () => clearInterval(interval);
  }, [rotateUpdate]);

  // Optimized blinking effect for visibility
  const toggleVisibility = useCallback(() => {
    setIsVisible(prev => !prev);
  }, []);

  useEffect(() => {
    const blinkInterval = setInterval(toggleVisibility, 1000);
    return () => clearInterval(blinkInterval);
  }, [toggleVisibility]);

  // Preload images for better performance
  useEffect(() => {
    updates.forEach(update => {
      const img = new Image();
      img.src = update.photo;
    });
  }, [updates]);

  const currentUpdateData = updates[currentUpdate];

  return (
    <div className="updates-section">
      <div className="updates-container">
        <div className="updates-header">
          <h2 className="updates-title">
            <span className="updates-icon">📢</span>
            Latest Updates
          </h2>
          <div className="updates-indicator">
            {updates.map((_, index) => (
              <div
                key={index}
                className={`indicator-dot ${index === currentUpdate ? 'active' : ''}`}
                style={{ '--dot-color': updates[index].color }}
              />
            ))}
          </div>
        </div>

        <div className="updates-content">
          <div className="update-card" style={{ '--update-color': currentUpdateData.color }}>
            <div className="update-photo">
              <img
                src={currentUpdateData.photo}
                alt={currentUpdateData.title}
                className="update-image"
                loading="lazy"
                onLoad={() => console.log('Update image loaded:', currentUpdateData.photo)}
                onError={(e) => {
                  console.error('Update image failed to load:', currentUpdateData.photo);
                  e.target.src = '/assets/placeholder.jpg';
                  e.target.alt = 'Image not available';
                }}
              />
              <div className="update-overlay">
                <div className="update-badge">
                  <span className="badge-icon">✨</span>
                  <span className="badge-text">NEW</span>
                </div>
              </div>
            </div>
            
            <div className="update-info">
              <h3 className="update-title">{currentUpdateData.title}</h3>
              <p className="update-description">{currentUpdateData.description}</p>
              <div className="update-meta">
                <span className="update-date">{new Date(currentUpdateData.date).toLocaleDateString()}</span>
                <span className="update-type" style={{ color: currentUpdateData.color }}>
                  {currentUpdateData.type.toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Blinking notification */}
          <div className={`blinking-notification ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="notification-content">
              <span className="notification-icon">🔔</span>
              <span className="notification-text">New Update Available!</span>
            </div>
          </div>
        </div>

        {/* Small rotating photo alerts */}
        <div className="photo-alerts">
          <div className="alert-title">Recent Photos</div>
          <div className="alert-photos">
            {updates.slice(0, 4).map((update, index) => (
              <div
                key={update.id}
                className={`alert-photo ${index === currentUpdate ? 'active' : ''}`}
                style={{ '--alert-color': update.color }}
              >
                <img
                  src={update.photo}
                  alt={update.title}
                  className="alert-image"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = '/assets/placeholder.jpg';
                    e.target.alt = 'Image not available';
                  }}
                />
                <div className="alert-overlay">
                  <span className="alert-text">{update.type}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatesSection;
