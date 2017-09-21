let mix = require('laravel-mix');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const plugins = [];

if (isProduction) {
  plugins.push(new BundleAnalyzerPlugin());
}


mix.js('resources/assets/js/app.js', 'public/js')
  .sass('resources/assets/sass/app.scss', 'public/css')
  .webpackConfig({
    devServer: {
      historyApiFallback: true,
      quiet: false,
      proxy: {
        '!/**/*.{css,js,hot-update.js,hot-update.json}': {
          target: 'http://localhost:8000',
          secure: false,
        },
      },
    },
    plugins,
  });
