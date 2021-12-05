const { getLines } = require('./helpers');

const asCoordinate = (pair) => pair.split(',').map(num => parseInt(num));
const coordinateString = (x, y) => `${x},${y}`;

const buildGrid = (coordinates) => {
  let grid = {};
  coordinates.forEach(([start, end]) => {
    const [startX, startY] = start;
    const [endX, endY] = end;
    if (startX === endX) {
      for (let y = Math.min(startY, endY); y <= Math.max(startY, endY); y++) {
        const coordinate = coordinateString(startX, y);
        let existingCount = grid[coordinate] || 0;
        grid[coordinate] = existingCount + 1;
      }
    }
    if (startY === endY) {
      for (let x = Math.min(startX, endX); x <= Math.max(startX, endX); x++) {
        const coordinate = coordinateString(x, startY);
        let existingCount = grid[coordinate] || 0;
        grid[coordinate] = existingCount + 1;
      }
    }
  });
  return grid;
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  return {
    atLeastTwoOverlappingLines: () => {
      const coordinates = lines.map(line => {
        const [start, _, end] = line.split(' ');
        return [asCoordinate(start), asCoordinate(end)];
      });

      const grid = buildGrid(coordinates);
      return Object.keys(grid).filter(coordinate => grid[coordinate] >= 2).length;
    },
  }
}

