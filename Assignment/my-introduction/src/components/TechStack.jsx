import { useEffect, useRef } from 'react';
import SITE_DATA from '../data/siteData';

export default function TechStack() {
  const gridRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.tech-card');
    if (!cards) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10);
            setTimeout(() => entry.target.classList.add('visible'), delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    cards.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const label = labelRef.current;
    if (!label) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    label.style.opacity = '0';
    label.style.transform = 'translateY(20px)';
    label.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(label);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section-tech" id="tech">
      <div className="container">
        <div className="section-label" ref={labelRef}>{SITE_DATA.tech.label}</div>
        <div className="tech-grid" ref={gridRef}>
          {SITE_DATA.tech.items.map((t, i) => (
            <div key={t.name} className="tech-card" data-delay={i * 100}>
              <div className="tech-icon"><i className={t.icon}></i></div>
              <div className="tech-name">{t.name}</div>
              <div className="tech-desc">{t.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
