import { useEffect, useRef } from 'react';
import { animate } from 'animejs';
import { IMG } from '../lib/assets.js';

export default function WaveDivider() {
  const svgRef = useRef(null);
  const tentRef = useRef(null);

  useEffect(() => {
    const anims = [];
    try {
      anims.push(
        animate(svgRef.current, {
          translateX: ['0%', '-50%'],
          duration: 9000,
          easing: 'linear',
          loop: true,
        })
      );
      if (tentRef.current) {
        anims.push(
          animate(tentRef.current, {
            rotate: [-4, 5],
            translateY: [0, -6],
            duration: 4200,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine',
          })
        );
      }
    } catch (e) {
      /* silencioso — mesmo espírito do try/catch original */
    }
    return () => anims.forEach((a) => a?.pause?.());
  }, []);

  return (
    <div className="wave-divider" aria-hidden="true">
      <img className="wave-tentacle" id="waveTentacle" ref={tentRef} src={IMG.caldaPolvo} alt="" />
      <svg id="waveSvg" ref={svgRef} viewBox="0 0 2400 130" preserveAspectRatio="none">
        <path
          id="wavePath"
          fill="#F4F7F9"
          d="M0,70 C150,110 300,30 450,70 C600,110 750,30 900,70 C1050,110 1200,30 1350,70 C1500,110 1650,30 1800,70 C1950,110 2100,30 2250,70 C2325,90 2400,70 2400,70 L2400,130 L0,130 Z"
        />
      </svg>
    </div>
  );
}
