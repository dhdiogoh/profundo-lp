import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { gsap } from '../lib/gsapSetup.js';
import { useGsapContext } from '../hooks/useGsapScrollTrigger.js';
import { useReveal } from '../context/RevealContext.jsx';
import { getIsMobile } from '../hooks/useIsMobile.js';
import { IMG, HERO_VIDEO_SRC } from '../lib/assets.js';

export default function Hero() {
  const heroRef = useRef(null);
  const videoARef = useRef(null);
  const videoBRef = useRef(null);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const sloganRef = useRef(null);
  const cueRef = useRef(null);

  const { isRevealed, markVideoReady } = useReveal();
  const isMobile = getIsMobile();

  /* ---------- vídeo A: reporta prontidão pro preloader ---------- */
  useEffect(() => {
    const v = videoARef.current;
    if (!v) {
      markVideoReady();
      return;
    }
    if (v.readyState >= 4) {
      markVideoReady();
      return;
    }
    const done = () => markVideoReady();
    v.addEventListener('canplaythrough', done, { once: true });
    v.addEventListener('error', done, { once: true });
    v.play().catch(() => {});
    return () => {
      v.removeEventListener('canplaythrough', done);
      v.removeEventListener('error', done);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- loop seamless: crossfade entre 2 players do mesmo vídeo ---------- */
  useEffect(() => {
    const vA = videoARef.current;
    const vB = videoBRef.current;
    if (!vA || !vB) return undefined;
    const FADE = 1.2;
    let fading = false;
    let current = vA;

    vA.play().catch(() => {});

    function fade(el, to, done) {
      gsap.to(el, { opacity: to, duration: FADE, ease: 'none', onComplete: done });
    }

    function onTime() {
      const v = current;
      if (fading || !v.duration) return;
      if (v.duration - v.currentTime <= FADE) {
        fading = true;
        const other = v === vA ? vB : vA;
        other.currentTime = 0;
        other.play().catch(() => {});
        if (other === vB) {
          fade(vB, 1, () => {
            vA.pause();
            current = vB;
            fading = false;
          });
        } else {
          fade(vB, 0, () => {
            vB.pause();
            current = vA;
            fading = false;
          });
        }
      }
    }
    vA.addEventListener('timeupdate', onTime);
    vB.addEventListener('timeupdate', onTime);
    return () => {
      vA.removeEventListener('timeupdate', onTime);
      vB.removeEventListener('timeupdate', onTime);
    };
  }, []);

  /* ---------- pin da logo (coreografia no scroll) ---------- */
  useGsapContext(
    heroRef,
    () => {
      const logo = logoRef.current;
      const slogan = sloganRef.current;
      const cue = cueRef.current;

      gsap
        .timeline({
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom bottom', scrub: 0.8 },
        })
        .to(logo, { scale: 1.55, ease: 'none', duration: 0.45 }, 0)
        .to(logo, { opacity: 0, filter: 'blur(6px)', ease: 'power1.in', duration: 0.15 }, 0.3)
        .to(cue, { opacity: 0, duration: 0.08 }, 0.05)
        .set(slogan, { visibility: 'visible' }, 0.42)
        .fromTo(slogan, { opacity: 0, y: 46 }, { opacity: 1, y: 0, ease: 'power2.out', duration: 0.22 }, 0.46)
        .to(slogan, { y: -20, ease: 'none', duration: 0.32 }, 0.68);
    },
    []
  );

  /* ---------- partículas Three.js (leve, só desktop) ---------- */
  useEffect(() => {
    if (isMobile) return undefined;
    let disposed = false;
    let renderer, raf, resizeHandler;

    import('three').then((THREE) => {
      if (disposed) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x071726, 0.06);
        const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
        camera.position.z = 12;

        const COUNT = 140;
        const positions = new Float32Array(COUNT * 3);
        const speeds = new Float32Array(COUNT);
        for (let i = 0; i < COUNT; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 30;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 16;
          speeds[i] = 0.004 + Math.random() * 0.012;
        }
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const mat = new THREE.PointsMaterial({
          color: 0x96e0f1,
          size: 0.07,
          transparent: true,
          opacity: 0.6,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const points = new THREE.Points(geo, mat);
        scene.add(points);

        const resize = () => {
          const w = canvas.clientWidth,
            h = canvas.clientHeight;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        resizeHandler = resize;
        window.addEventListener('resize', resizeHandler);

        const clock = new THREE.Clock();
        const loop = () => {
          raf = requestAnimationFrame(loop);
          const t = clock.getElapsedTime();
          const pos = geo.attributes.position.array;
          for (let i = 0; i < COUNT; i++) {
            pos[i * 3 + 1] += speeds[i];
            pos[i * 3] += Math.sin(t * 0.4 + i) * 0.0015;
            if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10;
          }
          geo.attributes.position.needsUpdate = true;
          points.rotation.y = Math.sin(t * 0.05) * 0.05;
          renderer.render(scene, camera);
        };
        loop();
      } catch (e) {
        /* silencioso — mesmo espírito do try/catch original */
      }
    });

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      if (resizeHandler) window.removeEventListener('resize', resizeHandler);
      renderer?.dispose();
    };
  }, [isMobile]);

  /* ---------- Intro do hero (anime.js — dispara após a revelação do preloader) ---------- */
  useEffect(() => {
    if (!isRevealed) return;
    try {
      animate(logoRef.current, {
        opacity: [0, 1],
        translateY: [26, 0],
        filter: ['blur(10px)', 'blur(0px)'],
        duration: 1600,
        easing: 'cubicBezier(0.22, 1, 0.36, 1)',
      });
      animate(cueRef.current, {
        opacity: [0, 1],
        duration: 900,
        delay: 1200,
        easing: 'linear',
      });
    } catch (e) {
      if (logoRef.current) logoRef.current.style.opacity = '1';
      if (cueRef.current) cueRef.current.style.opacity = '1';
    }
  }, [isRevealed]);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-sticky">
        <video
          className="hero-video"
          id="heroVideo"
          ref={videoARef}
          autoPlay
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <video
          className="hero-video"
          id="heroVideoB"
          ref={videoBRef}
          muted
          playsInline
          preload="auto"
          crossOrigin="anonymous"
          style={{ opacity: 0, willChange: 'opacity' }}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="hero-veil" />
        <canvas id="hero-particles" ref={canvasRef} />

        <div className="hero-content" id="heroContent">
          <div className="hero-logo" id="heroLogo" ref={logoRef} style={{ opacity: 0 }}>
            <img src={IMG.logoWhite} alt="Profundo" />
          </div>
        </div>

        <div className="hero-slogan" id="heroSlogan" ref={sloganRef}>
          <h1>
            É hora de <span className="slogan-dive script">mergulhar.</span>
          </h1>
          <p>Uma marca assinada pelo Grupo SRB para paladares profundos e momentos memoráveis.</p>
        </div>

        <div className="scroll-cue" id="scrollCue" ref={cueRef}>
          <span>Desça</span>
          <div className="line" />
        </div>
      </div>
    </section>
  );
}
