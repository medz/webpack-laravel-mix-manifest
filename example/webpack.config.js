/*
|--------------------------------------------------------
| 文档 webpack 配置文件
|--------------------------------------------------------
|
| 这里演示使用的低版本js，附带了 ES6 用法.
|
| @author Seven Du <shiweidu@outlook.com>
|
*/

var path = require('path');

// < es6
var WebpackLaravelMixManifestObject = require('../dist/main.js');
var transform = WebpackLaravelMixManifestObject.transform;
var WebpackLaravelMixManifest = WebpackLaravelMixManifestObject.default;

// Transform is optional.
// 
// ES6 code:
// import WebpackLaravelMixManifest, { transform } from '../dist/main.js';
// 
// package use:
// import WebpackLaravelMixManifest, { transform } from 'webpack-laravel-mix-manifest';
// 
// If you want to use es5's original code to produce the laravel-mix function compatible plugin:
// import WebpackLaravelMixManifest, { transform } from 'webpack-laravel-mix-manifest/src/main.js'; 

module.exports = {
  cache: true,
  context: __dirname,
  entry: {
    app: path.resolve(__dirname, 'main.js')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [__dirname],
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    // Try various defaults and options.
    new WebpackLaravelMixManifest(),
    new WebpackLaravelMixManifest({}),
    new WebpackLaravelMixManifest({
      filename: 'test.json'
    }),
    new WebpackLaravelMixManifest({
      transform
    }),
    new WebpackLaravelMixManifest({
      filename: 'test2.json',
      transform: (asstes) => JSON.stringify(asstes, null, 2)
    })
  ]
};
