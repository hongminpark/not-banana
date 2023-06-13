import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Helvetica Neue", "SF Pro", "Arial"],
    },
    maxWidth: {
      xxs: "16rem",
    },
  },
  plugins: [],
} satisfies Config;
