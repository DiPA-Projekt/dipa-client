module.exports = (...args) => {
  // Here using the example for react
  const config = require('@leanup/stack-react/webpack.config')(...args);

  // import { mergeConfig } from 'vite';
  // const fs = require('fs');

  // module.exports = mergeConfig(require('@leanup/stack-preact/vite.config'), {
  //   server: {
  //     https: {
  //       key: fs.readFileSync('localhost-key.pem'),
  //       cert: fs.readFileSync('localhost.pem'),
  //     },

  const CopyPlugin = require('copy-webpack-plugin');
  if (args[0].WEBPACK_BUILD) {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'public',
          },
        ],
      })
    );

    const path = require('path');
    const WebpackPwaManifest = require('webpack-pwa-manifest');
    const pwaManifestConfigPath = path.resolve(process.cwd(), 'pwa-manifest.config.js');
    const { GenerateSW } = require('workbox-webpack-plugin');
    const workboxConfigPath = path.resolve(process.cwd(), 'workbox-config.js');

    config.plugins.push(new WebpackPwaManifest(require(pwaManifestConfigPath)));
    config.plugins.push(new GenerateSW(require(workboxConfigPath)));
  }

  return config;
};
