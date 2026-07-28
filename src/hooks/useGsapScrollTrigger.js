import { useEffect } from 'react';
import { gsap } from '../lib/gsapSetup.js';

/**
 * Standardized gsap.context() setup/cleanup: everything created inside `effect`
 * (tweens, timelines, ScrollTriggers) is scoped to `scopeRef` and reverted on
 * unmount, so remounts (StrictMode, HMR) never duplicate triggers.
 *
 * gsap.context() runs `effect` synchronously as part of its own construction,
 * so `effect` must not depend on the context instance it's still inside of.
 */
export function useGsapContext(scopeRef, effect, deps = []) {
  useEffect(() => {
    if (!scopeRef.current) return undefined;
    const ctx = gsap.context(effect, scopeRef);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
