module.exports = {
  content: [
    "./node_modules/@heroui/theme/dist/components/(card|ripple).js",
  ],
  theme: {
    extend: {
      fontFamily: {
        prompt: ['Prompt', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};