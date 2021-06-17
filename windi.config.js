import { defineConfig } from 'windicss/helpers';

const COLORS = {
  primary: 'var(--kolibri-color-primary)',
  'primary-10': 'var(--kolibri-color-primary-10)',
  'primary-20': 'var(--kolibri-color-primary-20)',
  secondary: 'var(--kolibri-color-secondary)',
  neutral: 'var(--kolibri-color-neutral)',
  selected: 'var(--kolibri-color-selected)',
  accent: 'var(--kolibri-color-accent)',
  success: 'var(--kolibri-color-success)',
  info: 'var(--kolibri-color-info)',
  warning: 'var(--kolibri-color-warning)',
  error: 'var(--kolibri-color-error)',
};

const BORDER_RADIUS = {
  DEFAULT: 'var(--kolibri-border-radius)', // '4px',
};

export default defineConfig({
  darkMode: 'media',
  extract: {
    include: ['src/**/*.{html,vue,jsx,tsx,svelte}'],
  },
  plugins: [require('windicss/plugin/filters')],
  theme: {
    extend: {
      colors: COLORS,
      backgroundColor: COLORS,
      borderColor: COLORS,
      borderRadius: BORDER_RADIUS,
      fontFamily: {
        sans: ['BundesSans', 'sans-serif'],
        serif: ['BundesSerif', 'serif'],
      },
    },
  },
});
