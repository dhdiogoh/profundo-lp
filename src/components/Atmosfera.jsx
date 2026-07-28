import { useRef, useState } from 'react';
import { gsap } from '../lib/gsapSetup.js';
import { useGsapContext } from '../hooks/useGsapScrollTrigger.js';
import { useRevealStagger } from '../hooks/useRevealStagger.js';
import { getIsMobile } from '../hooks/useIsMobile.js';
import { IMG } from '../lib/assets.js';
import { ATMOSFERA_PHOTOS, ATMOSFERA_DETAIL_PHOTOS } from '../lib/sectionImages.js';
import Carousel, { ExpandIcon } from './Carousel.jsx';
import Lightbox from './Lightbox.jsx';

const salaoPhoto = ATMOSFERA_PHOTOS[0];

export default function Atmosfera() {
  const sectionRef = useRef(null);
  const isMobile = getIsMobile();
  const [salaoLightbox, setSalaoLightbox] = useState(null);
  const [detailLightbox, setDetailLightbox] = useState(null);

  useRevealStagger(sectionRef);

  /* ---------- Parallax sutil (desktop) ---------- */
  useGsapContext(
    sectionRef,
    () => {
      if (isMobile) return;
      const imgs = sectionRef.current.querySelectorAll('.atm-item img');
      imgs.forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: { trigger: img.closest('.atm-item'), start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
    },
    []
  );

  return (
    <section className="section" id="atmosfera" ref={sectionRef}>
      <img
        className="bg-vec bg-vec--white"
        src={IMG.lula}
        alt=""
        style={{ width: 'clamp(160px, 17vw, 280px)', top: '5%', right: '4%', transform: 'rotate(-12deg)' }}
      />
      <span className="section-label">Atmosfera</span>
      <h2>Cada canto, pensado para o encantamento.</h2>
      <p className="lead" style={{ marginTop: 22 }}>
        Iluminação baixa e pontual, mobiliário de design assinado, texturas que remetem ao ambiente marinho.
      </p>

      <div className="atm-grid">
        <div className="atm-item">
          <picture>
            <source type="image/webp" srcSet={salaoPhoto.webpSrcSet} sizes="(max-width: 820px) 92vw, 52vw" />
            <img
              src={salaoPhoto.src}
              srcSet={salaoPhoto.jpgSrcSet}
              sizes="(max-width: 820px) 92vw, 52vw"
              alt={salaoPhoto.alt}
              width={salaoPhoto.width}
              height={salaoPhoto.height}
              loading="lazy"
            />
          </picture>
          <span className="atm-caption">{salaoPhoto.caption}</span>
          <button
            type="button"
            className="photo-expand"
            aria-label={`Ampliar foto: ${salaoPhoto.alt}`}
            onClick={() => setSalaoLightbox(0)}
          >
            <ExpandIcon />
          </button>
        </div>

        <div className="atm-item atm-item--carousel">
          <Carousel
            photos={ATMOSFERA_DETAIL_PHOTOS}
            onExpand={setDetailLightbox}
            ariaLabel="Detalhes do ambiente Profundo"
            sizes="(max-width: 820px) 92vw, 34vw"
          />
        </div>
      </div>

      <Lightbox
        photos={ATMOSFERA_PHOTOS}
        index={salaoLightbox}
        onClose={() => setSalaoLightbox(null)}
        onNavigate={setSalaoLightbox}
      />
      <Lightbox
        photos={ATMOSFERA_DETAIL_PHOTOS}
        index={detailLightbox}
        onClose={() => setDetailLightbox(null)}
        onNavigate={setDetailLightbox}
      />
    </section>
  );
}
