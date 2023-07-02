// tailwind.config.js
const colors = require("tailwindcss/colors");

module.exports = {
	purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			// Extending colors palette with custom colors for this project
			colors: {
				lighterWhite: "#CCD2E3",
				lighterBlue: "#51CBFF",
				lightBlue: "#017EFA",
				darkerBlue: "#081A51",
				darkerBlue50: "#1B2B65",
				lightGreyContrast: "#F3F4F6",
				goldYellow: "#FFC145",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
	content: ["./node_modules/flowbite/**/*.js"],
};
