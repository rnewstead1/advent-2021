const { getLines } = require('./file-helper');

const numericArray = (length) => [...Array(length).keys()];

const asDecimal = (gammaRate) => parseInt(gammaRate.join(''), 2);

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  return {
    powerConsumption: () => {
      const countOfOnesInColumn = numericArray(lines[0].length)
        .map(i => lines
          .map(line => parseInt(line[i]))
          .reduce((acc, curr) => acc + curr, 0));
      const gammaRate = countOfOnesInColumn.map(count => count > lines.length / 2 ? 1 : 0);
      const epsilonRate = countOfOnesInColumn.map(count => count < lines.length / 2 ? 1 : 0);

      return asDecimal(gammaRate) * asDecimal(epsilonRate);
    },
  }
}