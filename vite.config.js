import 'dotenv/config'
import {defineConfig} from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import serveStatic from 'serve-static'
import purge from '@erbelion/vite-plugin-laravel-purgecss'
import {visualizer} from 'rollup-plugin-visualizer'
import fs from 'fs'

function cors (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
  res.setHeader('Access-Control-Expose-Headers', 'Content-Length')
  res.setHeader('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range')
  if (req.method === 'OPTIONS') {
    return res.send(200)
  } else {
    return next()
  }
}

/**
 * Serve /public folder assets in development mode
 */
function generalAssets () {
  return {
    name: 'general-assets',
    configureServer (server) {
      server.middlewares.use(cors)
      server.middlewares.use(serveStatic('public', {index: false}))
    }
  }
}

/**
 * Delete all .map files after build is complete and files uploaded to sentry
 */
function cleanMaps () {
  return {
    name: 'clean-maps',
    enforce: 'post',
    apply: 'build',
    closeBundle: {
      // sequential: true,
      async handler () {
        const path = './public/build/assets/'
        fs.readdirSync(path)
          .filter(f => /.+\.map$/.test(f))
          .map(f => fs.unlinkSync(path + f))
      }
    },
  }
}


export default defineConfig({
  base: '/build',

  build: {
    sourcemap: true, // Source map generation must be turned on
  },

  plugins: [
    laravel({
      input: [
        'resources/assets/sass/vendor.scss',
        'resources/assets/sass/app.scss',
        'resources/assets/js/app.js',
        'resources/assets/js/jquery.js',
        'resources/assets/js/datatables.js',
      ],
    }),

    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false,
        },
        compilerOptions: {
          whitespace: 'preserve',
        },
      },
    }),

    // Serve /public folder assets in development mode
    generalAssets(),

    // Purge not used CSS
    purge({
      templates: ['blade', 'vue'],
      paths: [
        'app/**/*',
        'resources/assets/**/*.js',
        'resources/assets/**/*.vue',
        'resources/views/**/*',
      ],
      safelist: [/ui-icon-circle-triangle-.*/],
    }),

    // Visualize bundle
    visualizer({
      template: 'treemap', // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: 'analyse.html', // will be saved in project's root
    }),

    // Delete source maps for security
    cleanMaps(),
  ],

  resolve: {
    alias: {
      '~': '/resources/assets/js',
    },
  },
})

