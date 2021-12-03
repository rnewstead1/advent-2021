const { getLines, numericArray } = require('./helpers');

const zip = (lists) => numericArray(lists[0].length)
    .map(i => lists.map(list => list[i]));

const increaseCount = (list) => zip([list, list.slice(1, list.length)])
  .map(([first, second]) => first < second)
  .filter(Boolean).length;

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const depths = lines.map(line => parseInt(line));

  const singleIncreaseCount = () => increaseCount(depths);

  const trebleIncreaseCount = () => increaseCount(
    zip([
      depths.slice(0, depths.length - 2),
      depths.slice(1, depths.length - 1),
      depths.slice(2, depths.length)
    ]).map(([first, second, third]) => first + second + third)
  );

  return {
    singleIncreaseCount,
    trebleIncreaseCount,
  }
}