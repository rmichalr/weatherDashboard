import { defineConfig, Plugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss({
		  config: resolve(__dirname, 'tailwind.config.js'),
	  }) as unknown as Plugin,
  ],
});