import { useLayoutEffect, useRef } from "react"
import { gsap } from "gsap"

export function useHeroGsap(contentRef, { enabled = false } = {}) {
  const hasRunRef = useRef(false);

  useLayoutEffect(() => {
    if (!enabled) return;
    if (!contentRef?.current) return;
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    // portrait mode = bullets van rechts
    const isPortrait = window.innerWidth <= 768;
    const bulletDirection = isPortrait ? 60 : -60;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".h1-one", { x: -80, opacity: 0, duration: 1.0 }, "+=0.2")
        .from(".h1-two", { y: -80, opacity: 0, duration: 1.0 }, ">-0.2")
        .from(".h1-three", { x: 80, opacity: 0, duration: 1.0 }, ">-0.2")
        .from(".hero-content p", { x: 80, opacity: 0, duration: 1.0 }, "+=0.2")
        .from(".bullet-points h3", { x: bulletDirection, opacity: 0, duration: 2.3, stagger: 1.5 }, "+=0.2");
    }, contentRef);

    return () => ctx.revert();
  }, [enabled, contentRef]);
}
