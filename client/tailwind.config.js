/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
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
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        bestSellerTag: {
          DEFAULT: "#d2cf1e5e",
        },
        newTag: {
          DEFAULT: "#acd2cc",
        },
        star: {
          DEFAULT: "#b4690e",
        },
        languageText: {
          DEFAULT: "#2d2f31",
        },
        weakGray: {
          DEFAULT: "#6a6f73",
        },
        purpleStatic: {
          DEFAULT: "#5022c3",
        },
        purpleHover: {
          DEFAULT: "#371783",
        },
        toggleActive: {
          DEFAULT: "#16a38c",
        },
        grayResults: {
          DEFAULT: "#6a6f73",
        },
        hoverDivGray: {
          DEFAULT: "#1739531f",
        },
        btnColor: {
          DEFAULT: "#a435f0",
        },
        btnHoverColor: {
          DEFAULT: "#8710d8",
        },
        borderCommercial: {
          DEFAULT: "#d1d7dc",
        },
        bgCommercial: {
          DEFAULT: "#f7f9fa",
        },
      },
      fontSize: {
        searchTitle: {
          DEFAULT:
            "clamp(2rem, calc(2rem + (3.2 - 2) * (100vw - 36rem) / (144 - 36)), 3.2rem)",
        },
      },
      boxShadow: {
        previewCourseCardShadow:
          "0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
