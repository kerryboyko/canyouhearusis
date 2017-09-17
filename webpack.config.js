const path = require("path");
const webpack = require("webpack");
const DashboardPlugin = require("webpack-dashboard/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const jsSourcePath = path.resolve(__dirname, "./src/js");
const buildPath = path.join(__dirname, "./dist");
const imgPath = path.join(__dirname, "./src/assets/img");
const sourcePath = path.join(__dirname, "./src");
const nodePath = path.resolve(__dirname, "node_modules");

const entry = {
  js: "./src/js/index.js"
};

const output = {
  path: path.resolve(__dirname, "dist"),
  filename: "[name]-[hash].js"
};

// we use the rules values as an array here. the
// keys are just to keep track.
const rules = [
  {
    test: /\.(scss|sass|css)$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: true,
          sourceMap: !process.env.NODE_ENV === "production",
          importLoaders: 1,
          localIdentName: "[name]--[local]--[hash:base64:8]"
        }
      },
      {
        loader: "postcss-loader",
        options: {
          plugins: () => [require("postcss-import"), require("postcss-cssnext")]
        }
      }
    ]
  },
  {
    test: /\.(js|jsx)$/,
    loader: "babel-loader",
    options: {
      presets: [
        [
          "env",
          {
            modules: false
          }
        ],
        "es2015",
        "react",
        "stage-1",
        "stage-0"
      ]
    }
  },
  {
    test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
    loader: "url-loader",
    options: {
      limit: 10000
    }
  },
  {
    test: /\.svg$/,
    use: [
      {
        loader: "babel-loader"
      },
      {
        loader: "react-svg-loader",
        query: {
          svgo: {
            plugins: [{ removeTitle: false }],
            floatPrecision: 2
          }
        }
      }
    ]
  },
  {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    use: "url-loader?limit=10000&mimetype=application/font-woff"
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    use: "url-loader?limit=10000&mimetype=application/octet-stream"
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    use: "file-loader"
  }
];

const resolve = {
  extensions: [".js", ".jsx"]
};

const devServer = {
  contentBase: process.env.NODE_ENV === "production" ? "./dist" : "./src",
  historyApiFallback: true,
  port: 3000,
  compress: process.env.NODE_ENV === "production" || true,
  inline: !process.env.NODE_ENV === "production",
  hot: !process.env.NODE_ENV === "production",
  host: "0.0.0.0",
  stats: {
    assets: true,
    children: false,
    chunks: false,
    hash: false,
    modules: false,
    publicPath: false,
    timings: true,
    version: false,
    warnings: true,
    colors: {
      green: "\u001b[32m"
    }
  }
};

let pluginArray = [
  new webpack.EnvironmentPlugin(["NODE_ENV"]),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "src/index.html")
  }),
  new webpack.optimize.AggressiveMergingPlugin()
];

if (process.env.NODE_ENV === "development") {
  pluginArray = pluginArray.concat([new DashboardPlugin()]);
}

module.exports = {
  entry,
  output,
  module: {
    rules
  },
  resolve,
  devServer,
  plugins: pluginArray
};
