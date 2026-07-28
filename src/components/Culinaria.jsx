import { useRef, useState } from 'react';
import { useRevealStagger } from '../hooks/useRevealStagger.js';
import { useMenuModal } from '../context/MenuModalContext.jsx';
import { IMG } from '../lib/assets.js';
import { CULINARIA_PHOTOS } from '../lib/sectionImages.js';
import Carousel from './Carousel.jsx';
import Lightbox from './Lightbox.jsx';

export default function Culinaria() {
  const sectionRef = useRef(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const { openModal } = useMenuModal();

  useRevealStagger(sectionRef);

  return (
    <section className="section section--light" id="cozinha" ref={sectionRef}>
      <img className="bg-vec" src={IMG.polvo} alt="" style={{ width: 'clamp(200px, 22vw, 340px)', top: '3%', right: '2%', transform: 'rotate(14deg)' }} />
      <img className="bg-vec" src={IMG.camarao} alt="" style={{ width: 'clamp(130px, 14vw, 220px)', bottom: '6%', left: '3%', transform: 'rotate(-10deg)' }} />
      <img className="bg-vec" src={IMG.ostra} alt="" style={{ width: 'clamp(110px, 12vw, 180px)', top: '38%', left: '40%', transform: 'rotate(6deg)' }} />
      <img className="bg-vec" src={IMG.estrelaDoMar} alt="" style={{ width: 'clamp(90px, 10vw, 150px)', top: '12%', left: '8%', transform: 'rotate(18deg)' }} />

      <span className="section-label">Assinatura Culinária</span>
      <h2>Japão. Amazônia. Brasa.</h2>
      <p className="lead" style={{ marginTop: 22 }}>
        A união da técnica japonesa precisa com a robustez do fogo e a alma paraense — tucupi, jambu,
        castanha-do-pará e queijo do Marajó encontram o sushi e a grelha.
      </p>

      <div className="culinaria-card">
        <img className="card-crab" src={IMG.siri} alt="" aria-hidden="true" />
        <div className="culinaria-copy">
          <h3>Acesse nosso cardápio</h3>
          <p>Explore criações autorais que unem a precisão japonesa, o fogo da brasa e ingredientes amazônicos.</p>
          <button className="btn js-open-menu" onClick={openModal}>
            Ver cardápio completo <span className="arrow">→</span>
          </button>
        </div>
        <Carousel photos={CULINARIA_PHOTOS} onExpand={setLightboxIndex} ariaLabel="Fotos do cardápio e coquetelaria do Profundo" />
      </div>

      <Lightbox
        photos={CULINARIA_PHOTOS}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}
