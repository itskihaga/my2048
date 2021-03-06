const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    watch: true,
    mode:"development",
    entry: './server/index.ts', 
    target: 'node',// Module not found: Error: Can't resolve 'fs'とかいっぱい出たら、この行書き忘れ
    externals: [nodeExternals()], 
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                loader: 'ts-loader',
                test: /\.ts$/,
                exclude: [
                    /node_modules/
                ],
                options: {
                    configFile: 'tsconfig.json'
                }
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
        modules: ['node_modules'],
        alias: {
            '@': path.resolve(__dirname, "src")
        }
    },
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'server/dist')
    }
};