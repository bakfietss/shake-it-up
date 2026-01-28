import React, { useRef } from "react";
import Button from "../../components/Button/Button";
import "./HeroSection.scss";
import { useHeroVideo } from "./HeroSection-video-helper.js";
import { useHeroGsap } from "./HeroSection-gsap-helper.js";

// Wake-up call voor NOVI Dynamic API (slaapt na 30 min inactiviteit)
// Pingt de root URL - haalt geen data op, maakt alleen de server wakker
const wakeUpNoviBackend = () => {
  fetch('https://novi-backend-api-wgsgz.ondigitalocean.app/', {
    method: 'HEAD',
    headers: {
      'novi-education-project-id': '667e832d-8201-4580-afa3-87aecee36a78'
    }
  }).catch(() => {
    // Negeer errors - het gaat alleen om de server wakker maken
  });
};

const HeroSection = ({ animate = false, showContent = true, onGetStarted }) => {
  const contentRef = useRef(null);

  const { videoProps, videoError } = useHeroVideo({
    src: "/assets/0000-0721.mp4",
  });

  // GSAP alleen als intro klaar is
  useHeroGsap(contentRef, { enabled: animate });

  return (
    <section className="hero-container">
      <video {...videoProps} />

      {videoError && (
        <div style={{ color: "white", padding: "20px", background: "red" }}>
          Video failed to load from {videoProps.src}
        </div>
      )}

      {showContent && (
        <div className="hero-grid" ref={contentRef}>
          <div className="hero-left" aria-hidden="true" />
          <div className="hero-right">
            <div className="hero-content">
              <div className="title-row">
                <h1 className="h1-one">Shake</h1>
                <h1 className="h1-two">It</h1>
                <h1 className="h1-three">Up</h1>
              </div>
              <p>Your Cocktail Buddy</p>
            </div>

            <div className="hero-actions">
              <div className="bullet-points">
                <h3>Browse 600+ Cocktail Ideas</h3>
                <h3>No Waste! - Match Recipes to Your Ingredients</h3>
                <h3>No More Forgotten Recipes - Save What Works</h3>
                <h3>No Inspiration? - Randomize your Cocktail</h3>
              </div>
            </div>

            <div className="hero-cta-wrapper">
              <Button
                btnType="glass"
                animation="glow"
                size="large"
                onClick={() => {
                  wakeUpNoviBackend();
                  if (onGetStarted) onGetStarted();
                }}
              >
                Get started!
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
