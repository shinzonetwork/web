import config from "@shinzo/eslint-config";

const studioConfig = [
  ...config,
  {
    rules: {
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-img-element": "off",
    },
  },
];

export default studioConfig;
