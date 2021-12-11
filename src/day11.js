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

const getOctopusGrid = (lines) => lines.map(line => line.split('').map(o => parseInt(o)));

const getFlashesForSingleStep = (octopusGrid) => {
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

  return { count: flashed.size, grid: octopusGrid.map(octopuses => octopuses.map(octopus => octopus > 9 ? 0 : octopus)) };
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  return {
    flashCount: (steps) => {
      let total = 0;
      let octopusGrid = getOctopusGrid(lines);
      numericArray(steps).forEach(_ => {
        const { count, grid} = getFlashesForSingleStep(octopusGrid);
        octopusGrid = grid;
        total += count;
      })
      return total;
    },
    simultaneousFlashStep: () => {
      let octopusGrid = getOctopusGrid(lines);
      const gridSize = octopusGrid.length * octopusGrid[0].length;
      let step = 0;
      let flashCount;
      do {
        const flashes = getFlashesForSingleStep(octopusGrid);
        flashCount = flashes.count;
        octopusGrid = flashes.grid;
        step++;
      } while (flashCount !== gridSize);
      return step;
    }
  }
}