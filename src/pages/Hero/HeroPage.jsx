import React, { useState } from "react";
import HeroSection from "./HeroSection";
import IntroAnimation from "../Intro/IntroAnimation";

// Hero pagina met intro animatie
function HeroPage() {
  const [introVisible, setIntroVisible] = useState(true);

  return (
    <>
      <HeroSection
        showContent={!introVisible}
        animate={!introVisible}
      />
      {introVisible && (
        <IntroAnimation onFinish={() => setIntroVisible(false)} />
      )}
    </>
  );
}

export default HeroPage;
