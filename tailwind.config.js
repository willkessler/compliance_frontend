import { fontFamily } from "tailwindcss/defaultTheme";
import flowbitePlugin from 'flowbite/plugin'


/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'selector',
  content: ["./src/**/*.{html,js,svelte,ts}"],
  safelist: ["dark"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
	"2xl": "1400px"
      }
    },
    extend: {
      colors: {
	border: "hsl(var(--border) / <alpha-value>)",
	input: "hsl(var(--input) / <alpha-value>)",
	background: "hsl(var(--background) / <alpha-value>)",
	foreground: "hsl(var(--foreground) / <alpha-value>)",
        // flowbite-svelte
        primary: {
          50: '#FFF5F2',
          100: '#FFF1EE',
          200: '#FFE4DE',
          300: '#FFD5CC',
          400: '#FFBCAD',
          500: '#FE795D',
          600: '#EF562F',
          700: '#EB4F27',
          800: '#CC4522',
          900: '#A5371B'
        },
        green: {
          100: '#dcfce7',
          800: '#166534',
        },
        purple: {
          100: '#f3e8ff',
          800: '#6b21a8',
        },
        gray: {
          100: '#f3f4f6',
          800: '#1f2937',
        },
      },
      borderRadius: {
	lg: "var(--radius)",
	md: "calc(var(--radius) - 2px)",
	sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
	sans: [...fontFamily.sans]
      }
    }
  },
  plugins: [
    require("tailwindcss-animate"),
    flowbitePlugin,
  ],
};

export default config;
