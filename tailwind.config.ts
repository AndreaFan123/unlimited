import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

const spacingScale =
  "0|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/[locale]/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    {
      pattern: new RegExp(
        `^(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(${spacingScale})$`
      ),
    },
    {
      pattern: new RegExp(`^(gap|space-x|space-y)-(${spacingScale})$`),
    },
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    animation: {
      scroll: "scroll 30s linear infinite",
      bounce: "bounce 1s infinite",
    },
    keyframes: {
      scroll: {
        "0%": {
          transform: "translateX(0)",
        },
        "100%": {
          transform: "translateX(-50%)",
        },
      },
      bounce: {
        "0%, 100%": {
          transform: "translateX(-25%)",
          animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
        },
        "50%": {
          transform: "translateX(0)",
          animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
        },
      },
    },
  },
  plugins: [animate, typography],
};
export default config;
