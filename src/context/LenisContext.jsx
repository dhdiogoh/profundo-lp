import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsapSetup.js';
import Lenis from 'lenis';
import { getIsMobile } from '../hooks/useIsMobile.js';

const LenisContext = createContext({ lenis: null, isMobile: false, lock: () => {}, unlock: () => {} });

export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);
  const isMobile = getIsMobile();
  const rafCb = useRef(null);
  /* Contador em vez de booleano: Preloader e MenuModal podem travar o scroll
     ao mesmo tempo (ex.: usuário abre o cardápio durante o loading) sem que
     o unlock de um destrave o que o outro ainda precisa manter travado. */
  const lockCountRef = useRef(0);

  useEffect(() => {
    let instance = null;
    try {
      instance = new Lenis({
        duration: 1.25,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        /* No touch, "smoothWheel" sozinho não faz nada — syncTouch é o que dá
           a mesma inércia suave do desktop ao arrastar com o dedo. */
        syncTouch: isMobile,
        syncTouchLerp: 0.075,
        touchInertiaExponent: 1.7,
      });
      /* honra locks pedidos antes da instância existir (ex.: Preloader trava
         no useLayoutEffect, que roda antes deste efeito de criação) */
      if (lockCountRef.current > 0) instance.stop();
      instance.on('scroll', ScrollTrigger.update);
      rafCb.current = (time) => instance.raf(time * 1000);
      gsap.ticker.add(rafCb.current);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    } catch (e) {
      /* mirrors original try/catch — Lenis unavailable, app still works */
    }

    return () => {
      if (rafCb.current) gsap.ticker.remove(rafCb.current);
      instance?.destroy();
      setLenis(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* lock()/unlock() cuidam do Lenis E do overflow do html/body juntos — quem
     trava scroll (Preloader, MenuModal, Lightbox) não mexe em CSS na mão
     nunca mais, então não tem como um destravar o que o outro ainda segura. */
  const lock = useCallback(() => {
    lockCountRef.current += 1;
    if (lockCountRef.current === 1) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    }
    lenis?.stop();
  }, [lenis]);

  const unlock = useCallback(() => {
    lockCountRef.current = Math.max(0, lockCountRef.current - 1);
    if (lockCountRef.current === 0) {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      lenis?.start();
    }
  }, [lenis]);

  return (
    <LenisContext.Provider value={{ lenis, isMobile, lock, unlock }}>
      {children}
    </LenisContext.Provider>
  );
}

export function useLenis() {
  return useContext(LenisContext);
}
