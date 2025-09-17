import { defineConfig } from "vitest/config";

export default defineConfig({
	// Prevent Vite from trying to load PostCSS/Tailwind in tests
	css: {
		postcss: { plugins: [] },
	},
	test: {
		environment: "node",
		include: ["test_case/unit_test/**/*.test.{ts,tsx}", "test_case/unit_test/**/*.spec.{ts,tsx}"],
	},
});


