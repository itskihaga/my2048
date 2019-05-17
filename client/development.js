import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin';

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

export default {
    mode: 'development',
    entry: {
        main: ['@babel/polyfill',src + '/index.jsx']
    },

    output: {
        path: dist,
        filename: 'app.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName:'[name]_[local]_[hash:base64:5]',
                            url: false,
                            sourceMap: true,
                            importLoaders: 2
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            // ソースマップの利用有無
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules'],
        alias: {
            '@': src,
            '$setting':path.resolve(__dirname, 'context/setting-dev')
        }
    },
    devServer: {
        port: 3000,
        open:true
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: src + '/index.html',
            filename: 'index.html'
        })
    ]
}