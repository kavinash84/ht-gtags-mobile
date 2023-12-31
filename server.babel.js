//  enable runtime transpilation to use ES6/7 in node
require('babel-polyfill');

const fs = require('fs');

const babelrc = fs.readFileSync('./.babelrc');
let config;

try {
  config = JSON.parse(babelrc);
  if (Array.isArray(config.plugins)) {
    config.plugins.push('dynamic-import-node');
  }
} catch (err) {
  console.error('==>     ERROR: Error parsing your .babelrc.');
  console.error(err);
}

require('babel-register')(config);
