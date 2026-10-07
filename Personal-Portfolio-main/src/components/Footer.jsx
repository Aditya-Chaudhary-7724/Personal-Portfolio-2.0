import { contactLinks, profile } from '../data/content';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="page">
      <div className="flex flex-col gap-6 border-t border-rule py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11.5px] text-ink-3">
          © {year} {profile.name} · rev. {profile.updated}
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {contactLinks.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink"
              >
                <span className="link-underline">{l.label}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="font-mono text-[11.5px] uppercase tracking-[0.12em] text-ink-3 hover:text-ink">
              <span className="link-underline">Top ↑</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
