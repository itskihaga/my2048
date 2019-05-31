const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

module.exports = {
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
                // 拡張子 .ts もしくは .tsx の場合
                test: [/\.ts$/,/\.tsx$/],
                // TypeScript をコンパイルする
                use: "ts-loader"
            },
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
        extensions: ['.js', '.jsx','.ts','.tsx'],
        modules: ['node_modules'],
        alias: {
            '@': src,
            '$setting':path.resolve(__dirname, 'src','settings','development')
        }
    },
    devServer: {
        port: 3000,
        open:true,
        historyApiFallback:true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: src + '/index.html',
            filename: 'index.html'
        })
    ]
}
