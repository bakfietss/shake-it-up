import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IntroAnimation from "./pages/Intro/IntroAnimation";
import HeroSection from "./pages/Hero/HeroSection";
import SearchCocktail from "./pages/SearchCocktail/SearchCocktail";
import Random from "./pages/Random/Random";
import Favorites from "./pages/Favorites/Favorites";
import Contact from "./pages/Contact/Contact";
import DetailsCocktail from "./pages/DetailsCocktail/DetailsCocktail";
import Login_Register from "./pages/Login_Register/Login_Register";
import "./App.css";

// Hero page with intro animation
function HeroPage() {
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <>
      <HeroSection showContent={!introVisible} animate={!introVisible} />
      {introVisible && (
        <IntroAnimation onFinish={() => setIntroVisible(false)} />
      )}
    </>
  );
}

function App() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HeroPage />} />
          <Route path="/random" element={<Random onAuthClick={openAuthModal} />} />
          <Route path="/search" element={<SearchCocktail onAuthClick={openAuthModal} />} />
          <Route path="/favorites" element={<Favorites onAuthClick={openAuthModal} />} />
          <Route path="/contact" element={<Contact onAuthClick={openAuthModal} />} />
          <Route path="/cocktail/:id" element={<DetailsCocktail onAuthClick={openAuthModal} />} />
        </Routes>

        <Login_Register isOpen={authModalOpen} onClose={closeAuthModal} />
      </div>
    </Router>
  );
}

export default App;
