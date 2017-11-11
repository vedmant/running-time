const mix = require('laravel-mix');
const argv = require('yargs').argv;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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

if (argv.env && argv.env.analyzer) {
  plugins.push(new BundleAnalyzerPlugin());
}

mix

  .js('resources/assets/js/app.js', 'public/js')
  .extract(['vue', 'vuex', 'vue-router', 'jquery', 'axios', 'moment-mini', 'babel-polyfill'])

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
  })

  .sass('resources/assets/sass/app.scss', 'public/css')
