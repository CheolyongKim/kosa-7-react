import { useState, useEffect, useRef } from 'react';
import SITE_DATA from '../data/siteData';

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 120) {
          if (y > lastY.current + 5) setHidden(true);
          else if (y < lastY.current - 5) setHidden(false);
        } else {
          setHidden(false);
        }
        lastY.current = y;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => setMobileOpen(false);

  return (
    <nav className={`site-nav${hidden ? ' nav-hidden' : ''}`}>
      <div className="nav-pill">
        <div className="nav-logo">{SITE_DATA.nav.logo}</div>
        <div className="nav-links">
          {SITE_DATA.nav.links.map((l) => (
            <a key={l.id} href={`#${l.id}`}>{l.label}</a>
          ))}
        </div>
        <button
          className="nav-toggle"
          aria-label="메뉴"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span /><span /><span />
        </button>
      </div>
      <div className={`nav-mobile${mobileOpen ? ' open' : ''}`} onClick={handleNavClick}>
        {[...SITE_DATA.nav.links, { label: SITE_DATA.nav.ctaLabel, id: SITE_DATA.nav.ctaId }].map((l) => (
          <a key={l.id} href={`#${l.id}`}>{l.label}</a>
        ))}
      </div>
    </nav>
  );
}
