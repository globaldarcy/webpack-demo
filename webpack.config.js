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

module.exports = {
	entry: {
		main: './src/script/main.js', //入口文件
		search: './src/script/search.js'
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
			filename: '[id].index.html',
			template: 'index.html',
			inject: false,
			title: 'webpack is good!',
			data: new Date(),
			minify: {
				removeComments: true,
				collapseWhitespace: true
			}
		})
	]
}