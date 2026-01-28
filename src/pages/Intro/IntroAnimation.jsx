import React, { useEffect, useState, useRef, useCallback } from "react";
import "./IntroAnimation.scss";

import { pathLengths, pathData, INTRO_TIMELINE, scheduleTimers } from "./introHelpers";

// logo met svg animatie
const IntroLogo = ({ phase }) => {
  return (
    <div className={`logo-container ${phase === "whirlpool" ? "spinning" : ""}`}>
      <svg viewBox="0 0 512 512">
        {Object.entries(pathLengths).map(([id, length]) => (
          <path
            key={id}
            id={id}
            className="svg-path animate"
            d={pathData[id]}
            style={{
              "--path-length": length,
              strokeDasharray: length,
            }}
          />
        ))}
      </svg>

      <h1 className={`title-text ${phase !== "drawing" ? "visible" : ""}`}>
        Shake It Up
      </h1>
    </div>
  );
};

// whirlpool effect
const IntroWhirlpool = ({ active }) => {
  return <div className={`whirlpool ${active ? "active" : ""}`} />;
};

const IntroAnimation = ({ onFinish }) => {
  const introRef = useRef(null);
  const [phase, setPhase] = useState("drawing");

  const startReveal = useCallback(() => {
    const intro = introRef.current;
    if (!intro) return;

    intro.classList.add(INTRO_TIMELINE.FADE_CLASS);

    window.setTimeout(() => {
      onFinish();
    }, INTRO_TIMELINE.FADE_DURATION_MS);
  }, [onFinish]);

  useEffect(() => {
    return scheduleTimers([
      { delay: INTRO_TIMELINE.PHASE_TEXT_AT, fn: () => setPhase("text") },
      { delay: INTRO_TIMELINE.PHASE_WHIRLPOOL_AT, fn: () => setPhase("whirlpool") },
      { delay: INTRO_TIMELINE.START_REVEAL_AT, fn: () => startReveal() },
    ]);
  }, [startReveal]);

  return (
    <div className="intro-container" ref={introRef}>
      <div className="intro-content">
        <IntroLogo phase={phase} />
        <IntroWhirlpool active={phase === "whirlpool"} />
      </div>
    </div>
  );
};

export default IntroAnimation;
