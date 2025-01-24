/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        blue: {
          100: "oklch(73.37% 0.1303 267.64)",
          200: "oklch(64.54% 0.1834 266.13)",
          300: "oklch(59.88% 0.1997 266)",
          400: "oklch(56.32% 0.2147 265.93)",
          500: "oklch(54.03% 0.2472 265.97)",
          600: "oklch(49.19% 0.2422 265.98)",
        },
        white: {
          100: "oklch(95.47% 0.0128 266.7)",
          200: "oklch(92.36% 0.0163 262.75)",
          300: "oklch(88.75% 0.0219 265.75)",
          400: "oklch(75.71% 0.0487 266.58)",
          500: "oklch(67.36% 0.042 267.77)",
        },
        black: {
          100: "oklch(25.34% 0.0592 272.68)",
          200: "oklch(26.01% 0.0496 272.68)",
          300: "oklch(23.7% 0.0411 272.73)",
          400: "oklch(21.09% 0.0404 271.92)",
          500: "oklch(19.74% 0.0368 273.1)",
          600: "oklch(16.27% 0.0259 272.54)",
          700: "oklch(11.76% 0.0292 263.44)",
        },
      },
      maxWidth: {
        "8xl": "80rem",
      },
      fontSize: {
        h1: "2.1875rem", // 35px / 16
        h2: "0.16875rem", // 2.7px / 16
        h3: "1.25rem", // 20px / 16
        subtitle: "1.125rem", // 18px / 16
        body: "1rem", // 16px / 16
        cta: "1rem", // 16px / 16
        small: "0.875rem", // 14px / 16
        xsmall: "0.75rem", // 12px / 16
      },
    },
  },
  plugins: [],
};
