import { defineConfig } from '@unocss/webpack';
import presetMini from '@unocss/preset-mini';

export default defineConfig({
  presets: [presetMini()],
  theme: {
    fontFace: {
      sans: ['Arial'],
    },
  },
});
