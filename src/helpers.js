const { readFile } = require('fs').promises

module.exports.getLines = (filename) =>
  readFile(filename, { encoding: 'utf8' })
    .then((contents) => contents.toString().trim().split('\n'));

module.exports.numericArray = (length) => [...Array(length).keys()];

module.exports.sumArray = (arr) => arr.reduce((acc, curr) => acc + curr, 0);
