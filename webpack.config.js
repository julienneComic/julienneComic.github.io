// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const isProduction = process.env.NODE_ENV == "production";
const CopyWebpackPlugin = require("copy-webpack-plugin");

const generateConfig = (mode) => {
  return {
    mode: mode,
    entry: {
      main: "./index.js",
      pages: "./src/components/page/",
      archive: "./src/components/archive/",
      cast: "./src/components/cast/",
      about: "./src/components/about/",
    },
    output: {
      trustedTypes: {
        policyName: "text/html",
      },
      publicPath: "/",
      path: path.resolve(__dirname, "dist"),
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "assets"),
      },
      historyApiFallback: true,
      open: true,
      port: 3000,
      host: "localhost",
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.html",
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "./style.css" },
          { from: "./pages" },
          { from: "./assets" },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/i,
          loader: "babel-loader",
        },
        {
          test: /\.(pages|data)$/i,
          type: "asset",
        },
        {
          mimetype: "application/json",
          type: "json",
        },
      ],
    },
  };
};

module.exports = () => {
  if (isProduction) {
    return generateConfig("production");
  } else {
    return generateConfig("development");
  }
};
