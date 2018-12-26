const MODE = "development";
const ENABLED_SOURCEMAP = MODE === "development";

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;

module.exports = {
  mode: MODE,
  devServer: {
    contentBase: "dist",
    watchContentBase: true,
    port: 3000,
    open: true
  },
  entry: "./src/js/index.js",
  output: {
    path: `${__dirname}/dist`,
    filename: "bundle.js",
    publicPath: "/"
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")({
                  grid: true,
                  browsers: ["> 1%", "IE 11"]
                })
              ]
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/images/"),
        to: path.resolve(__dirname, "dist/images/")
      }
    ]),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      pngquant: {
        quality: "95-100"
      }
    }),
    new HtmlWebPackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html"
    })
    // htmlを増やしてページを追加する場合はここに追加していく
    // 上の }) にカンマを付けるのを忘れずに
    // new HtmlWebPackPlugin({
    //   template: "./src/html/about/index.html",
    //   filename: "./about/index.html"
    // })
  ]
};
