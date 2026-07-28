import { useRef } from 'react';
import { useRevealStagger } from '../hooks/useRevealStagger.js';
import { useMenuModal } from '../context/MenuModalContext.jsx';
import { IMG } from '../lib/assets.js';

const CARDS = [
  {
    tag: 'Menu fechado · Almoço',
    title: 'Executivo SRB',
    meta: 'Terça a sexta · 12h às 16h',
    text: 'Entrada e prato principal — ou principal e sobremesa — num menu ágil pro meio do dia, do pastel de moqueca ao roast beef de filé.',
  },
  {
    tag: 'Menu fechado · Early dinner',
    title: 'Entre Marés',
    meta: 'Segunda a quinta · 18h às 21h',
    text: 'Entrada, principal e sobremesa em três tempos — uma curadoria pra explorar a casa antes do jantar cheio, do usuzukuri de salmão ao filhote na brasa.',
  },
  {
    tag: 'À la carte',
    title: 'Menu Profundo',
    meta: 'Todos os dias',
    text: 'O cardápio principal da casa — Raw Bar, Usuzukuris, Hot Appetizers e pratos de Água, Fogo e Brasa.',
  },
  {
    tag: 'Counter · À la carte',
    title: 'Sushi Bar',
    meta: 'Todos os dias',
    text: 'Sushis, sashimis e temakis no ritmo do balcão — dos clássicos aos assinados com queijo do Marajó, foie gras e tutano.',
  },
];

export default function Menus() {
  const sectionRef = useRef(null);
  const { openModal } = useMenuModal();

  useRevealStagger(sectionRef);

  return (
    <section
      className="section section--light"
      id="menus"
      style={{ paddingTop: 60, paddingBottom: 90 }}
      ref={sectionRef}
    >
      <img className="bg-vec" src={IMG.lagosta} alt="" style={{ width: 'clamp(180px, 18vw, 300px)', top: '4%', right: '3%', transform: 'rotate(-8deg)' }} />
      <img className="bg-vec" src={IMG.lula} alt="" style={{ width: 'clamp(150px, 16vw, 260px)', bottom: '3%', left: '2%', transform: 'rotate(12deg)' }} />
      <img className="bg-vec" src={IMG.siri} alt="" style={{ width: 'clamp(110px, 12vw, 190px)', top: '44%', left: '46%', transform: 'rotate(-6deg)' }} />

      <span className="section-label">Menus</span>
      <h2>Escolha sua profundidade.</h2>

      <div className="menus-grid">
        {CARDS.map((c) => (
          <article className="menu-card" key={c.title}>
            <span className="menu-tag">{c.tag}</span>
            <h3>{c.title}</h3>
            <div className="meta">{c.meta}</div>
            <p>{c.text}</p>
          </article>
        ))}
      </div>

      <div className="cta-row">
        <button className="btn on-light js-open-menu" onClick={openModal}>
          Ver cardápio completo <span className="arrow">→</span>
        </button>
      </div>
    </section>
  );
}
