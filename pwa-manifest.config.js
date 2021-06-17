const path = require('path');
module.exports = {
  publicPath: '/',
  name: 'DiPA-Client',
  short_name: 'DiPA',
  description: '...',
  lang: 'de-DE',
  start_url: '/',
  display: 'fullscreen',
  orientation: 'any',
  theme_color: '#ddd',
  background_color: '#ddd',
  filename: 'manifest.json',
  icons: [
    {
      src: path.resolve('public/assets/dipa.logo.jfif'),
      sizes: [96, 128, 192, 256, 384, 512],
      purpose: 'any maskable',
    },
  ],
  crossorigin: null,
  inject: true,
  fingerprints: false,
  ios: false,
  includeDirectory: true,
};
