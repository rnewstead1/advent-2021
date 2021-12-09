const { getLines, sumArray } = require('./helpers');

const coordinatesExist = (column, maxColumnLength, row, maxRowLength) =>
  column >= 0 && column < maxColumnLength && row >= 0 && row < maxRowLength;

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  return {
    lowPointSum: () => {
      const heightGrid = lines.map(line => line.split('').map(height => parseInt(height)));
      const lowPoints = [];
      heightGrid.forEach((heights, rowIndex) => {
          heights.forEach((height, columnIndex) => {
            const adjacentHeights = [
              { column: columnIndex, row: rowIndex - 1 },
              { column: columnIndex, row: rowIndex + 1 },
              { column: columnIndex - 1, row: rowIndex },
              { column: columnIndex + 1, row: rowIndex },
            ].filter(({ column, row }) => coordinatesExist(column, heights.length, row, heightGrid.length))
              .map(({ column, row }) => heightGrid[row][column]);
            if (height < Math.min(...adjacentHeights)) {
              lowPoints.push(height);
            }
          });
      });
      const riskLevels = lowPoints.map(lowPoint => 1 + lowPoint);
      return sumArray(riskLevels);
    },
  }
}

