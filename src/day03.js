const { getLines, numericArray } = require('./helpers');

const asDecimal = (gammaRate) => parseInt(gammaRate.join(''), 2);

const getBitToKeep = (matrix, index, bitToKeepFn) => {
  let oneCount = 0;
  matrix.forEach(row => {
    oneCount += row[index];
  })
  return bitToKeepFn(oneCount, matrix.length) ? 1 : 0
};

const filterMatrix = (originalMatrix, bitToKeepFn) => {
  let matrix = originalMatrix;
  let i = 0;
  while (matrix.length > 1) {
    const bitToKeep = getBitToKeep(matrix, i, bitToKeepFn);
    matrix = matrix.filter(row => row[i] === bitToKeep)
    i++;
  }
  return matrix[0];
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const indexes = numericArray(lines[0].length);
  indexes.map(i => lines.map(line => parseInt(line[i])));
  const matrix = lines.map(line => line.split('').map(bit => parseInt(bit)));

  return {
    powerConsumption: () => {
      const gammaRate = indexes.map(i => getBitToKeep(matrix, i, (oneCount, length) => oneCount > length / 2));
      const epsilonRate = indexes.map(i => getBitToKeep(matrix, i, (oneCount, length) => oneCount < length / 2));

      return asDecimal(gammaRate) * asDecimal(epsilonRate);
    },

    lifeSupportRating: () => {
      const oxygenGeneratorRating = filterMatrix(matrix, (oneCount, length) => oneCount >= length / 2);
      const co2ScrubberRating = filterMatrix(matrix, (oneCount, length) => oneCount < length / 2);

      return asDecimal(oxygenGeneratorRating) * asDecimal(co2ScrubberRating);
    },
  }
}

