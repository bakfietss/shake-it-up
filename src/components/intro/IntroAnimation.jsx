import React from "react";
import "./IntroAnimation.css";
import { useIntroTimeline } from "./useIntroTimeline";
import IntroLogo from "./IntroLogo";
import IntroWhirlpool from "./IntroWhirlpool";

const IntroAnimation = ({ onFinish }) => {
  const phase = useIntroTimeline(onFinish);

  return (
    <div className={`intro-container intro-container--${phase}`}>
      <div className="intro-content">
        <IntroLogo phase={phase} />
        <IntroWhirlpool phase={phase} />
      </div>
    </div>
  );
};

export default IntroAnimation;
