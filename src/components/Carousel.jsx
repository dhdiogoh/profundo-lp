import { useCallback, useEffect, useRef, useState } from 'react';

const SLIDE_GAP = 14;
const SWIPE_THRESHOLD = 40;

export function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/*
 * Carrossel compartilhado (Culinária + Sobre): setas, dots, autoplay opcional
 * com reset-na-interação, pausa em hover/fora da viewport, swipe e respeito a
 * prefers-reduced-motion. O reset do autoplay na interação sai de graça: o
 * efeito de autoplay usa `setTimeout` (não `setInterval`) e depende de
 * `index`, então QUALQUER navegação — automática ou manual — reagenda um
 * temporizador novo em vez de deixar o antigo correndo.
 */
export default function Carousel({
  photos,
  autoplay = false,
  autoplayInterval = 5000,
  showDots = true,
  showArrows = true,
  onExpand,
  ariaLabel = 'Carrossel de fotos',
  sizes = '(max-width: 640px) 80vw, 520px',
}) {
  const trackRef = useRef(null);
  const containerRef = useRef(null);
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const startXRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const applyTransform = useCallback((i) => {
    const track = trackRef.current;
    if (!track || !track.children[0]) return;
    const slideW = track.children[0].getBoundingClientRect().width + SLIDE_GAP;
    track.style.transform = `translateX(${-i * slideW}px)`;
  }, []);

  const goTo = useCallback(
    (i) => {
      const next = ((i % photos.length) + photos.length) % photos.length;
      indexRef.current = next;
      setIndex(next);
    },
    [photos.length]
  );

  useEffect(() => applyTransform(index), [index, applyTransform]);

  useEffect(() => {
    const onResize = () => applyTransform(indexRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [applyTransform]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;
    const observer = new IntersectionObserver(([entry]) => setIsInView(entry.isIntersecting), {
      threshold: 0.25,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!autoplay || prefersReducedMotion || !isInView || isHovering || photos.length <= 1) return undefined;
    const timer = setTimeout(() => goTo(indexRef.current + 1), autoplayInterval);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, prefersReducedMotion, isInView, isHovering, autoplayInterval, index, goTo, photos.length]);

  function onTouchStart(e) {
    startXRef.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (startXRef.current === null) return;
    const dx = e.changedTouches[0].clientX - startXRef.current;
    if (Math.abs(dx) > SWIPE_THRESHOLD) goTo(index + (dx < 0 ? 1 : -1));
    startXRef.current = null;
  }

  return (
    <div
      className="carousel"
      ref={containerRef}
      role="region"
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="carousel-viewport">
        <div className="carousel-track" ref={trackRef} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {photos.map((photo, i) => (
            <div className="carousel-slide" key={photo.id}>
              <picture>
                <source type="image/webp" srcSet={photo.webpSrcSet} sizes={sizes} />
                <img
                  src={photo.src}
                  srcSet={photo.jpgSrcSet}
                  sizes={sizes}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  loading="lazy"
                  style={photo.objectPosition ? { objectPosition: photo.objectPosition } : undefined}
                />
              </picture>
              {photo.caption && <span className="atm-caption">{photo.caption}</span>}
              {onExpand && (
                <button
                  type="button"
                  className="photo-expand"
                  aria-label={`Ampliar foto: ${photo.alt}`}
                  onClick={() => onExpand(i)}
                >
                  <ExpandIcon />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {(showArrows || showDots) && (
        <div className="carousel-nav">
          {showArrows && (
            <div className="carousel-arrows">
              <button className="c-arrow" aria-label="Anterior" onClick={() => goTo(index - 1)}>
                ←
              </button>
              <button className="c-arrow" aria-label="Próximo" onClick={() => goTo(index + 1)}>
                →
              </button>
            </div>
          )}
          {showDots && (
            <div className="carousel-dots">
              {photos.map((photo, i) => (
                <span
                  key={photo.id}
                  className={i === index ? 'active' : ''}
                  role="button"
                  tabIndex={0}
                  aria-label={`Ir para foto ${i + 1}`}
                  onClick={() => goTo(i)}
                  onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && goTo(i)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
