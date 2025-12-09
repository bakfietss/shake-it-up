import React, { useEffect, useState, useRef } from "react";
import "./IntroAnimation.css";

import IntroLogo from "./IntroLogo";
import IntroWhirlpool from "./IntroWhirlpool";

const IntroAnimation = ({ onFinish }) => {
  const introRef = useRef(null);

  const [phase, setPhase] = useState("drawing");
  const [pathsReady, setPathsReady] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setPathsReady(true), 50);
    const t2 = setTimeout(() => setPhase("text"), 3500);
    const t3 = setTimeout(() => setPhase("whirlpool"), 5000);

    // start simpele fade-out richting hero
    const t4 = setTimeout(() => startReveal(), 5400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const startReveal = () => {
    const intro = introRef.current;
    if (!intro) return;

    // fade-out class toevoegen
    intro.classList.add("hidden");

    // na de fade de intro-component echt verwijderen
    setTimeout(() => {
      onFinish();
    }, 800); // match de 0.8s transition in CSS
  };

  return (
    <div className="intro-container" ref={introRef}>
      <div className="intro-content">
        <IntroLogo phase={phase} pathsReady={pathsReady} />
        <IntroWhirlpool active={phase === "whirlpool"} />
      </div>
    </div>
  );
};

export default IntroAnimation;
