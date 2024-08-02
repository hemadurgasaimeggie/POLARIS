const HtmlWebPackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const LiveReloadPlugin = require('@kooneko/livereload-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const zlib = require('zlib');

module.exports = (env, argv) => {
  const pluginsToAdd = [];
  const webpackMode = argv.mode;

  pluginsToAdd.push(
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
    new ModuleFederationPlugin({
      name: 'POLARISBASEUI',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {},
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './sdk-config.json', to: './' },
        { from: './node_modules/@pega/constellationjs/dist/bootstrap-shell.js', to: './constellation' },
        { from: './node_modules/@pega/constellationjs/dist/bootstrap-shell.*.*', to: 'constellation/[name][ext]' },
        { from: './node_modules/@pega/constellationjs/dist/lib_asset.json', to: './constellation' },
        { from: './node_modules/@pega/constellationjs/dist/constellation-core.*.*', to: 'constellation/prerequisite/[name][ext]', globOptions: { ignore: webpackMode === 'production' ? ['**/constellation-core.*.map'] : undefined } }
      ]
    }),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.ts$|\.css$|\.html$/,
      exclude: /constellation-core.*.js|bootstrap-shell.js/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new CompressionPlugin({
      filename: '[path][base].br',
      algorithm: 'brotliCompress',
      test: /\.(js|ts|css|html|svg)$/,
      exclude: /constellation-core.*.js|bootstrap-shell.js/,
      compressionOptions: { params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 } },
      threshold: 10240,
      minRatio: 0.8
    })
  );

  if (webpackMode === 'development') {
    pluginsToAdd.push(new LiveReloadPlugin({ protocol: 'http', appendScriptTag: true, delay: 1000, hostname: 'localhost' }));
  }

  return {
    mode: webpackMode,
    entry: './src/index.tsx',
    devServer: {
      static: path.join(__dirname, 'dist'),
      historyApiFallback: true,
      host: 'localhost',
      port: 3000,
      open: false,
    },
    devtool: webpackMode === 'production' ? false : 'inline-source-map',
    plugins: pluginsToAdd,
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: 'http://localhost:3000/',
    },
    module: {
      rules: [
        { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ },
        { test: /\.css$/, use: ['style-loader', 'css-loader'] },
        { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
        { test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
        { test: /\.(woff2?|ttf|eot|svg)$/i, loader: 'url-loader' },
        { test: /\.(d.ts|map)$/, loader: 'null-loader' }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    }
  };
};
