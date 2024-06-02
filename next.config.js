/** @type {import('next').NextConfig} */

const withTM = require("next-transpile-modules")([
  "devextreme",
  "devextreme-react",
]);

const nextConfig = {
  output: "export", // <=== enables static exports
  reactStrictMode: true,
  basePath: "/dog-sitter",
};

module.exports = nextConfig;
