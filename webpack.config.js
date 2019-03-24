const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
    const plugins = [
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css'
        }),
        new Dotenv()
    ]

    // if (env.NODE_ENV === "production") {
    //     plugins.push(
    //         new CleanWebpackPlugin()
    //     )
    // }

    return {
        mode: 'production',
        entry: {
            main: path.resolve(__dirname, 'source/js/entries/main.js'),
            feed: path.resolve(__dirname, 'source/js/entries/feed.js')
    
        },
        output: {
            path: path.resolve(__dirname, 'public/dist'),
            filename: 'js/[name].[hash].js',
            publicPath: path.resolve(__dirname, 'public/dist') + "/",
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
        plugins
    }
}