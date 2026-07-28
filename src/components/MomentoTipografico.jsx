import { useRef } from 'react';
import { animate } from 'animejs';
import { gsap } from '../lib/gsapSetup.js';
import { useGsapContext } from '../hooks/useGsapScrollTrigger.js';
import { getIsMobile } from '../hooks/useIsMobile.js';
import { IMG } from '../lib/assets.js';

export default function MomentoTipografico() {
  const sectionRef = useRef(null);
  const bubblesRef = useRef(null);
  const isMobile = getIsMobile();

  /* ---------- palavras no scrub ---------- */
  useGsapContext(
    sectionRef,
    () => {
      const words = sectionRef.current.querySelectorAll('.manifesto-line .w');
      if (!words.length) return;

      // Elemento real, não selector text: dentro do gsap.context() escopado a
      // esta própria seção, '#manifesto' só bateria com descendentes, nunca
      // com a seção em si.
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
      });
      tl.fromTo('.manifesto-line', { scale: 0.9 }, { scale: 1, ease: 'power2.out', duration: 0.34 }, 0.36);
      words.forEach((w, i) => {
        tl.fromTo(
          w,
          { opacity: 0, y: 16, scale: 0.94 },
          { opacity: 1, y: 0, scale: 1, duration: 0.16, ease: 'power2.out' },
          0.38 + i * 0.06
        );
      });
      tl.to('.manifesto-line .agua', { color: 'var(--blue-6)', textShadow: '0 0 40px rgba(150,224,241,0.35)', duration: 0.1 }, 0.6)
        .to('.manifesto-line .fogo', { color: 'var(--ember)', textShadow: '0 0 40px rgba(217,142,74,0.3)', duration: 0.1 }, 0.76)
        .to({}, { duration: 0.14 });
    },
    []
  );

  /* ---------- bolhas ambiente subindo (anime.js) ---------- */
  useGsapContext(
    sectionRef,
    () => {
      const bubbleBox = bubblesRef.current;
      if (!bubbleBox) return;
      const COUNT = isMobile ? 7 : 14;
      for (let i = 0; i < COUNT; i++) {
        const b = document.createElement('span');
        b.className = 'bubble';
        const size = 3 + Math.random() * 5;
        b.style.width = size + 'px';
        b.style.height = size + 'px';
        b.style.left = 4 + Math.random() * 92 + '%';
        bubbleBox.appendChild(b);
        const rise = 260 + Math.random() * 340;
        const dur = 4200 + Math.random() * 3400;
        animate(b, {
          translateY: [0, -rise],
          translateX: [0, Math.random() * 44 - 22],
          opacity: [{ to: 0.5, duration: dur * 0.12 }, { to: 0, duration: dur * 0.88 }],
          duration: dur,
          delay: Math.random() * 6000,
          loop: true,
          easing: 'linear',
        });
      }
    },
    []
  );

  return (
    <section id="manifesto" ref={sectionRef}>
      <div className="manifesto-sticky">
        <div className="manifesto-glow g1" />
        <div className="manifesto-glow g2" />
        <div className="ambient-bubbles" id="manifestoBubbles" aria-hidden="true" ref={bubblesRef} />
        <img
          className="bg-vec bg-vec--white"
          id="manifestoJelly"
          src={IMG.aguaViva}
          alt=""
          style={{ width: 'clamp(140px, 15vw, 240px)', top: '10%', left: '6%', transform: 'rotate(-8deg)' }}
        />
        <img
          className="bg-vec bg-vec--white"
          id="manifestoFish"
          src={IMG.peixe}
          alt=""
          style={{ width: 'clamp(150px, 16vw, 260px)', bottom: '12%', right: '6%', transform: 'rotate(6deg) scaleX(-1)' }}
        />
        <img
          className="bg-vec bg-vec--white"
          id="manifestoSeahorse"
          src={IMG.cavaloMarinho}
          alt=""
          style={{ width: 'clamp(90px, 9vw, 150px)', top: '16%', right: '14%', transform: 'rotate(10deg)' }}
        />
        <div className="manifesto-line" id="manifestoLine">
          <span className="mline">
            <span className="w">Nasce</span> <span className="w">entre</span>
          </span>
          <span className="mline">
            <span className="w agua script">água</span> <span className="w">e</span>{' '}
            <span className="w fogo script">fogo.</span>
          </span>
        </div>
      </div>
    </section>
  );
}
