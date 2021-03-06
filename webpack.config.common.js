const path = require('path')
const ClaenWebpackPlugin = require('clean-webpack-plugin') //清除旧的bundle文件
const HtmlWebpackPlugin = require('html-webpack-plugin') //用于更新html文件，以适应新增的bundle文件
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        entryName1:'./src/index.js',
        entryName2:'./src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        path:path.resolve(__dirname,'dist'),
        publicPath:'/'
    },
    plugins: [
        new ClaenWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: '自定义替换后的index.html标题'
        }),
        new webpack.ProvidePlugin({
            $:'jquery'
        })
        
    ],

    module:{
        rules: [
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test:/\.(woff|woff2|eot|ttf|otf)$/,
                use:[
                    'file-loader'
                ]
            },
            {
                test:/\.(csv|tsv)$/,
                use:[
                    'csv-loader'
                ]
            },
            {
                test:/\.xml$/,
                use:[
                    'xml-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/, 
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                /*
                * 也许遇到过一个老旧的库(library)，和上面所展示的代码类似。在这个用例中，
                * 我们可以使用 exports-loader，将一个全局变量作为一个普通的模块来导出。
                * 例如，为了将 file 导出为 file 以及将 helpers.parse 导出为 parse
                *   //global.js
                *   var file = 'blah.txt';
                    var helpers = {
                        test: function() { console.log('test something'); },
                        parse: function() { console.log('parse something'); }
                    }
                * 
                * 现在从文件中，能 import { file, parse } from './globals.js';
                * */

                // test: require.resolve('global.js'),
                // use: 'exports-loader?file,parse=helpers.parse'
            }
        ]
    }
}