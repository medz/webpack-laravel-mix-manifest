import path from 'path';
import { WebpackLaravelMixManifest } from 'webpack-laravel-mix-manifest';

const config = {
    mode: 'none',
    entry: {
        main: path.resolve(__dirname, '../__src__/index.mjs'),
        'path/to/main': path.resolve(__dirname, '../__src__/index.mjs'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[chunkhash].js',
    },
    module: {
        rules: [
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
      },
    plugins: [
        new WebpackLaravelMixManifest,
    ],
};

export default config;
