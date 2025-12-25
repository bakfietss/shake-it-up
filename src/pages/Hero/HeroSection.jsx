import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HeroSection.css";
import { useHeroVideo } from "./HeroSection-video-helper.js";
import { useHeroGsap } from "./HeroSection-gsap-helper.js";
import Button from "../../components/Button/Button";

const HeroSection = ({ animate = false, showContent = true }) => {
  const navigate = useNavigate();
  const contentRef = useRef(null);

  // ✅ Put the console log here (top of component body is perfect)
  console.log("HeroSection -> animate:", animate, "showContent:", showContent);

  const { videoProps, videoError } = useHeroVideo({
    src: "/assets/0000-0721.mp4",
  });

  // ✅ Gate GSAP so it only runs when intro is finished
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

              <Button
                variant="transparent"
                className="cta-button"
                onClick={() => navigate("/search")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
