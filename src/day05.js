const { getLines } = require('./helpers');

const asCoordinate = (pair) => pair.split(',').map(num => parseInt(num));
const coordinateString = (x, y) => `${x},${y}`;

const buildGrid = (coordinates) => {
  let grid = {};
  coordinates.forEach(([first, second]) => {
    const [x1, y1] = first;
    const [x2, y2] = second;
    if (x1 === x2) {
      for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
        const coordinate = coordinateString(x1, y);
        let existingCount = grid[coordinate] || 0;
        grid[coordinate] = existingCount + 1;
      }
    }
    if (y1 === y2) {
      for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
        const coordinate = coordinateString(x, y1);
        let existingCount = grid[coordinate] || 0;
        grid[coordinate] = existingCount + 1;
      }
    }
  });
  return grid;
}

const countOfOverlappingLines = (grid) => Object.keys(grid).filter(coordinate => grid[coordinate] >= 2).length;

const buildGridIncludingDiagonals = (coordinates, baseGrid) => {
  let gridIncludingDiagonals = { ...baseGrid };
  coordinates.forEach(([first, second]) => {
    const [x1, y1] = first;
    const [x2, y2] = second;
    if (x1 !== x2 && y1 !== y2) {
      if (x1 < x2) {
        let n = 0;
        for (let x = x1; x <= x2; x++) {
          if (y1 < y2) {
            const coordinate = coordinateString(x, y1 + n);
            let existingCount = gridIncludingDiagonals[coordinate] || 0;
            gridIncludingDiagonals[coordinate] = existingCount + 1;
            n++;
          } else {
            const coordinate = coordinateString(x, y1 - n);
            let existingCount = gridIncludingDiagonals[coordinate] || 0;
            gridIncludingDiagonals[coordinate] = existingCount + 1;
            n++;
          }
        }
      } else {
        let n = 0;
        for (let x = x1; x >= x2; x--) {
          if (y1 < y2) {
            const coordinate = coordinateString(x, y1 + n);
            let existingCount = gridIncludingDiagonals[coordinate] || 0;
            gridIncludingDiagonals[coordinate] = existingCount + 1;
            n++;
          } else {
            const coordinate = coordinateString(x, y1 - n);
            let existingCount = gridIncludingDiagonals[coordinate] || 0;
            gridIncludingDiagonals[coordinate] = existingCount + 1;
            n++;
          }
        }
      }
    }
  })
  return gridIncludingDiagonals;
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const coordinates = lines.map(line => {
    const [first, _, second] = line.split(' ');
    return [asCoordinate(first), asCoordinate(second)];
  });
  const grid = buildGrid(coordinates);

  return {
    overlappingHorizontalAndVerticalLines: () => {
      return countOfOverlappingLines(grid);
    },
    overlappingAnyDirection: () => {
      const gridIncludingDiagonals = buildGridIncludingDiagonals(coordinates, grid);
      return countOfOverlappingLines(gridIncludingDiagonals);
    },
  }
}

