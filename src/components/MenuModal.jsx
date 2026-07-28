import { useEffect, useRef, useState } from 'react';
import { useLenis } from '../context/LenisContext.jsx';
import { useMenuModal } from '../context/MenuModalContext.jsx';
import { IMG, MENU_URL } from '../lib/assets.js';

export default function MenuModal() {
  const { open, closeModal } = useMenuModal();
  const { lock, unlock } = useLenis();
  const frameRef = useRef(null);
  const loadedRef = useRef(false);
  const wasOpenRef = useRef(false);
  const [loadingHidden, setLoadingHidden] = useState(false);

  /* ---------- lazy load do iframe no primeiro open ---------- */
  useEffect(() => {
    if (!open || loadedRef.current) return undefined;
    loadedRef.current = true;
    const frame = frameRef.current;
    frame.src = MENU_URL;
    const onLoad = () => setLoadingHidden(true);
    frame.addEventListener('load', onLoad, { once: true });
    const safety = setTimeout(() => setLoadingHidden(true), 8000);
    return () => {
      frame.removeEventListener('load', onLoad);
      clearTimeout(safety);
    };
  }, [open]);

  /* ---------- trava/destrava o Lenis só nas transições reais de `open` ----------
     Nunca no mount: `open` nasce false, e um efeito de "fechado" rodando ali
     chamaria unlock() sem ter travado nada antes — roubando o lock que o
     Preloader ainda estava segurando durante o loading. `wasOpenRef` faz o
     lock()/unlock() disparar só na borda de subida/descida, mesmo que o
     efeito rode de novo por causa da identidade de lock/unlock mudando. */
  useEffect(() => {
    const wasOpen = wasOpenRef.current;
    wasOpenRef.current = open;
    if (open && !wasOpen) {
      lock();
    } else if (!open && wasOpen) {
      unlock();
    }
  }, [open, lock, unlock]);

  /* ---------- ESC fecha ---------- */
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeModal]);

  return (
    <div
      className={`modal-overlay${open ? ' open' : ''}`}
      id="menuModal"
      role="dialog"
      aria-modal="true"
      aria-label="Cardápio do Profundo"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="modal-box">
        <div className="modal-top">
          <span>livemenu.app · Profundo</span>
          <button className="modal-close" id="modalClose" aria-label="Fechar" onClick={closeModal}>
            ✕
          </button>
        </div>
        <div className={`modal-loading${loadingHidden ? ' hidden' : ''}`} id="modalLoading">
          <img className="modal-jelly" src={IMG.cavaloMarinho} alt="" />
          <div className="pre-bar" />
          <span className="pre-label">Mergulhando</span>
        </div>
        <iframe id="menuFrame" title="Cardápio Profundo" ref={frameRef} />
        <div className="modal-foot">
          <a href={MENU_URL} target="_blank" rel="noopener">
            ↗ Abrir em nova aba
          </a>
        </div>
      </div>
    </div>
  );
}
