import { useEffect } from 'react';
import { animate } from 'animejs';
import { getIsMobile } from './useIsMobile.js';

/**
 * Bolhas de hover nos CTAs (.btn) — porta 1:1 do IIFE original.
 * Elementos .btn são todos estáticos no primeiro render, então uma
 * varredura única após o mount replica fielmente o querySelectorAll original.
 */
export function useButtonBubbles() {
  useEffect(() => {
    if (getIsMobile()) return undefined;

    function onEnter(e) {
      const btn = e.currentTarget;
      for (let i = 0; i < 5; i++) {
        const b = document.createElement('span');
        b.className = 'bubble';
        b.style.left = 12 + Math.random() * 76 + '%';
        btn.appendChild(b);
        try {
          animate(b, {
            translateY: [0, -(34 + Math.random() * 26)],
            opacity: [{ to: 0.7, duration: 120 }, { to: 0, duration: 480 }],
            scale: [0.6, 1.15],
            duration: 620 + Math.random() * 300,
            delay: i * 55,
            easing: 'cubicBezier(0.22, 1, 0.36, 1)',
            onComplete: () => b.remove(),
          });
        } catch (err) {
          b.remove();
        }
      }
    }

    const btns = document.querySelectorAll('.btn');
    btns.forEach((btn) => btn.addEventListener('mouseenter', onEnter));
    return () => btns.forEach((btn) => btn.removeEventListener('mouseenter', onEnter));
  }, []);
}
