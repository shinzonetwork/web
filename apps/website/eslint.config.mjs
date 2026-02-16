import config from "@shinzo/eslint-config";

const rules = [
  { ignores: ["migrations/**"] },
  ...config,
];

export default rules;
