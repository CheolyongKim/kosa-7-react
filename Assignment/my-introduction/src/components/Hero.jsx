import { useState, useEffect, useRef } from 'react';
import SITE_DATA from '../data/siteData';

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0);
  const [hidden, setHidden] = useState(true);
  const heroBgRef = useRef(null);
  const wordRef = useRef(null);
  const wrapRef = useRef(null);

  const { hero } = SITE_DATA;

  // Word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setHidden(true);
      setTimeout(() => {
        setWordIdx((prev) => (prev + 1) % hero.rotatingWords.length);
        setHidden(false);
      }, 250);
    }, 1800);
    return () => clearInterval(interval);
  }, [hero.rotatingWords.length]);

  // Scroll corner rounding effect
  useEffect(() => {
    const onScroll = () => {
      const el = heroBgRef.current;
      if (!el) return;
      const y = window.scrollY;
      const r = Math.min(1, y / 200);
      el.style.marginLeft = `${r * 12}px`;
      el.style.marginRight = `${r * 12}px`;
      el.style.borderBottomLeftRadius = `${r * 42}px`;
      el.style.borderBottomRightRadius = `${r * 42}px`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg" ref={heroBgRef}>
        <div className="hero-center">
          <h1 className="hero-title">
            <span className="line-wrap"><span className="line-inner">{hero.titleTop}</span></span>
            <span className="line-wrap"><span className="line-inner">{hero.titleBottom}</span></span>
          </h1>
          <p className="hero-sub">
            {hero.rotatingPrefix}{' '}
            <span className="rotating-word" ref={wrapRef}>
              <strong ref={wordRef} className={hidden ? 'hidden' : ''}>
                {hero.rotatingWords[wordIdx]}
              </strong>
            </span>
            {' '}{hero.rotatingSuffix}
          </p>
        </div>
      </div>
    </section>
  );
}
