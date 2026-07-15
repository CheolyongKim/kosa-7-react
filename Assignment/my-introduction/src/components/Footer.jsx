import SITE_DATA from '../data/siteData';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <p>{SITE_DATA.footer.copy}</p>
      </div>
    </footer>
  );
}
