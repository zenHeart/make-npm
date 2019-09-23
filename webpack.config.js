const path = require ('path');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const CleanWebpackPlugin = require ('clean-webpack-plugin');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const CopyPlugin = require ('copy-webpack-plugin');
const express = require ('express');
const fs = require ('fs');

/**
 * 获取所有 ppt 的文件名
 * 
 * @return 返回所有 ppt 文件名
 */
function getPPTFiles (dirName) {
  return fs.readdirSync (dirName).filter (ele => {
    return ele.includes ('.md');
  });
}

module.exports = {
  mode: 'development',
  entry: {
    app: './index.js',
  },
  plugins: [
    new CopyPlugin ([
      {from: 'node_modules/reveal.js', to: 'reveal.js/'},
      {from: 'ppt', to: '.'},
    ]),
    new HtmlWebpackPlugin ({
      title: 'reveal-demo',
      template: 'template.pug',
      sections: getPPTFiles ('./ppt'), //配置 PPT 的读取目录
    }),
    new CleanWebpackPlugin (),
    new ExtractTextPlugin ('styles.css'),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    hot: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve (__dirname, 'dist'),
  },
  module: {
    rules: [
      // { parser: { amd: false }},
      {
        test: require.resolve ('reveal.js/plugin/highlight/highlight.js'),
        use: [
          {
            loader: 'expose-loader',
            options: 'hljs',
          },
        ],
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
          },
        ],
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract ({
          use: 'css-loader',
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.(png|svg|jpg|gif|md)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'static/',
            },
          },
        ],
      },
    ],
  },
};
