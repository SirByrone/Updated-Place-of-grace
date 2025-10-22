import React from 'react';

const SimpleMap = ({ 
  address = "DONHOLM PHASE FIVE POLICELINE ROAD, Nairobi, Kenya",
  height = "300px",
  width = "100%"
}) => {
  const encodedAddress = encodeURIComponent(address);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodedAddress}`;
  
  const handleDirectionsClick = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`;
    window.open(directionsUrl, '_blank');
  };

  return (
    <div style={{ position: 'relative' }}>
      <iframe
        title="Place of Grace Children's Home Location"
        src={mapUrl}
        width={width}
        height={height}
        style={{
          border: '1px solid #e1e5e9',
          borderRadius: '8px',
          borderStyle: 'none'
        }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
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

export default SimpleMap;
