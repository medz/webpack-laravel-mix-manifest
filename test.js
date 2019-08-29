const webpack = require('webpack');
const WebpackLaravelMixManifest = require("./src/main");

const compiler = webpack({
  mode: "development",
  context: __dirname+'/src',
  entry: {
    'main?a': './main.js',
  },
  output: {
    path: __dirname+'/demo',
    filename: 'js/[name].[hash].js'
  },
  plugins: [
    new WebpackLaravelMixManifest(),
  ]
});

compiler.run(function (error, state) {
  // console.log(error);
  console.log();
  // console.log(state);
});
