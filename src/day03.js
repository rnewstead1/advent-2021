const { getLines } = require('./file-helper');

const numericArray = (length) => [...Array(length).keys()];

const asDecimal = (gammaRate) => parseInt(gammaRate.join(''), 2);

function filterMatrix(originalMatrix, bitToKeepFn) {
  let matrix = originalMatrix;
  let i = 0;
  while (matrix.length > 1) {
    let oneCount = 0;
    let bitToKeep;
    matrix.forEach(row => {
      oneCount += row[i];
    });
    bitToKeep = bitToKeepFn(oneCount, matrix.length) ? 1 : 0;
    matrix = matrix.filter(row => row[i] === bitToKeep)
    i++;
  }
  return matrix[0];
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const columns = numericArray(lines[0].length)
    .map(i => lines
      .map(line => parseInt(line[i])));

  const matrix = lines.map(line => line.split('').map(bit => parseInt(bit)));

  return {
    powerConsumption: () => {
      const countOfOnesInColumn = columns.map(column => column.reduce((acc, curr) => acc + curr, 0));
      const gammaRate = countOfOnesInColumn.map(count => count > lines.length / 2 ? 1 : 0);
      const epsilonRate = countOfOnesInColumn.map(count => count < lines.length / 2 ? 1 : 0);

      return asDecimal(gammaRate) * asDecimal(epsilonRate);
    },

    lifeSupportRating: () => {
      const oxygenGeneratorRating = filterMatrix(matrix, (oneCount, length) => oneCount >= length / 2);
      const co2ScrubberRating = filterMatrix(matrix, (oneCount, length) => oneCount < length / 2);
      return asDecimal(oxygenGeneratorRating) * asDecimal(co2ScrubberRating);
    },
  }
}

