import * as Webpack from 'webpack';
import {resolve} from 'path';
/** ビルド結果出力先 */
const BUILT_PATH = resolve(__dirname, './dist');
/** ビルド種別 */
const BUILD_VARIANT = process.env.NODE_ENV;


const config: Webpack.Configuration = {
  target: 'node',
  mode: BUILD_VARIANT === 'production' ? 'production' : 'development',
  resolve: {
    extensions: ['.ts', '.js', '.tsx']
  },
  devtool: 'source-map',
  entry: './index.ts',
  output: {
    filename: 'index.js',
    path: BUILT_PATH,
    libraryTarget: 'commonjs2'
  },
  // externals: ['dtrace-provider', 'fs', 'mv', 'os', 'source-map-support'],
  externals: ['dtrace-provider', 'fs', 'mv', 'os'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ]
  }
};

export default config;