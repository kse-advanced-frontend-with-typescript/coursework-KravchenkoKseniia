const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: './src/index.tsx',
    devServer: {
        historyApiFallback: true
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[hash].[ext]',
                            outputPath: 'images/',
                        },
                    },
                ],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "ts-loader",
                options: {
                    transpileOnly: false, // Ensures type checking
                },
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            modules: {
                                localIdentName: '[local]--[name]--[hash:base64:5]'
                            }
                        }
                    }
                ]
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new Dotenv(),
        new webpack.DefinePlugin({
            'process.env.BASE_URL': JSON.stringify(process.env.BASE_URL),
            'process.env.API_KEY': localEnv.API_KEY
                ? JSON.stringify(localEnv.API_KEY)
                : JSON.stringify(process.env.API_KEY)
        })
    ]
};