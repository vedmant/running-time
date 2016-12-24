// http://nightwatchjs.org/guide#settings-file
module.exports = {
  src_folders: ['resources/assets/test/tests'],
  output_folder: 'resources/assets/test/report',
  custom_commands_path: ['node_modules/nightwatch-helpers/commands', 'resources/assets/test/commands'],
  custom_assertions_path: ['node_modules/nightwatch-helpers/assertions'],
  page_objects_path: ['resources/assets/test/page_objects'],
  globals_path: 'resources/assets/test/globals-module.js',

  selenium: {
    start_process: true,
    server_path: 'node_modules/selenium-server/lib/runner/selenium-server-standalone-3.0.1.jar',
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost:8000/#',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: true,
        on_failure: true,
        on_error: false,
        path: 'resources/assets/test/screenshots'
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    phantomjs: {
      desiredCapabilities: {
        browserName: 'phantomjs',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
};
