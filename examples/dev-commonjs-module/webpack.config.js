const path = require('path');
const { WebpackLaravelMixManifest } = require('webpack-laravel-mix-manifest');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'none',
    entry: {
        main: path.resolve(__dirname, '../__src__/index.cjs'),
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