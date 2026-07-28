import { useRef } from 'react';
import { gsap } from '../lib/gsapSetup.js';
import { useGsapContext } from '../hooks/useGsapScrollTrigger.js';
import { IMG, INSTAGRAM_URL, WHATSAPP_URL } from '../lib/assets.js';

export default function Footer() {
  const footerRef = useRef(null);
  const whaleRef = useRef(null);
  const fishBlueRef = useRef(null);
  const fishTopRef = useRef(null);
  const fishBottomRef = useRef(null);
  const jellyRef = useRef(null);

  /* ---------- Criaturas do footer — loops próprios ---------- */
  useGsapContext(
    footerRef,
    () => {
      const whale = whaleRef.current;
      const fishBlue = fishBlueRef.current;
      const fishTop = fishTopRef.current;
      const fishBottom = fishBottomRef.current;
      const jelly = jellyRef.current;

      if (whale) {
        gsap.fromTo(whale, { x: '110vw' }, { x: '-30vw', duration: 42, ease: 'none', repeat: -1 });
        gsap.to(whale, { y: 18, duration: 6, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }
      if (fishBlue) {
        gsap.fromTo(fishBlue, { x: '-20vw', scaleX: -1 }, { x: '110vw', duration: 26, ease: 'none', repeat: -1, delay: 2 });
        gsap.to(fishBlue, { y: -10, duration: 4.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }
      if (fishTop) {
        gsap.fromTo(fishTop, { x: '110vw' }, { x: '-20vw', duration: 30, ease: 'none', repeat: -1, delay: 6 });
        gsap.to(fishTop, { y: -8, duration: 4, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }
      if (fishBottom) {
        gsap.fromTo(fishBottom, { x: '110vw', scaleY: -1 }, { x: '-20vw', duration: 34, ease: 'none', repeat: -1, delay: 11 });
        gsap.to(fishBottom, { y: 8, duration: 4.2, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }
      if (jelly) {
        gsap.set(jelly, { left: '68%' });
        gsap.to(jelly, { y: 26, duration: 7, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to(jelly, { rotate: 6, duration: 5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      }
    },
    []
  );

  return (
    <footer id="footer" ref={footerRef}>
      <div className="footer-creatures" aria-hidden="true">
        <img className="creature whale" id="crWhale" ref={whaleRef} src={IMG.baleia} alt="" />
        <img className="creature fish-blue" id="crFishBlue" ref={fishBlueRef} src={IMG.peixe} alt="" />
        <img className="creature fish-white top" id="crFishTop" ref={fishTopRef} src={IMG.peixe} alt="" />
        <img className="creature fish-white bottom" id="crFishBottom" ref={fishBottomRef} src={IMG.peixe} alt="" />
        <img className="creature jelly" id="crJelly" ref={jellyRef} src={IMG.aguaViva} alt="" />
      </div>

      <div className="footer-grid">
        <div className="footer-brand">
          <img src={IMG.logoWhite} alt="Profundo by Sushi Ruy Barbosa" />
          <p>Uma experiência SRB além — para paladares profundos e momentos memoráveis.</p>
        </div>
        <div>
          <div className="foot-title">Navegação</div>
          <div className="foot-links">
            <a href="#sobre">Sobre</a>
            <a href="#cozinha">Cozinha</a>
            <a href="#menus">Menus</a>
            <a href="#atmosfera">Ambiente</a>
            <a href="#local">Reservar</a>
          </div>
        </div>
        <div>
          <div className="foot-title">Conecte-se</div>
          <div className="foot-links">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener">Instagram</a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
      </div>

      <div className="footer-wordmark">PROFUNDO</div>

      <div className="footer-bottom">
        <span>© 2026 Profundo · Grupo SRB. Todos os direitos reservados.</span>
        <span>Site por <a href="https://bermaxculture.com.br" target="_blank" rel="noopener">Bermax</a></span>
      </div>
    </footer>
  );
}
