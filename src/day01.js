const { readFile } = require('fs').promises

const getLines = (filename) =>
  readFile(filename, { encoding: 'utf8' })
    .then((contents) => contents.toString().trim().split('\n'));

const numericArray = (length) => [...Array(length).keys()];

const increaseCount = (list) => {
  const listOffsetByOne = list.slice(1, list.length)

  return numericArray(listOffsetByOne.length)
    .map(i => list[i] < listOffsetByOne[i])
    .filter(Boolean).length;
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const depths = lines.map(line => parseInt(line));

  const singleIncreaseCount = () => increaseCount(depths);

  const trebleIncreaseCount = () => {
    const listFromStart = depths.slice(0, depths.length - 2);
    const listFromNext = depths.slice(1, depths.length - 1);
    const listFromNextNext = depths.slice(2, depths.length);
    const differences = numericArray(listFromStart.length)
      .map(i => listFromStart[i] + listFromNext[i] + listFromNextNext[i])

    return increaseCount(differences);
  }

  return {
    singleIncreaseCount,
    trebleIncreaseCount,
  }
}