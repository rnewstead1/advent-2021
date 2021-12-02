const { readFile } = require('fs').promises

module.exports.getLines = (filename) =>
  readFile(filename, { encoding: 'utf8' })
    .then((contents) => contents.toString().trim().split('\n'));
