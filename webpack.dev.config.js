const webpack = require('webpack');
const path    = require('path');

module.exports = {
  entry   : './src/App.ts',
  output  : {
    path     : path.resolve('./'),
    filename : 'app.js'
  },
  resolve : {
    root       : [
      path.resolve('./node_modules'),
      path.resolve('./src')
    ],
    extensions : [
      '',
      '.webpack.js',
      '.web.js',
      '.ts',
      '.js',
      '.tsx'
    ]
  },
  module  : {
    loaders : [{
      test   : /\.tsx?$/,
      loader : 'ts-loader?sourceMap=false&configFileName=tsconfig.json'
    }]
  },
  plugins : [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"development"'
    })
  ]
};