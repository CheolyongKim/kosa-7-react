import { useEffect, useRef } from 'react';
import SITE_DATA from '../data/siteData';

export default function StickyText() {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const words = wordsRef.current;
      if (!words.length) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
      const total = words.length;
      const lightColor = '#d5d3cd';
      const darkColor = '#000000';

      for (let i = 0; i < total; i++) {
        const start = i / total;
        const end = (i + 1) / total;
        const alpha = Math.max(0, Math.min(1, (progress - start * 0.85) / (end - start + 0.04)));

        if (alpha >= 1) {
          words[i].style.color = darkColor;
        } else if (alpha <= 0) {
          words[i].style.color = lightColor;
        } else {
          words[i].style.color = `color-mix(in srgb, ${darkColor} ${Math.round(alpha * 100)}%, ${lightColor})`;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const { words } = SITE_DATA.stickyText;

  return (
    <section className="sticky-text-section" ref={sectionRef}>
      <div className="sticky-text-inner">
        <div className="sticky-text-content">
          <p className="sticky-text-paragraph">
            {words.map((w, i) => (
              <span key={i} className="sw" ref={(el) => { wordsRef.current[i] = el; }}>
                {w}{i < words.length - 1 ? ' ' : ''}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
