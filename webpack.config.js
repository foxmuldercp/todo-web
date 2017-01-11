/**
 * Created by Николай on 19.11.2016.
 */

var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var cmdArgs = require('minimist')(process.argv.slice(2));

var NODE_ENV = process.env.NODE_ENV || cmdArgs.NODE_ENV || 'development';
var DEV = NODE_ENV == 'development';
var PROD = NODE_ENV == 'production';

module.exports = {
  entry: ['whatwg-fetch', "./src/main.jsx"],
  output: {
    path: "./dist",
    filename: "bundle.js"
  },
  resolve:{
    extensions:['', '.webpack.js', '.web.js', '.ts', '.js', '.min.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
    }),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      inject: false
    }),
  ],

  module:{
    loaders:[
      // the url-loader uses DataUrls. 
      // the file-loader emits files. 
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        // loaders: DEV ? ['react-hot', 'babel'] : ['babel']
        loader:'babel'
      }, {
        test: /\.(png|jpg|jpeg|gif)$/i,
        loader: "url?limit="+ (5 * 1024) +"&name=images/[name]-[hash:base64:5].[ext]"
      }, {
        test: /.(scss|css)$/,
        loader:'style!css?localIdentName=[name]-[local]-[hash:base64:5]'
      }, {
        test: /.json/,
        loader:'file?name=json/[name].[ext]'
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }    
    ]
  }
//  devtool: 'cheap-module-source-map'
}
