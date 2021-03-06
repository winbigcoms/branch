const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // entry file
  entry: ['@babel/polyfill','./src/js/main.js'],
  // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/js'),
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader:'css-loader',
            options: {
              url: true,
              import:true
            }
          },
          "postcss-loader",
          {
            loader: 'resolve-url-loader',
            options: {
              attempts: 1
            }
          }
        ]
      },
      {
        test:/\.(png|jpe)$/,
        loader: 'file-loader',
        options: {
          publicPath: './dist/'
        }
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development',
  plugins:[
    new MiniCssExtractPlugin({filename:'style.css'})
  ]
};