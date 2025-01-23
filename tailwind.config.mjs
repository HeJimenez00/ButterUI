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
        "8xl": "100rem", // 1200px / 10 = 120rem
      },
      fontSize: {
        h1: "3.5rem", // 35px / 10 = 3.5rem
        h2: "2.7rem", // 27px / 10 = 2.7rem
        h3: "2rem", // 20px / 10 = 2.0rem
        subtitle: "1.8rem", // 24px / 10 = 2.4rem
        body: "1.6rem", // 16px / 10 = 1.6rem
        cta: "1.6rem", // 16px / 10 = 1.6rem
        small: "1.4rem", // 14px / 10 = 1.4rem
        xsmall: "1.2rem", // 12px / 10 = 1.2rem
      },
    },
  },
  plugins: [],
};
