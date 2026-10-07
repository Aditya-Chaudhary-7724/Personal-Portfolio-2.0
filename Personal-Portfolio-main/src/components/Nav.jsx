import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { nav, profile } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';

function ThemeIcon({ theme }) {
  // Half-filled disc: the filled half flips with the theme.
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="7" r="6" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d={theme === 'dark' ? 'M7 1a6 6 0 0 1 0 12z' : 'M7 1a6 6 0 0 0 0 12z'} fill="currentColor" />
    </svg>
  );
}

function Nav({ theme, onToggleTheme }) {
  const active = useActiveSection(nav.map((n) => n.id));
  const { scrollYProgress } = useScroll();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef(null);
  const sheet = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile sheet: lock scroll, close on Escape, keep focus inside, restore focus on close.
  useEffect(() => {
    if (!open) return undefined;
    const button = menuButton.current;
    document.body.style.overflow = 'hidden';
    sheet.current?.querySelector('a')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && sheet.current) {
        const focusable = [button, ...sheet.current.querySelectorAll('a, button')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      button?.focus();
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener('change', close);
    return () => mq.removeEventListener('change', close);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? 'bg-[color-mix(in_srgb,var(--paper)_90%,transparent)] backdrop-blur-[6px]' : 'bg-transparent'
      }`}
    >
      <nav aria-label="Primary" className="page flex h-14 items-center justify-between gap-6">
        <a href="#top" className="group flex items-baseline gap-2 font-mono text-[12px] tracking-wide">
          <span className="font-serif text-[22px] italic leading-none text-ink">ac</span>
          <span className="hidden text-ink-3 transition-colors group-hover:text-ink sm:inline">
            {profile.name.toLowerCase().replace(' ', '.')}
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item, i) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? 'location' : undefined}
                  className={`relative block px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-3 hover:text-ink'
                  }`}
                >
                  <span className="mr-1.5 hidden text-[10px] text-ink-3 xl:inline">{String(i + 1).padStart(2, '0')}</span>
                  {item.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 -bottom-px h-px bg-accent"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onToggleTheme}
            className="flex h-10 items-center gap-2 px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-3 transition-colors hover:text-ink"
            aria-label={`${theme} theme, switch to ${theme === 'dark' ? 'light' : 'dark'}`}
          >
            <ThemeIcon theme={theme} />
            <span className="hidden lg:inline">{theme}</span>
          </button>
          <button
            ref={menuButton}
            type="button"
            className="flex h-10 items-center gap-2 px-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Close' : 'Menu'}
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? 'top-1 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ${
                  open ? 'top-1 -rotate-45' : 'top-2'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* reading progress: a hairline under the bar */}
      <motion.div
        aria-hidden="true"
        className="h-px origin-left bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            ref={sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Site sections"
            className="fixed inset-x-0 bottom-0 top-14 flex flex-col justify-between overflow-y-auto bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <ul className="page pt-6">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  className="border-b border-rule"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? 'location' : undefined}
                    className="flex items-baseline gap-4 py-4"
                  >
                    <span className="font-mono text-[11px] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                    <span className={`font-serif text-[2.4rem] leading-none ${active === item.id ? 'italic text-accent-ink' : ''}`}>
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="page label pb-8 pt-10">
              {profile.focus.join(' · ')}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Nav;
