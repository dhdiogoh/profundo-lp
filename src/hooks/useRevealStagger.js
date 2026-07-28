import { gsap } from '../lib/gsapSetup.js';
import { useGsapContext } from './useGsapScrollTrigger.js';

const REVEAL_SELECTOR =
  '.section-label, h2, .lead, p, .menu-card, .culinaria-card, .atm-item, .info-item, .btn, .local-media, .sobre-media';

/**
 * Port of the original's global `gsap.utils.toArray('.section').forEach(...)`,
 * scoped per-section via ref instead of a document-wide class query.
 */
export function useRevealStagger(sectionRef) {
  useGsapContext(sectionRef, () => {
    const items = sectionRef.current.querySelectorAll(REVEAL_SELECTOR);
    if (!items.length) return;
    gsap.from(items, {
      opacity: 0,
      y: 44,
      duration: 0.9,
      stagger: 0.09,
      ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
    });
  }, []);
}
