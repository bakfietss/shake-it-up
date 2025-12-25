import React from "react";
import { pathLengths, pathData } from "./svgPaths";

const IntroLogo = ({ phase }) => {
  const isSpinning = phase === "whirlpool" || phase === "fade-out";
  const showText = phase !== "logo-drawing";

  return (
    <div className={`logo-container ${isSpinning ? "logo-container--spinning" : ""}`}>
      <svg viewBox="0 0 512 512">
        {Object.entries(pathLengths).map(([id, length]) => (
          <path
            key={id}
            id={id}
            className="svg-path svg-path--animate"
            d={pathData[id]}
            style={{
              "--path-length": length,
              strokeDasharray: length,
              strokeDashoffset: length,
            }}
          />
        ))}
      </svg>

      <h1 className={`title-text ${showText ? "title-text--visible" : ""}`}>
        Shake It Up
      </h1>
    </div>
  );
};

export default IntroLogo;
