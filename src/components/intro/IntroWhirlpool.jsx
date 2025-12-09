import React from "react";

const IntroWhirlpool = ({ active }) => {
  return <div className={`whirlpool ${active ? "active" : ""}`} />;
};

export default IntroWhirlpool;
