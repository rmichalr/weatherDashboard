export default {
	purge: ["./src/**/*.{js,jsx,ts,tsx,vue}"],
	darkMode: false,
	theme: {
		extend: {
			colors: {
				secondary: 'var(--secondary-color)',
				primary: 'var(--primary-color)',
				primaryHover: 'var(--primary-color-hover)',
				linkColorHover: 'var(--link-color-hover)',
				backgroundColor: 'var(--background-color)',
				navigationColor: 'var(--navigation-color)',
				panelColor: 'var(--panel-color)',
			},
			boxShadow: {
				'navigation': '0 4px 6px rgba(0, 0, 0, 0.3)',
			},
		},
	},
	variants: {},
	plugins: [],
	module: 'esm',
};
