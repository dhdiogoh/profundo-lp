import { useEffect, useState } from 'react';
import { IMG } from '../lib/assets.js';

const LINKS = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#cozinha', label: 'Cozinha' },
  { href: '#menus', label: 'Menus' },
  { href: '#atmosfera', label: 'Ambiente' },
  { href: '#local', label: 'Reservar' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`} id="nav">
        <a href="#" className="nav-logo" aria-label="Profundo">
          <img src={IMG.logoWhite} alt="Profundo by Sushi Ruy Barbosa" />
        </a>
        <div className="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#cozinha">Cozinha</a>
          <a href="#menus">Menus</a>
          <a href="#atmosfera">Ambiente</a>
          <a href="#local" className="nav-cta">Reservar</a>
        </div>
        <button
          className="nav-burger"
          id="burger"
          aria-label="Menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} id="mobileMenu">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={closeMenu}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
