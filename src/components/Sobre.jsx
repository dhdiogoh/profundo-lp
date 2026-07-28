import { useRef, useState } from 'react';
import { gsap, ScrollTrigger } from '../lib/gsapSetup.js';
import { useGsapContext } from '../hooks/useGsapScrollTrigger.js';
import { useRevealStagger } from '../hooks/useRevealStagger.js';
import { IMG } from '../lib/assets.js';
import { SOBRE_PHOTOS } from '../lib/sectionImages.js';
import Carousel from './Carousel.jsx';
import Lightbox from './Lightbox.jsx';

const FILTER_BASE = 'drop-shadow(0 14px 26px rgba(0,0,0,0.35)) brightness(1.55) saturate(0.85)';
const FILTER_GLOW_HI = 'drop-shadow(0 0 22px rgba(150,224,241,0.95)) brightness(1.85) saturate(0.9)';
const FILTER_GLOW_LO = 'drop-shadow(0 0 10px rgba(150,224,241,0.5)) brightness(1.65) saturate(0.88)';

export default function Sobre() {
  const sectionRef = useRef(null);
  const wrapRef = useRef(null);
  const blueRef = useRef(null);
  const whiteRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useRevealStagger(sectionRef);

  /* ---------- Estrela-do-mar: selo do título → centro → contorno pulsante → profundidade ---------- */
  useGsapContext(
    sectionRef,
    () => {
      const wrap = wrapRef.current;
      const blue = blueRef.current;
      const white = whiteRef.current;
      if (!wrap || !blue) return;

      // Triggers são passados como elementos reais (não selector text) porque
      // este efeito roda dentro de um gsap.context() escopado à própria seção:
      // '#sobre' resolvido nesse escopo só bate com DESCENDENTES da seção, nunca
      // com a seção em si, e '#manifesto' fica fora do escopo por completo.
      const manifestoEl = document.getElementById('manifesto');

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 55%',
        end: 'bottom top',
        onEnter: () => gsap.to(wrap, { opacity: 0.95, duration: 1, ease: 'power2.out' }),
        onLeaveBack: () => gsap.to(wrap, { opacity: 0, duration: 0.5 }),
      });

      const toCenterX = () => window.innerWidth * 0.5 - wrap.offsetLeft - wrap.offsetWidth * 0.5;
      const toCenterY = () => window.innerHeight * 0.5 - wrap.offsetTop - wrap.offsetHeight * 0.5;
      const toRestX = () => toCenterX() - window.innerWidth * 0.34;
      const toRestY = () => toCenterY() + window.innerHeight * 0.2;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'bottom 85%',
          endTrigger: manifestoEl,
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      tl.to(wrap, { x: toCenterX, y: toCenterY, rotation: 148, scale: 1.05, ease: 'power1.inOut', duration: 0.34 }, 0)
        .to(wrap, { scale: 2.1, rotation: 220, ease: 'sine.inOut', duration: 0.18 }, 0.34)
        .to(blue, { filter: FILTER_GLOW_HI, ease: 'sine.out', duration: 0.05 }, 0.36)
        .to(blue, { filter: FILTER_GLOW_LO, ease: 'sine.inOut', duration: 0.05 }, 0.41)
        .to(blue, { filter: FILTER_GLOW_HI, ease: 'sine.inOut', duration: 0.05 }, 0.46)
        .to(blue, { filter: FILTER_BASE, ease: 'sine.in', duration: 0.06 }, 0.51)
        .to(blue, { opacity: 0, ease: 'none', duration: 0.14 }, 0.55)
        .to(white, { opacity: 0.5, ease: 'none', duration: 0.14 }, 0.55)
        .to(wrap, { x: toRestX, y: toRestY, rotation: 250, scale: 0.95, ease: 'power1.inOut', duration: 0.3 }, 0.56)
        .to(white, { opacity: 0.16, ease: 'none', duration: 0.18 }, 0.7)
        .to(wrap, { opacity: 0, ease: 'power1.in', duration: 0.08 }, 0.94);
    },
    []
  );

  return (
    <section className="section" id="sobre" ref={sectionRef}>
      <div className="sobre-grid">
        <div>
          <span className="section-label">Manifesto</span>
          <h2>15 anos criando tendências.</h2>
          <p style={{ marginTop: 24 }}>
            Estamos há 15 anos criando tendências, trazendo inovação e surpreendendo nossos clientes na
            sua experiência com nossa alta gastronomia.
          </p>
          <p>
            Estamos diante de um novo conceito — mais exclusivo e aprimorado, assinado pelo Grupo SRB
            para paladares profundos e momentos memoráveis.
          </p>
        </div>
        <div className="sobre-media">
          <Carousel
            photos={SOBRE_PHOTOS}
            autoplay
            autoplayInterval={5000}
            onExpand={setLightboxIndex}
            ariaLabel="Fotos do ambiente e da experiência Profundo"
            sizes="(max-width: 900px) 92vw, 46vw"
          />
        </div>
      </div>

      <div className="starfish-wrap" id="starWrap" aria-hidden="true" ref={wrapRef}>
        <div className="starfish-inner" id="starInner">
          <img className="star-blue" id="starBlue" ref={blueRef} src={IMG.estrelaDoMar} alt="" />
          <img className="star-white" id="starWhite" ref={whiteRef} src={IMG.estrelaDoMar} alt="" />
        </div>
      </div>
      <img
        className="bg-vec bg-vec--white"
        src={IMG.baleia}
        alt=""
        style={{ width: 'clamp(200px, 22vw, 380px)', top: '6%', right: '3%', transform: 'rotate(-4deg)' }}
      />

      <Lightbox
        photos={SOBRE_PHOTOS}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
