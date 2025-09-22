module.exports = {
  root: true,
  extends: [
    "@react-native",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-var-requires": "off",
  },
  ignorePatterns: ["node_modules/", "android/", "ios/", "__tests__/", ".bundle/"],
};
