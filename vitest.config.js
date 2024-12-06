import { defineConfig } from "vitest/config";
import vue from '@vitejs/plugin-vue';

export default defineConfig({
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ['src/setupTests.ts'],
		include: ['src/**/*.test.ts'],
	},
	plugins: [vue()],
});
