import React from "react";

const IntroWhirlpool = ({ phase }) => {
  const isActive = phase === "whirlpool" || phase === "fade-out";

  return <div className={`whirlpool ${isActive ? "whirlpool--active" : ""}`} />;
};

export default IntroWhirlpool;
