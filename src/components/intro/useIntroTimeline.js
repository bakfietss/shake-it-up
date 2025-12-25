import { useEffect, useState } from "react";

// All timing values in one place for easy tweaking
const TIMELINE = {
  LOGO_DRAW_DURATION: 3000,
  TEXT_APPEAR_DELAY: 3500,
  WHIRLPOOL_START_DELAY: 5000,
  FADE_OUT_DELAY: 5400,
  FADE_OUT_DURATION: 800,
};

/**
 * Custom hook that manages the intro animation timeline
 * Returns the current phase and handles all timing logic
 */
export const useIntroTimeline = (onFinish) => {
  const [phase, setPhase] = useState("logo-drawing");

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("text-visible"), TIMELINE.TEXT_APPEAR_DELAY),
      setTimeout(() => setPhase("whirlpool"), TIMELINE.WHIRLPOOL_START_DELAY),
      setTimeout(() => setPhase("fade-out"), TIMELINE.FADE_OUT_DELAY),
      setTimeout(() => onFinish(), TIMELINE.FADE_OUT_DELAY + TIMELINE.FADE_OUT_DURATION),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onFinish]);

  return phase;
};
