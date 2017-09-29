const spawn = require('cross-spawn');

let args = process.argv.slice(2);
if (args.indexOf('--config') === - 1) {
  args = args.concat(['--config', 'nightwatch.conf.js'])
}
if (args.indexOf('--env') === - 1) {
  args = args.concat(['--env', 'chrome,phantomjs'])
}
const i = args.indexOf('--test');
if (i > - 1) {
  args[i + 1] = 'resources/assets/test/tests/' + args[i + 1]
}

const runner = spawn('./node_modules/.bin/nightwatch', args, {
  stdio: 'inherit'
});
