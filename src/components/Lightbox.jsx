import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLenis } from '../context/LenisContext.jsx';

/*
 * Lightbox compartilhado por todas as seções com fotos (Sobre, Culinária,
 * Atmosfera, Localização). `index` é controlado pelo componente pai: `null`
 * fechado, um número aberto naquela foto de `photos`. Reaproveita o mesmo
 * lock()/unlock() (contador) do LenisContext usado pelo Preloader e pelo
 * MenuModal — abrir o Lightbox durante o preloader ou com o modal do
 * cardápio aberto não destrava o scroll de ninguém antes da hora.
 */
export default function Lightbox({ photos, index, onClose, onNavigate }) {
  const open = index !== null && index !== undefined;
  const { lock, unlock } = useLenis();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    lock();
    return () => unlock();
  }, [open, lock, unlock]);

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();
    return () => previouslyFocused?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    function onKeyDown(e) {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key === 'ArrowRight') onNavigate((index + 1) % photos.length);
      if (e.key === 'ArrowLeft') onNavigate((index - 1 + photos.length) % photos.length);
      if (e.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, index, photos, onClose, onNavigate]);

  if (!open) return null;

  const photo = photos[index];

  return createPortal(
    <div
      className="lightbox-overlay open"
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button type="button" className="lightbox-close" aria-label="Fechar" onClick={onClose} ref={closeButtonRef}>
        ✕
      </button>

      {photos.length > 1 && (
        <button
          type="button"
          className="lightbox-arrow lightbox-arrow--prev"
          aria-label="Foto anterior"
          onClick={() => onNavigate((index - 1 + photos.length) % photos.length)}
        >
          ←
        </button>
      )}

      <div className="lightbox-image-wrap">
        <picture>
          <source type="image/webp" srcSet={photo.fullWebp} />
          <img src={photo.full} alt={photo.alt} width={photo.width} height={photo.height} />
        </picture>
        {photo.caption && <span className="lightbox-caption">{photo.caption}</span>}
      </div>

      {photos.length > 1 && (
        <button
          type="button"
          className="lightbox-arrow lightbox-arrow--next"
          aria-label="Próxima foto"
          onClick={() => onNavigate((index + 1) % photos.length)}
        >
          →
        </button>
      )}
    </div>,
    document.body
  );
}
