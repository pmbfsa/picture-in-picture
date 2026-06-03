import { defineConfig } from 'vite';
import webfontDownload from 'vite-plugin-webfont-dl';
import sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  base: './',
  plugins: [
    webfontDownload(
      ['https://fonts.googleapis.com/css2?family=Barlow&display=swap'],
      { assetsSubfolder: 'fonts' },
    ),
    sitemap({
      hostname: 'https://pmbfsa.github.io/picture-in-picture/',
      outDir: 'docs',
    }),
  ],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
});
