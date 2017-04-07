/*
|--------------------------------------------------------
| 文档 webpack 配置文件
|--------------------------------------------------------
|
| 配置文件使用 ES6 语法配置，这样能保证整个文档项目的语法统一性
| 修改配置文件请使用 ES6 语法对 webpack 进行配置。
|
| @author Seven Du <shiweidu@outlook.com>
|
*/

import path from 'path';

const webpackConfig = {
  entry: path.resolve(__dirname, 'src', 'main.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js',
    library: 'WebpackLaravelMixManifest',
    libraryTarget: 'umd2',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, 'src')],
        use: ['babel-loader']
      }
    ]
  }
};

export default webpackConfig;
