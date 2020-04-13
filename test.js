const webpack = require('webpack');
const WebpackLaravelMixManifest = require("./src/main");

const compiler = webpack({
  mode: "development",
  context: __dirname+'/src',
  entry: {
    'main': './main.js',
  },
  output: {
    path: __dirname+'/demo',
    filename: 'js/[name].[hash].js?id=[hash]'
  },
  plugins: [
    new WebpackLaravelMixManifest(),
  ]
});

compiler.run();
