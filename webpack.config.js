var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/frontend/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
    })
  ],
  module: {
    loaders: [
      { test: /\.jsx?$/, loaders: ['react-hot-loader', 'babel-loader'], include: path.join(__dirname, 'src/') },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
      { test: /\.(jpe?g|png|gif|svg)$/i, loaders: ['file?hash=sha512&digest=hex&name=[hash].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'] }
    ],
  },
  externals: {
    fs: '{}',
    tls: '{}',
    net: '{}',
    console: '{}',
  }
};
