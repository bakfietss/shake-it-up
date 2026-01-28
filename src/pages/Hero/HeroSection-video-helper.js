import { useState } from "react"

export function useHeroVideo(options = {}) {
  const [videoError, setVideoError] = useState(false)

  const videoProps = {
    className: "hero-video",
    src: options.src || "/assets/0000-0721.mp4",
    autoPlay: options.autoPlay !== false,
    loop: options.loop !== false,
    muted: options.muted !== false,
    playsInline: true,
    onError: () => setVideoError(true)
  }

  return { videoProps, videoError }
}
