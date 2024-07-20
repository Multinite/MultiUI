/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ["@multinite_official/multiui-eslint-config/next.js"],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      project: true,
    },
  };
  