const { getLines, numericArray } = require('./helpers');

const adjacentPositions = (row, column) => [
  [row - 1, column],
  [row - 1, column + 1],
  [row, column + 1],
  [row + 1, column + 1],
  [row + 1, column],
  [row + 1, column - 1],
  [row, column - 1],
  [row - 1, column - 1]
];

const findAdjacent = ([row, column], grid) => adjacentPositions(row, column)
  .filter(([row, column]) => row >= 0 && row < grid.length && column >= 0 && column < grid[0].length);

const setDifference = (setA, setB) => {
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
};

const firstUncountedOctopusThatShouldFlash = (octopusGrid, alreadyFlashed) => {
  const shouldFlash = octopusGrid
    .map((octopuses, rowIndex) => octopuses
      .map((octopus, columnIndex) => octopus > 9 ? `${rowIndex}-${columnIndex}` : null)
      .filter(octopus => octopus))
    .reduce((acc, curr) => curr.length ? acc.concat(curr) : acc, []);

  const difference = setDifference(new Set(shouldFlash), alreadyFlashed);
  return difference.size > 0 && difference.values().next().value;
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  return {
    flashCount: (steps) => {
      let octopusGrid = lines.map(line => line.split('').map(o => parseInt(o)));
      let flashCount = 0;
      numericArray(steps).forEach(_ => {
        octopusGrid = octopusGrid.map(octopuses => octopuses.map(octopus => octopus + 1));
        const flashed = new Set();
        let octopusThatShouldFlash;
        while (octopusThatShouldFlash = firstUncountedOctopusThatShouldFlash(octopusGrid, flashed)) {
          flashed.add(octopusThatShouldFlash);
          const [rowIndex, columnIndex] = octopusThatShouldFlash.split('-').map(x => parseInt(x));
          const adjacent = findAdjacent([rowIndex, columnIndex], octopusGrid);
          adjacent.forEach(([row, column]) => {
            octopusGrid[row][column]++;
          });
        }

        flashCount += flashed.size;
        octopusGrid = octopusGrid.map(octopuses => octopuses.map(octopus => octopus > 9 ? 0 : octopus));
      })
      return flashCount;
    },
  }
}