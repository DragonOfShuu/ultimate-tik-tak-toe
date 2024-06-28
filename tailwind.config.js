/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                back: "rgb(var(--back-color) / <alpha-value>)",
                text: "rgb(var(--text-color) / <alpha-value>)",
                selected: "rgb(var(--selected-color) / <alpha-value>)",
                sub: "rgb(var(--sub-color) / <alpha-value>)",
                "sub-alt": "rgb(var(--sub-alt-color) / <alpha-value>)",
            },
        },
    },
    plugins: [],
};
