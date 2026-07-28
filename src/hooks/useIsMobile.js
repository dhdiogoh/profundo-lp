/**
 * Computed once, like the original inline script — not reactive to resize,
 * since it gates one-time setup decisions (Lenis, ScrollTrigger, cursor, etc.).
 */
let cached = null;
export function getIsMobile() {
  if (cached === null) {
    cached =
      (typeof window !== 'undefined' &&
        window.matchMedia('(max-width: 900px)').matches) ||
      (typeof window !== 'undefined' && 'ontouchstart' in window);
  }
  return cached;
}
