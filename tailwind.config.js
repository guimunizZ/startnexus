/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				background: "#f8fafc",
				foreground: "#111827",
				primary: "#10b981",
				secondary: "#34d399",
				dark: "#0f172a",
				gray: "#e5e7eb",
			},
		},
	},
	plugins: [],
}