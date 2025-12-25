import { useCallback, useMemo, useState } from "react";

export function useHeroVideo({
  src = "/assets/0000-0721.mp4",
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
} = {}) {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = useCallback((e) => {
    console.error("Video failed to load:", e);
    setVideoError(true);
  }, []);

  const handleVideoLoaded = useCallback(() => {
    console.log("Video loaded successfully");
  }, []);

  // Build the props object once unless dependencies change
  const videoProps = useMemo(
    () => ({
      className: "hero-video",
      src,
      autoPlay,
      loop,
      muted,
      playsInline,
      onError: handleVideoError,
      onLoadedData: handleVideoLoaded,
    }),
    [src, autoPlay, loop, muted, playsInline, handleVideoError, handleVideoLoaded]
  );

  return { videoProps, videoError };
}
