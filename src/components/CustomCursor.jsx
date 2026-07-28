import { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsapSetup.js';
import { getIsMobile } from '../hooks/useIsMobile.js';

const HOVER_SELECTOR = 'a, button, .carousel-slide, .custom-scrollbar-thumb, .custom-scrollbar-track';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const isMobile = getIsMobile();

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || isMobile) return undefined;

    let mx = -100,
      my = -100;
    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
    };
    document.addEventListener('mousemove', onMove);
    const tick = () => gsap.set(cursor, { x: mx, y: my });
    gsap.ticker.add(tick);

    const grow = () => gsap.to(cursor, { width: 54, height: 54, duration: 0.3 });
    const shrink = () => gsap.to(cursor, { width: 34, height: 34, duration: 0.3 });
    const els = document.querySelectorAll(HOVER_SELECTOR);
    els.forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
      els.forEach((el) => {
        el.removeEventListener('mouseenter', grow);
        el.removeEventListener('mouseleave', shrink);
      });
    };
  }, [isMobile]);

  return <div id="cursor" ref={cursorRef} />;
}
