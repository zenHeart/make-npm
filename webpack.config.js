const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './index.js',
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'node_modules/reveal.js/dist', to: 'reveal.js/dist' },
        { from: 'node_modules/reveal.js/plugin', to: 'reveal.js/plugin' },
        { from: 'ppt', to: '.' },
      ],
    }),
    new HtmlWebpackPlugin({
      title: '创建 NPM 包',
      template: 'template.pug',
      sections: fs.readdirSync(path.join(__dirname, 'ppt')).filter(name => name.endsWith('.md')).sort(),
    }),
  ],
  devtool: 'source-map',
  devServer: {
    static: { directory: path.join(__dirname, 'dist') },
    hot: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [{ test: /\.pug$/, use: 'pug-loader' }],
  },
};
