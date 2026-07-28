import { useRef, useState } from 'react';
import { useRevealStagger } from '../hooks/useRevealStagger.js';
import { IMG, RESERVATION_URL } from '../lib/assets.js';
import { LOCALIZACAO_PHOTOS } from '../lib/sectionImages.js';
import Lightbox from './Lightbox.jsx';
import { ExpandIcon } from './Carousel.jsx';

export default function Localizacao() {
  const sectionRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const photo = LOCALIZACAO_PHOTOS[0];
  useRevealStagger(sectionRef);

  return (
    <section className="section section--light" id="local" style={{ paddingTop: 100 }} ref={sectionRef}>
      <img className="bg-vec" src={IMG.cavaloMarinho} alt="" style={{ width: 'clamp(130px, 14vw, 220px)', top: '8%', right: '3%', transform: 'rotate(8deg)' }} />
      <img className="bg-vec" src={IMG.estrelaDoMar} alt="" style={{ width: 'clamp(100px, 11vw, 180px)', bottom: '6%', left: '44%', transform: 'rotate(-14deg)' }} />
      <img className="bg-vec" src={IMG.ostra} alt="" style={{ width: 'clamp(110px, 12vw, 190px)', top: '50%', left: '4%', transform: 'rotate(10deg)' }} />

      <div className="local-grid">
        <div>
          <span className="section-label">Localização &amp; Reserva</span>
          <h2>Como chegar até aqui.</h2>
          <div className="info-item">
            <div className="info-label">Endereço</div>
            <div className="info-value">Tv. Rui Barbosa, 1816 — Batista Campos, Belém-PA</div>
          </div>
          <div className="info-item">
            <div className="info-label">Estacionamento</div>
            <div className="info-value">Exclusivo e gratuito, com manobrista</div>
          </div>
          <div className="info-item">
            <div className="info-label">Reservas</div>
            <div className="info-value">WhatsApp (91) 98249-8434</div>
          </div>
          <a className="btn on-light" href={RESERVATION_URL} target="_blank" rel="noopener">
            Reservar <span className="arrow">→</span>
          </a>
        </div>
        <div className="local-media">
          <picture>
            <source type="image/webp" srcSet={photo.webpSrcSet} sizes="(max-width: 900px) 92vw, 46vw" />
            <img
              src={photo.src}
              srcSet={photo.jpgSrcSet}
              sizes="(max-width: 900px) 92vw, 46vw"
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              loading="lazy"
            />
          </picture>
          <button
            type="button"
            className="photo-expand"
            aria-label={`Ampliar foto: ${photo.alt}`}
            onClick={() => setLightboxIndex(0)}
          >
            <ExpandIcon />
          </button>
        </div>
      </div>

      <Lightbox
        photos={LOCALIZACAO_PHOTOS}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
