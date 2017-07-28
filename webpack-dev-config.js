var webpack = require('webpack');
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //提取js中的css
var CopyWebpackPlugin = require('copy-webpack-plugin'); // 拷贝文件

//定义路径
var rootPath = path.resolve(__dirname);
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var distPath = path.resolve(rootPath,'rootCloud');

module.exports = {
    entry: {
        main:'./src/js/main.js',
        p1:'./src/js/p1.js'
    },
    output: {
        path: distPath,
        filename: "js/[name].js",
    },
    devServer:{
        historyApiFallback:true,
        hot:true,
        inline:true,
        port:3000
    },
    module:{
        loaders:[{
            test:/\.js$/,
            loader:'babel-loader',
            exclude:nodeModulesPath,
            include:path.resolve(rootPath,'./src/'),
            query:{
                presets:['es2015']
            }
        },{
            test:/\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: {
                    loader: "css-loader"
                },
                publicPath: "./../"
            })
        },{
            test:/\.(png|jpg|gif|svg)$/i,
            loader:'file-loader?name=imgs/[name].[ext]!image-webpack-loader'
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/debug'),
            to: path.resolve(__dirname,'rootCloud/debug')
        },{
            from: path.resolve(__dirname, 'src/libs'),
            to: path.resolve(__dirname,'rootCloud/libs')
        }]),
        new ExtractTextPlugin({
            filename: "css/[name].css",
            //filename: "css/style.css",
            disable: false,
            allChunks: true
        }),
        new htmlWebpackPlugin({
            filename:'p1.html',
            template:path.resolve(__dirname,'./src/p1.html'),
            chunks:['p1'],
            title:'智能服务'
        })
    ]
};
