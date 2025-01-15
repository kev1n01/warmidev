/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class',
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			screens: {
				'xs': '360px',
				'sm': '640px',
				'md': '768px',
				'lg': '1024px',
				'xl': '1280px',
				'2xl': '1536px',
			},
			fontFamily: {
				sans: ['Arial', 'sans-serif'],
				monts: ['"Montserrat"', 'sans-serif'],
				buycat: ['"Buycat"', 'sans-serif'],
				saku: ['"Sakurata"', 'sans-serif'],
			},
		},
	},
	plugins: [],
}
