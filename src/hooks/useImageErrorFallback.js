import { useEffect } from 'react';

/**
 * Vetores decorativos ausentes somem em silêncio; imagens de conteúdo
 * ganham um gradiente de fallback. Porta 1:1 do listener global original.
 */
export function useImageErrorFallback() {
  useEffect(() => {
    function onError(e) {
      const img = e.target;
      if (img.tagName !== 'IMG') return;
      if (
        img.classList.contains('bg-vec') ||
        img.classList.contains('creature') ||
        img.closest('.starfish-wrap') ||
        img.id === 'waveTentacle' ||
        img.classList.contains('card-crab') ||
        img.classList.contains('pre-jelly')
      ) {
        img.style.display = 'none';
      } else {
        img.style.background = 'linear-gradient(135deg, var(--blue-7), var(--blue-2))';
      }
    }
    document.addEventListener('error', onError, true);
    return () => document.removeEventListener('error', onError, true);
  }, []);
}
