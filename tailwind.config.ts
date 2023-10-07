import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: 'class',
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			transparent: 'transparent',
			white: '#fff',
			black: '#000',
			'theme-green': '#4ade80',
			'gradient-via': '#94D82D',
			'theme-purple': '#7e22ce',
			'gray-dark': '#050505',
			'gray-border': '#1f1f1f',
			'gray-light': '#444444',
		},
		extend: {
			animation: {
				border: 'background ease infinite',
			},
			keyframes: {
				background: {
					'0%, 100%': { backgroundPosition: '0% 200%' },
					'50%': { backgroundPosition: '100% 0%' },
				},
			},
		},
	},

	plugins: [],
};
export default config;
