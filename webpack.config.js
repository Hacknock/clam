const path = require("path");

module.exports = {
  mode: "production",
  entry: {
    clam: ["./clam.js"],
  },
  output: {
    path: path.resolve(__dirname),
    filename: "clam.min.js",
    library: "Clam",
    libraryExport: "default",
    libraryTarget: "umd",
    globalObject: "this",
  },
  resolve: {
    extensions: [".js"],
  },
};
