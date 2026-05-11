import config from "@shinzo/eslint-config";

const uiConfig = [
  ...config,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    },
  },
];

export default uiConfig;
