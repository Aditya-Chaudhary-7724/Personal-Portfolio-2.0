/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Every colour resolves to a CSS variable so the theme switch is one attribute.
      colors: {
        paper: 'var(--paper)',
        raised: 'var(--raised)',
        ink: 'var(--ink)',
        'ink-2': 'var(--ink-2)',
        'ink-3': 'var(--ink-3)',
        rule: 'var(--rule)',
        'rule-strong': 'var(--rule-strong)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      maxWidth: {
        page: '1320px',
      },
    },
  },
  plugins: [],
};
