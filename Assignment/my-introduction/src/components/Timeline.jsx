import { useState, useRef, useEffect, useCallback } from 'react';
import SITE_DATA from '../data/siteData';

export default function Timeline() {
  const [openIdx, setOpenIdx] = useState(-1);
  const bodyRefs = useRef([]);

  const toggle = useCallback((idx) => {
    setOpenIdx((prev) => (prev === idx ? -1 : idx));
  }, []);

  // Reset refs array length
  useEffect(() => {
    bodyRefs.current = bodyRefs.current.slice(0, SITE_DATA.timeline.items.length);
  }, []);

  return (
    <section className="section-timeline" id="timeline">
      <div className="container">
        <h2 className="tl-heading">{SITE_DATA.timeline.heading}</h2>
        <p className="tl-subtext">{SITE_DATA.timeline.subtext}</p>
        <div className="accordion">
          {SITE_DATA.timeline.items.map((item, i) => {
            const isOpen = openIdx === i;
            const bodyEl = bodyRefs.current[i];
            const maxHeight = isOpen && bodyEl ? `${bodyEl.scrollHeight + 16}px` : '0';

            return (
              <div key={i} className={`acc-item${isOpen ? ' open' : ''}`}>
                <button className="acc-trigger" onClick={() => toggle(i)}>
                  <div className="acc-icon">
                    <svg viewBox="0 0 24 24" fill="none">
                      <line x1="8" y1="12" x2="16" y2="12" className="horiz" />
                      <line x1="12" y1="8" x2="12" y2="16" className="vert" />
                    </svg>
                  </div>
                  <span className="acc-question">{item.q}</span>
                </button>
                <div className="acc-body" style={{ maxHeight }}>
                  <div
                    className="acc-answer"
                    ref={(el) => { bodyRefs.current[i] = el; }}
                  >
                    {item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
