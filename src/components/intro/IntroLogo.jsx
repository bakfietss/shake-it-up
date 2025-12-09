import React from "react";
import { pathLengths, pathData } from "./svgPaths";

const IntroLogo = ({ phase, pathsReady }) => {
  return (
    <div className={`logo-container ${phase === "whirlpool" ? "spinning" : ""}`}>
      <svg viewBox="0 0 512 512">
        {Object.entries(pathLengths).map(([id, length]) => (
          <path
            key={id}
            id={id}
            className={`svg-path ${pathsReady ? "animate" : ""}`}
            d={pathData[id]}
            style={{
              "--path-length": length,
              strokeDasharray: length,
              strokeDashoffset: pathsReady ? undefined : length,
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

export default IntroLogo;
