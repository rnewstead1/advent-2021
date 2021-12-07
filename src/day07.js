const { getLines } = require('./helpers');

const fuelTo = (positions, x) => positions.reduce((acc, curr) => acc + Math.abs(x - curr), 0)

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const crabs = lines[0].split(',').map(crab => parseInt(crab));

  return {
    fuelSpent: () => {
      const fuelCosts = [];
      for (let i = Math.min(...crabs); i <= Math.max(...crabs); i++) {
        fuelCosts.push(fuelTo(crabs, i));
      }
      return Math.min(...fuelCosts);
    }
  }
}

