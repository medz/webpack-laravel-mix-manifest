const path = require('path');
const { WebpackLaravelMixManifest } = require('webpack-laravel-mix-manifest');

module.exports = {
    mode: 'none',
    entry: {
        main: path.resolve(__dirname, '../__src__/index.cjs'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[chunkhash].js',
    },
    plugins: [
        new WebpackLaravelMixManifest,
    ]
};