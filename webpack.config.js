const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'production',
    devtool: 'inline-source-map',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            '@src': path.resolve(__dirname, 'src/'),
        },
    },
    plugins: [new CleanWebpackPlugin()],
    output: {
        filename: 'bank-backend-demo-bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
