import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { WebpackLaravelMixManifest } from 'webpack-laravel-mix-manifest';

export default {
    mode: 'none',
    entry: {
        main: path.resolve(__dirname, '../__src__/index.mjs'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-[hash].js',
    },
    module: {
        rules: [
            {
                test: /\.[m]js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin,
        new WebpackLaravelMixManifest,
    ],
};
