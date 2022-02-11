const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
  .js('resources/assets/js/app.js', 'public/js').vue()
  .extract(['vue', 'vuex', 'vue-router', 'jquery', 'axios', 'moment-mini'])
  .sass('resources/assets/sass/app.scss', 'public/css')


// Add eslint check
if (process.env.NODE_ENV === 'development') {
  mix.webpackConfig({
    module: {
      rules: [
        {
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: /node_modules/,
        },
      ],
    },
  })
}
