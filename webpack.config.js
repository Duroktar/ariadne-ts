const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack')

const plugins = [
    // NOTE: fix "process is not defined" error
    new webpack.ProvidePlugin({
        process: 'process/browser',
    }),
];

if (process.env['ENABLE_ANALYZER'] === 'true')
    plugins.push(new BundleAnalyzerPlugin())

module.exports = {
  mode: 'development',
  entry: './www/index.tsx',
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    static: [
      path.join(__dirname, "docs"),
    ],
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { "path": false, "fs": false },
    plugins: [new TsconfigPathsPlugin()]
  },
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/docs/',
  },
  optimization: {
    usedExports: true,
  },
};
