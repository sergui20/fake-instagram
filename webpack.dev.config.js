const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'source/js/entries/main.js'),
        feed: path.resolve(__dirname, 'source/js/entries/feed.js')

    },
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new Dotenv()
    ]
}