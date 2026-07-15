import { useEffect, useRef, useState } from 'react';
import SITE_DATA from '../data/siteData';

function ProjectCard({ project, delay }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="project-card" data-delay={delay}>
      <div className="project-thumb">
        {!imgError && (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
          />
        )}
        <div className="fallback-icon" style={imgError ? { display: 'flex' } : { display: 'none' }}>
          <i className={project.icon}></i>
        </div>
      </div>
      <div className="project-body">
        <div className="project-title">{project.title}</div>
        <div className="project-desc">{project.desc}</div>
        <div className="project-tag">{project.tag}</div>
      </div>
    </div>
  );
}

export default function Projects() {
  const gridRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.project-card');
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
    <section className="section-projects" id="projects">
      <div className="container">
        <div className="section-label" ref={labelRef}>{SITE_DATA.projects.label}</div>
        <div className="project-grid" ref={gridRef}>
          {SITE_DATA.projects.items.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 80} />
          ))}
        </div>
      </div>
    </section>
  );
}
