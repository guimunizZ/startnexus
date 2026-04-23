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
				/* já existentes (mantidos) */
				background: "var(--background)",
				foreground: "var(--foreground)",
				surface: "var(--surface)",
				muted: "var(--muted)",

				primary: "var(--primary)",
				secondary: "var(--secondary)",

				/* NOVOS - para dashboard */
				dark: "var(--dark)",
				gray: "var(--gray)",

				/* opcionais úteis */
				success: "#10b981",
				warning: "#f59e0b",
				danger: "#ef4444",
			},
		},
	},

	plugins: [],
};