import { useEffect, useRef, useState } from 'react';
import { useLenis } from '../context/LenisContext.jsx';
import { useReveal } from '../context/RevealContext.jsx';

export default function CustomScrollbar() {
  const { lenis, isMobile } = useLenis();
  const { isRevealed } = useReveal();
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (isMobile) return undefined;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return undefined;

    function currentProgress() {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      return max > 0 ? doc.scrollTop / max : 0;
    }

    function updateThumb(progress) {
      const trackH = track.clientHeight;
      const doc = document.documentElement;
      const ratio = doc.clientHeight / doc.scrollHeight;
      const thumbH = Math.max(40, trackH * ratio);
      thumb.style.height = thumbH + 'px';
      const maxTravel = trackH - thumbH;
      thumb.style.top = progress * maxTravel + 'px';
    }

    const onLenisScroll = (e) => updateThumb(e.progress);
    const onWindowScroll = () => updateThumb(currentProgress());
    const onResize = () => updateThumb(currentProgress());

    if (lenis) lenis.on('scroll', onLenisScroll);
    else window.addEventListener('scroll', onWindowScroll, { passive: true });
    window.addEventListener('resize', onResize);

    updateThumb(currentProgress());

    let dragging_ = false;
    function scrollToClientY(clientY) {
      const rect = track.getBoundingClientRect();
      const thumbH = thumb.offsetHeight;
      const maxTravel = rect.height - thumbH;
      let rel = maxTravel > 0 ? (clientY - rect.top - thumbH / 2) / maxTravel : 0;
      rel = Math.min(1, Math.max(0, rel));
      const doc = document.documentElement;
      const targetY = rel * (doc.scrollHeight - doc.clientHeight);
      if (lenis) lenis.scrollTo(targetY, { immediate: true });
      else window.scrollTo(0, targetY);
    }

    const onThumbDown = (e) => {
      dragging_ = true;
      setDragging(true);
      e.preventDefault();
    };
    const onTrackDown = (e) => {
      if (e.target === thumb) return;
      scrollToClientY(e.clientY);
    };
    const onMouseMove = (e) => {
      if (dragging_) scrollToClientY(e.clientY);
    };
    const onMouseUp = () => {
      if (!dragging_) return;
      dragging_ = false;
      setDragging(false);
    };

    thumb.addEventListener('mousedown', onThumbDown);
    track.addEventListener('mousedown', onTrackDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      if (lenis) lenis.off('scroll', onLenisScroll);
      else window.removeEventListener('scroll', onWindowScroll);
      window.removeEventListener('resize', onResize);
      thumb.removeEventListener('mousedown', onThumbDown);
      track.removeEventListener('mousedown', onTrackDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [lenis, isMobile]);

  useEffect(() => {
    if (!isRevealed || isMobile) return;
    setVisible(true);
  }, [isRevealed, isMobile]);

  return (
    <div
      className={`custom-scrollbar${visible ? ' visible' : ''}${dragging ? ' dragging' : ''}`}
      id="customScrollbar"
      aria-hidden="true"
    >
      <div className="custom-scrollbar-track" id="scrollTrack" ref={trackRef}>
        <div className="custom-scrollbar-thumb" id="scrollThumb" ref={thumbRef} />
      </div>
    </div>
  );
}
