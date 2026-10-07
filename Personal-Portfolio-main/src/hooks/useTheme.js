import { useCallback, useEffect, useState } from 'react';

const KEY = 'theme';

function readStored() {
  try {
    const value = localStorage.getItem(KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

// index.html sets data-theme before paint; this hook keeps it in sync afterwards.
export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || readStored() || systemTheme()
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Follow the OS setting until the visitor picks a theme explicitly.
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const onChange = () => {
      if (!readStored()) setTheme(mq.matches ? 'light' : 'dark');
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(KEY, next);
      } catch {
        // storage blocked (private mode etc.) — the toggle still works for this visit
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
