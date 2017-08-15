const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
// 	entry: [
// 		'./src/script/main.js', //入口文件
// 		'./src/script/search.js'
// 	],
// 	output: {
// 		//path: path.resolve(__dirname, 'dist/js'), //输出文件路径
// 		path: __dirname + '/dist/js', //输出文件路径
// 		filename: 'bundle.js' // 输出文件名
// 	} 
// }

/*
module.exports = {
	entry: {
		main: './src/script/main.js', //入口文件
		search: './src/script/search.js',
        searchA: './src/script/searchA.js',
        searchB: './src/script/searchB.js'
	},
	output: {
		//path: path.resolve(__dirname, 'dist/js'), //输出文件路径
		path: __dirname + '/dist', //输出文件路径
		//filename: 'js/[name].[hash].js', // 输出文件名
		filename: 'js/[name].js', // 输出文件名
		publicPath: 'http://localhost/'
	},
	plugins: [
		new htmlWebpackPlugin({
			//filename: '[hash].index.html',
			filename: 'index.html',
			template: 'index.html',
			inject: true,
			title: 'webpack is good!',
			chunks: ['main', 'search']
		}),
        new htmlWebpackPlugin({
            //filename: '[hash].index.html',
            filename: 'a.html',
            template: 'index.html',
            inject: true,
            title: 'webpack is good!A',
			chunks: ['main','searchA']
        }),
        new htmlWebpackPlugin({
            //filename: '[hash].index.html',
            filename: 'b.html',
            template: 'index.html',
            inject: true,
            title: 'webpack is good!B',
            chunks: ['main','searchB']
        })
	]
};*/
module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist', //输出文件路径
        filename: 'js/[name].bundle.js', // 输出文件名
    },
    module:{
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude:  __dirname + 'node_modules',
                include:  __dirname + 'src'
                // query: {
                //     presets: ['latest']
                // }
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.ejs$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.css$/,
                // loader: 'style-loader!css-loader',
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            // modules: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('postcss-import')(), //使用@import 一个CSS文件，需要使用这句【importLoaders: 1,】前提是必须使用'postcss-import'
                                require('autoprefixer')({
                                    browsers: 'last 5 versions'
                                })
                            ]
                        }
                    }
                ],
            },
            {
                test:/\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: (loader) => [
                                require('postcss-import')(), //使用@import 一个CSS文件，需要使用这句【importLoaders: 1,】前提是必须使用'postcss-import'
                                require('autoprefixer')({
                                    browsers: 'last 5 versions'
                                })
                            ]
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body',
            title: 'webpack is good!'
        })
    ]
};