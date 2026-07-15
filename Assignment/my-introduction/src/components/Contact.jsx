import SITE_DATA from '../data/siteData';

export default function Contact() {
  return (
    <section className="section-contact" id="contact">
      <div className="container">
        <h2 className="contact-heading">{SITE_DATA.contact.heading}</h2>
        <div className="contact-grid">
          {SITE_DATA.contact.items.map((c) => (
            <div key={c.label} className="contact-row">
              <p className="contact-label">{c.label}</p>
              <a
                className="contact-value"
                href={c.href}
                {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {c.value}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
