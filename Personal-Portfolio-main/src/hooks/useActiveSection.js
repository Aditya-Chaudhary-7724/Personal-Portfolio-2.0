import { useEffect, useState } from 'react';

// Returns the id of the section currently crossing the upper-middle of the viewport.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null);
  const key = ids.join(',');

  useEffect(() => {
    const elements = key
      .split(',')
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      // A thin band 35% from the top: exactly one section is inside it at a time.
      { rootMargin: '-35% 0px -64% 0px' }
    );
    elements.forEach((el) => observer.observe(el));

    // Above the first section (the hero) nothing should be marked active.
    const onScroll = () => {
      if (window.scrollY < elements[0].offsetTop - window.innerHeight * 0.4) setActive(null);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [key]);

  return active;
}
