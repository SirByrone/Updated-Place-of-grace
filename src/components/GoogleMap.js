import React, { useEffect, useRef, useState, useCallback } from 'react';

const GoogleMap = ({ 
  address = "DONHOLM PHASE FIVE POLICELINE ROAD, Nairobi, Kenya",
  zoom = 15,
  height = "300px",
  width = "100%"
}) => {
  const mapRef = useRef(null);
  const [mapError, setMapError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const initializeMap = useCallback(() => {
    if (!mapRef.current) return;

    try {
      // Create a geocoder to convert address to coordinates
      const geocoder = new window.google.maps.Geocoder();
      
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const location = results[0].geometry.location;
          
          // Create map
          const map = new window.google.maps.Map(mapRef.current, {
            center: location,
            zoom: zoom,
            mapTypeId: window.google.maps.MapTypeId.ROADMAP,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            styles: [
              {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
              }
            ]
          });

          // Add marker
          const marker = new window.google.maps.Marker({
            position: location,
            map: map,
            title: 'Place of Grace Children\'s Home',
            animation: window.google.maps.Animation.DROP
          });

          // Add info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; max-width: 200px;">
                <h3 style="margin: 0 0 5px 0; color: #001f4c; font-size: 14px;">
                  Place of Grace Children's Home
                </h3>
                <p style="margin: 0; font-size: 12px; color: #666;">
                  ${address}
                </p>
              </div>
            `
          });

          // Show info window on marker click
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });

          // Show info window by default
          infoWindow.open(map, marker);

          setIsLoading(false);
        } else {
          console.error('Geocoding failed:', status);
          setMapError(true);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError(true);
      setIsLoading(false);
    }
  }, [address, zoom]);

  const loadGoogleMapsAPI = useCallback(() => {
    // Check if script is already loading
    if (window.googleMapsLoading) return;

    window.googleMapsLoading = true;

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.googleMapsLoading = false;
      initializeMap();
    };

    script.onerror = () => {
      window.googleMapsLoading = false;
      setMapError(true);
      setIsLoading(false);
      // Remove console.error for production security
    };

    document.head.appendChild(script);
  }, [initializeMap]);

  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      // Load Google Maps API
      loadGoogleMapsAPI();
    }
  }, [initializeMap, loadGoogleMapsAPI]);

  const handleDirectionsClick = () => {
    const encodedAddress = encodeURIComponent(address);
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(directionsUrl, '_blank');
  };

  if (isLoading) {
    return (
      <div 
        style={{ 
          height, 
          width, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          border: '2px dashed #dee2e6',
          borderRadius: '8px'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🗺️</div>
          <p style={{ margin: 0, color: '#666' }}>Loading map...</p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div 
        style={{ 
          height, 
          width, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: '#f8f9fa',
          border: '2px dashed #dee2e6',
          borderRadius: '8px',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🗺️</div>
          <p style={{ margin: '0 0 1rem 0', color: '#666' }}>
            Unable to load map
          </p>
          <button
            onClick={handleDirectionsClick}
            style={{
              backgroundColor: '#001f4c',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '600'
            }}
          >
            Get Directions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <div 
        ref={mapRef} 
        style={{ 
          height, 
          width, 
          borderRadius: '8px',
          border: '1px solid #e1e5e9'
        }} 
      />
      <button
        onClick={handleDirectionsClick}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: '#001f4c',
          color: 'white',
          border: 'none',
          padding: '0.5rem 0.75rem',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.75rem',
          fontWeight: '600',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 1000
        }}
        title="Get directions"
      >
        🚗 Directions
      </button>
    </div>
  );
};

export default GoogleMap;
