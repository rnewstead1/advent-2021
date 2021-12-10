const { getLines, sumArray } = require('./helpers');

const positionExists = (column, columnLength, row, rowLength) =>
  column >= 0 && column < columnLength && row >= 0 && row < rowLength;

const getLowPoints = (heightGrid) => {
  const lowPoints = [];
  heightGrid.forEach((heights, rowIndex) => {
    heights.forEach((height, columnIndex) => {
      const adjacentHeights = [
        { column: columnIndex, row: rowIndex - 1 },
        { column: columnIndex, row: rowIndex + 1 },
        { column: columnIndex - 1, row: rowIndex },
        { column: columnIndex + 1, row: rowIndex },
      ].filter(({ column, row }) => positionExists(column, heights.length, row, heightGrid.length))
        .map(({ column, row }) => heightGrid[row][column]);
      if (height < Math.min(...adjacentHeights)) {
        lowPoints.push({ height, position: `${columnIndex}-${rowIndex}` });
      }
    });
  });
  return lowPoints;
}

const getBasin = (heightGrid, position, basinSet = new Set([position])) => {
  const adjacentHeights = [];
  const [column, row] = position.split('-').map(x => parseInt(x));

  if (positionExists(column, heightGrid[0].length, row - 1, heightGrid.length) && heightGrid[row - 1][column] !== 9) {
    const top = `${column}-${row - 1}`;
    if (!basinSet.has(top)) {
      basinSet.add(top);
      adjacentHeights.push(top);
    }
  }
  if (positionExists(column, heightGrid[0].length, row + 1, heightGrid.length) && heightGrid[row + 1][column] !== 9) {
    const bottom = `${column}-${row + 1}`;
    if (!basinSet.has(bottom)) {
      basinSet.add(bottom);
      adjacentHeights.push(bottom);
    }
  }
  if (positionExists(column - 1, heightGrid[0].length, row, heightGrid.length) && heightGrid[row][column - 1] !== 9) {
    const left = `${column - 1}-${row}`;
    if (!basinSet.has(left)) {
      basinSet.add(left);
      adjacentHeights.push(left);
    }
  }
  if (positionExists(column + 1, heightGrid[0].length, row, heightGrid.length) && heightGrid[row][column + 1] !== 9) {
    const right = `${column + 1}-${row}`;
    if (!basinSet.has(right)) {
      basinSet.add(right);
      adjacentHeights.push(right);
    }
  }
  adjacentHeights.forEach(position => getBasin(heightGrid, position, basinSet));
  return basinSet.size;
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const heightGrid = lines.map(line => line.split('').map(height => parseInt(height)));
  const lowPoints = getLowPoints(heightGrid);

  return {
    lowPointSum: () => {
      const riskLevels = lowPoints.map(({ height }) => 1 + height);
      return sumArray(riskLevels);
    },
    largestBasins: () => {
      const basins = lowPoints.map(({ position }) => getBasin(heightGrid, position));

      const [biggest, nextBiggest, nextNextBiggest] = basins.sort((a, b) => b - a);
      return biggest * nextBiggest * nextNextBiggest;
    },
  }
}

