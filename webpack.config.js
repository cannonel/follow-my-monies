const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const config = {
  entry: { app: "./public/js/index.js" },
  output: { filename: "[name].bundle.js", path: `${__dirname}/dist` },
  plugins: [
    new WebpackPwaManifest({
      name: "Budget Tracker",
      short_name: "Budget Tracker",
      description: "An app that tracks your budget on and offline",
      start_url: "./public/index.html",
      background_color: "#0D1117",
      theme_color: "#3A6BA4",
      fingerprints: false,
      inject: false,
      icons: [
        {
          src: path.resolve("public/icons/icon-512x512.png"),
          sizes: [72, 96, 128, 144, 152, 192, 384, 512],
          destination: path.join("assets", "icons"),
        },
      ],
    }),
  ],
  mode: "development",
};
module.exports = config;
