const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: "development",
  entry: {
    bundle: path.resolve(__dirname, "src/app.js"),
    home: path.resolve(__dirname, "src/pages/home.js"),
    signIn: path.resolve(__dirname, "src/pages/sign-in.js"),
    signUp: path.resolve(__dirname, "src/pages/sign-up.js"),
    post: path.resolve(__dirname, "src/pages/post.js"),
    editor: path.resolve(__dirname, "src/pages/editor.js"),
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name].[contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/transform-runtime"]],
          },
        },
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      chunks: ["bundle", "home"],
    }),
    new HtmlWebpackPlugin({
      filename: "sign-in.html",
      template: "./public/sign-in.html",
      favicon: "./public/favicon.ico",
      chunks: ["bundle", "signIn"],
    }),
    new HtmlWebpackPlugin({
      filename: "sign-up.html",
      template: "./public/sign-up.html",
      favicon: "./public/favicon.ico",
      chunks: ["bundle", "signUp"],
    }),
    new HtmlWebpackPlugin({
      filename: "post.html",
      template: "./public/post.html",
      favicon: "./public/favicon.ico",
      chunks: ["bundle", "post"],
    }),
    new HtmlWebpackPlugin({
      filename: "editor.html",
      template: "./public/editor.html",
      favicon: "./public/favicon.ico",
      chunks: ["bundle", "editor"],
    }),
    new HtmlWebpackPlugin({
      filename: "404.html",
      template: "./public/404.html",
      favicon: "./public/favicon.ico",
      chunks: ["bundle"],
    }),
    new MiniCssExtractPlugin(),
    new Dotenv(),
  ],
};
