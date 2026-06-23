import config from "@shinzo/eslint-config";

const uiConfig = [
  {
    ignores: ["storybook-static/**"],
  },
  ...config,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default uiConfig;
