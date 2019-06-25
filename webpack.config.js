const glob = require('glob');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const removePath = "./src/pages/";
const outPutPath = '../src/main/resources/dist/';
const outPutFolder = 'templates/';

module.exports = () => {
    const config = {
        entry: {
            base: './src/main.js'
        },
        output: {
            filename: 'static/js/[name].bundle.js',
            path: path.resolve(__dirname, outPutPath),
            publicPath: '/'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
                },
                {
                    exclude: /fonts/,
                    test: /\.(jpeg|jpg|png|gif|svg|JPEG|JPG|PNG|GIF|SVG)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]',
                            outputPath: 'static/imgs'
                        }
                    }
                },
                {
                    exclude: /imgs/,
                    test: /\.(woff|woff2|svg|eot|ttf)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '[name].[ext]',
                            outputPath: 'static/fonts'
                        }
                    }
                },
                {
                    test: /\.ejs$/,
                    use: 'ejs-loader'
                }
            ]
        },
        devServer: {
            compress: true,
            port: 8000,
            contentBase: path.resolve(__dirname, outPutPath),
            openPage: 'templates/',
            // host: '192.168.1.100',
        },
        plugins: [
            new CleanWebpackPlugin('../src/main/resources/dist', {
                // 允许插件清理webpack目录以外的文件夹
                allowExternal: true,
                beforeEmit: false
            }), // 清除之前build的版本
            new MiniCssExtractPlugin({
                filename: 'static/css/[name].css',
            }),
            new HtmlWebPackPlugin({
                template: './src/pages/home/index.html',
                filename: outPutFolder + 'index.html',
                path: path.resolve(__dirname, outPutPath)
            }),
            new CopyWebpackPlugin([{
                from: path.resolve(__dirname, './src/static'),
                to: 'static',
                ignore: ['.*']
            }])
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCssAssetsPlugin({})
            ],
        }
    };
    const files = glob.sync('./src/pages/**/*.html');
    files.forEach(file => {
        const pathArray = file.replace('.html', "").split('/')
        const lastItem = pathArray[pathArray.length - 1];
        const newArr = pathArray.filter(function (ele, i) {
            if (ele === lastItem) {
                return ele;
            }
        })
        if (file.indexOf('home') === -1) {
            if (newArr.length === 2) {
                config.plugins.push(
                    new HtmlWebPackPlugin({
                        template: file,
                        filename: outPutFolder + file.replace(removePath, "").replace(`/${lastItem}`, ""),
                        path: path.resolve(__dirname, outPutPath)
                    })
                );
            } else {
                config.plugins.push(
                    new HtmlWebPackPlugin({
                        template: file,
                        filename: outPutFolder + file.replace(removePath, ""),
                        path: path.resolve(__dirname, outPutPath)
                    })
                );
            }
        }
    });

    return config;
}
