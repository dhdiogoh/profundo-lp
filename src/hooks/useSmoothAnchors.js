import { useEffect } from 'react';
import { useLenis } from '../context/LenisContext.jsx';

/**
 * Global delegated click handler for every `a[href^="#"]` on the page
 * (nav, mobile menu, footer links, …) — mirrors the original's single
 * document-wide querySelectorAll pass, but works for elements that mount
 * after the initial render too.
 */
export function useSmoothAnchors() {
  const { lenis } = useLenis();

  useEffect(() => {
    function onClick(e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href');
      if (id.length <= 1) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: 0 });
      else target.scrollIntoView({ behavior: 'smooth' });
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis]);
}
