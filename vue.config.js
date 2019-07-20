/**
 * Created by wangxuanbo on 2019/7/19.
 */

const webpack = require('webpack')
const path = require('path')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const os = require('os')
const Happypack = require('happypack')
const happyThreadPool = Happypack.ThreadPool({ size: os.cpus().length })
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
module.exports = {
  chainWebpack: config => {
    const jsRule = config.module.rule('js')
    jsRule.uses.clear()
    jsRule.include.add(path.resolve(__dirname, 'src'))
    jsRule.test(/\.(js|jsx)$/)
      .use('happypack/loader?id=happybabel')
      .loader('happypack/loader?id=happybabel')

    const htmlRule = config.module.rule('html')
    htmlRule.uses.clear()
    htmlRule.include.add(path.resolve(__dirname, 'public'))
    htmlRule.test(/\.html$/)
      .use('happypack/loader?id=happyhtml')
      .loader('happypack/loader?id=happyhtml')

    config.resolve.alias.set('@views', path.resolve('src/views'))
      .set('global', path.resolve('src/assets/less/global.less'))
  },
  configureWebpack: {
    plugins: [
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require('./vendor-manifest.json')
      }),
      new AddAssetHtmlPlugin([{
        filepath: path.resolve(__dirname, './public/dll/*.js'),
        publicPath: './dll',
        outputPath: './dll'
      }, {
        filepath: path.resolve(__dirname, './public/*.js'),
        publicPath: './',
        outputPath: './'
      }]),
      new Happypack({
        id: 'happybabel',
        loaders: ['babel-loader'],
        threadPool: happyThreadPool,
        verbose: true
      }),
      new Happypack({
        id: 'happyhtml',
        loaders: ['raw-loader'],
        threadPool: happyThreadPool,
        verbose: true
      }),
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css)$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
}
