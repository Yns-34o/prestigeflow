import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const VIDEO = 'https://d1q70pf5vjeyhc.cloudfront.net/predictions/fbfb0f2116304a07a06d51224bf3a091/1.mp4';

export default function ScrollExpandHero({ onComplete }) {
  const [prog, setProg] = useState(0);
  const [done, setDone] = useState(false);
  const [fading, setFading] = useState(false);
  const [touchY, setTouchY] = useState(0);
  const [mobile, setMobile] = useState(false);
  const [vw, setVw] = useState(1440);
  const [vh, setVh] = useState(900);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const update = () => {
      setMobile(window.innerWidth < 768);
      setVw(window.innerWidth);
      setVh(window.innerHeight);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (done && !fading) {
      setFading(true);
      setTimeout(() => { onComplete && onComplete(); }, 650);
    }
  }, [done]);

  useEffect(() => {
    const onWheel = (e) => {
      if (done) return;
      e.preventDefault();
      setProg(prev => {
        const next = Math.min(Math.max(prev + e.deltaY * 0.0009, 0), 1);
        if (next >= 1) setDone(true);
        return next;
      });
    };
    const onTouchStart = (e) => setTouchY(e.touches[0].clientY);
    const onTouchMove = (e) => {
      if (done) return;
      e.preventDefault();
      const dy = touchY - e.touches[0].clientY;
      const f = dy < 0 ? 0.008 : 0.005;
      setProg(prev => {
        const next = Math.min(Math.max(prev + dy * f, 0), 1);
        if (next >= 1) setDone(true);
        return next;
      });
      setTouchY(e.touches[0].clientY);
    };
    const onTouchEnd = () => setTouchY(0);

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [prog, done, touchY]);

  const startW = mobile ? 280 : 420;
  const startH = mobile ? 158 : 236;
  const mw = startW + prog * (vw - startW);
  const mh = startH + prog * (vh - startH);
  const tx = prog * (mobile ? 35 : 25);
  const r = Math.max(0, 20 * (1 - prog));
  const hintOpacity = Math.max(0, 1 - prog * 4);
  const overlayOpacity = Math.max(0, 0.55 - prog * 0.55);
  const fs = mobile ? 44 : 80;

  return (
    <motion.div
      animate={{ opacity: fading ? 0 : 1 }}
      transition={{ duration: 0.65, ease: 'easeInOut' }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        zIndex: 9999, background: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Expanding video card */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: mw, height: mh,
        borderRadius: r,
        overflow: 'hidden',
        boxShadow: '0 8px 80px rgba(0,0,0,.7)',
      }}>
        <video
          src={VIDEO}
          autoPlay
          muted
          loop
          playsInline
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        {/* Dark overlay that fades as card expands */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,' + overlayOpacity + ')',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Title: Visio ←→ Flow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        display: 'flex', alignItems: 'center',
        gap: mobile ? 12 : 24,
        zIndex: 10, pointerEvents: 'none',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          transform: 'translateX(-' + tx + 'vw)',
          fontFamily: 'Outfit,sans-serif',
          fontSize: fs,
          fontWeight: 800,
          color: '#fff',
          letterSpacing: '-3px',
          textShadow: '0 4px 30px rgba(0,0,0,.8)',
          transition: 'transform 0s',
        }}>Visio</span>
        <span style={{
          transform: 'translateX(' + tx + 'vw)',
          fontFamily: 'Outfit,sans-serif',
          fontSize: fs,
          fontWeight: 800,
          color: '#0071E3',
          letterSpacing: '-3px',
          textShadow: '0 4px 30px rgba(0,113,227,.7)',
          transition: 'transform 0s',
        }}>Flow</span>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: '8%', left: '50%',
        transform: 'translateX(-50%)',
        opacity: hintOpacity,
        pointerEvents: 'none',
        textAlign: 'center',
      }}>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p style={{
            color: 'rgba(255,255,255,.7)',
            fontSize: 11,
            fontFamily: 'Inter,sans-serif',
            letterSpacing: '.12em',
            fontWeight: 500,
            textTransform: 'uppercase',
          }}>Faites défiler pour découvrir</p>
          <div style={{ margin: '8px auto 0', width: 1, height: 32, background: 'rgba(255,255,255,.4)' }} />
        </motion.div>
      </div>
    </motion.div>
  );
}
