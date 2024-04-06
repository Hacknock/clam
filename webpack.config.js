const path = require("path");

module.exports = {
  mode: "production",
  entry: "./clam.js",
  output: {
    path: path.resolve(__dirname),
    filename: "clam.min.js",
    library: "$",
    libraryTarget: "umd",
  },
  resolve: {
    extensions: [".js"],
  },
};
