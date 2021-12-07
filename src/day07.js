const { getLines, numericArray } = require('./helpers');

const fuelToVariable = (positions, x) => positions
    .reduce((acc, position) => acc + numericArray(Math.abs(x - position))
      .reduce((acc, fuelCostForPosition) => acc + fuelCostForPosition + 1, 0), 0);

const fuelToLinear = (positions, x) => positions
  .reduce((acc, curr) => acc + Math.abs(x - curr), 0)

const fuelSpent = (crabs, fuelToFn) => {
  const fuelCosts = [];
  for (let i = Math.min(...crabs); i <= Math.max(...crabs); i++) {
    fuelCosts.push(fuelToFn(crabs, i));
  }
  return Math.min(...fuelCosts);
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const crabs = lines[0].split(',').map(crab => parseInt(crab));

  return {
    fuelSpentLinear: () => fuelSpent(crabs, fuelToLinear),
    fuelSpentVariable: () => fuelSpent(crabs, fuelToVariable),
  }
}

