import React, { useState, useEffect } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
  setTimeout(() => setIsRevealed(true), 100);
    }, []);

  const handleVideoError = (e) => {
    console.error('Video failed to load:', e);
    setVideoError(true);
  };

  const handleVideoLoaded = () => {
    console.log('Video loaded successfully');
  };

  return (
    <div className="hero-container">
      <video
        className="hero-video"
        src="/assets/0000-0720.mp4"
        autoPlay
        loop
        muted
        playsInline
        onError={handleVideoError}
        onLoadedData={handleVideoLoaded}
      />
      {videoError && (
        <div style={{ color: 'white', padding: '20px', background: 'red' }}>
          Video failed to load from /assets/0000.0720.mp4
        </div>
      )}
      <div className="hero-content">
        <h1>Welcome to the Experience</h1>
      </div>
    </div>
  );
};

export default HeroSection;