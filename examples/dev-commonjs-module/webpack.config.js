const path = require('path');
const { WebpackLaravelMixManifest } = require('webpack-laravel-mix-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js',
    },
    plugins: [
        new CleanWebpackPlugin,
        new WebpackLaravelMixManifest,
    ]
};