/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: "class",

	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	],

	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				surface: "var(--surface)",
				muted: "var(--muted)",

				primary: "var(--primary)",
				secondary: "var(--secondary)",
			},
		},
	},

	plugins: [],
};