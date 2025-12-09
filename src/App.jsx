import React, { useState } from 'react';
import IntroAnimation from './components/intro/IntroAnimation';
import HeroSection from './components/HeroSection';
import './App.css';

function App() {
  const [introVisible, setIntroVisible] = useState(true);

  const handleIntroFinished = () => {
    // Intro wordt pas verwijderd NA de clip-path exit animatie
    setIntroVisible(false);
  };

  return (
  <div className="App">
  <HeroSection />

  {introVisible && (
    <IntroAnimation onFinish={() => setIntroVisible(false)} />
  )}
</div>

  );
}

export default App;
