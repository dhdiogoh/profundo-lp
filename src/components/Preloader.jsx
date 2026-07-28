import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsapSetup.js';
import { useLenis } from '../context/LenisContext.jsx';
import { useReveal } from '../context/RevealContext.jsx';
import { IMG } from '../lib/assets.js';

const MIN_TIME = 2000; /* palco mínimo, mesmo com tudo em cache */
const MAX_WAIT = 6000; /* conexão ruim: revela mesmo assim */

const BLOCKED_SCROLL_KEYS = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Home', 'End', ' '];

export default function Preloader() {
  const rootRef = useRef(null);
  const [done, setDone] = useState(false);
  const { lenis, lock, unlock } = useLenis();
  const { isRevealed, reveal, videoReady } = useReveal();

  const videoReadyResolveRef = useRef(null);
  const videoReadyPromiseRef = useRef(
    new Promise((r) => {
      videoReadyResolveRef.current = r;
    })
  );
  const unblockInputRef = useRef(null);
  const lockedRef = useRef(false);
  const unlockedRef = useRef(false);

  /* Trava o scroll antes do primeiro paint. `lock()` (LenisContext) para o
     Lenis E aplica overflow:hidden no html/body num só lugar — nenhum
     componente mexe em CSS de scroll na mão, então não tem como um destravar
     o que o outro ainda segura. `lockedRef` existe pra o StrictMode (dev) não
     contar o lock duas vezes no double-invoke do efeito. */
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    if (!lockedRef.current) {
      lockedRef.current = true;
      lock();
    }

    const preventDefault = (e) => e.preventDefault();
    const preventScrollKey = (e) => {
      if (BLOCKED_SCROLL_KEYS.includes(e.key)) e.preventDefault();
    };
    window.addEventListener('wheel', preventDefault, { passive: false });
    window.addEventListener('touchmove', preventDefault, { passive: false });
    window.addEventListener('keydown', preventScrollKey, { passive: false });
    unblockInputRef.current = () => {
      window.removeEventListener('wheel', preventDefault);
      window.removeEventListener('touchmove', preventDefault);
      window.removeEventListener('keydown', preventScrollKey);
    };

    return () => unblockInputRef.current?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Libera tudo só quando `isRevealed` vira true de fato — nunca a partir de
     dentro de `finish()`, pra não fechar sobre um `lenis`/`unlock` obsoletos
     (a instância do Lenis nasce depois, assincronamente, num provider
     vizinho). `unlockedRef` garante uma única execução real mesmo que o
     efeito rode de novo por causa da identidade de `lenis`/`unlock` mudando. */
  useEffect(() => {
    if (!isRevealed || unlockedRef.current) return;
    unlockedRef.current = true;

    lenis?.resize();
    lenis?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);

    unblockInputRef.current?.();

    unlock();
    ScrollTrigger.refresh();
  }, [isRevealed, lenis, unlock]);

  useEffect(() => {
    if (videoReady) videoReadyResolveRef.current?.();
  }, [videoReady]);

  useEffect(() => {
    const minDelay = new Promise((r) => setTimeout(r, MIN_TIME));
    const fontsReady =
      document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    const maxWait = new Promise((r) => setTimeout(r, MAX_WAIT));

    Promise.all([
      minDelay,
      Promise.race([Promise.all([videoReadyPromiseRef.current, fontsReady]), maxWait]),
    ]).then(finish);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function finish() {
    const onComplete = () => {
      setDone(true);
      reveal();
    };

    const pre = rootRef.current;
    if (!pre) {
      onComplete();
      return;
    }

    gsap
      .timeline({ onComplete })
      .to(pre.querySelector('.pre-jelly'), { y: -46, opacity: 0, duration: 0.55, ease: 'power2.in' }, 0)
      .to(pre.querySelectorAll('.pre-bar, .pre-label'), { opacity: 0, duration: 0.35 }, 0)
      .to(pre, { yPercent: -112, duration: 1.35, ease: 'power4.inOut' }, 0.25);
  }

  return (
    <div className={`preloader${done ? ' done' : ''}`} id="preloader" aria-hidden="true" ref={rootRef}>
      <img className="pre-jelly" src={IMG.aguaViva} alt="" />
      <div className="pre-bar" />
      <span className="pre-label">Mergulhando</span>
      <svg className="pre-wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,0 L1440,0 L1440,30 C1240,95 1040,10 840,55 C640,100 440,20 240,65 C140,88 60,60 0,75 Z" />
      </svg>
    </div>
  );
}
