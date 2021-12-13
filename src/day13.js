const { getLines } = require('./helpers');

const arrayContains = (arr, [x, y]) => arr.find(([x1, y1]) => x1 === x && y1 === y);

const makeFold = (dots, axis, index) => {
  let foldResult = [];
  dots.forEach(([x, y]) => {
    if (axis === 'x' && x > index) {
      const foldedDot = [index - (x - index), y];
      if (!arrayContains(dots, foldedDot)) {
        foldResult.push(foldedDot);
      }
    } else if (axis === 'y' && y > index) {
      const foldedDot = [x, index - (y - index)];
      if (!arrayContains(dots, foldedDot)) {
        foldResult.push(foldedDot);
      }
    } else {
      foldResult.push([x, y]);
    }
  });
  return foldResult;
}

const asPrintString = (foldResult) => {
  const grid = foldResult
    .reduce((acc, [x, y]) => {
      acc[y] = (acc[y] || []).concat(x);
      return acc;
    }, [])
    .map(row => row.sort((a, b) => a - b));

  const maxColumnLength = Math.max(...grid.map(row => Math.max(...row)));

  let printString = '';
  grid.forEach(row => {
    for (let i = 0; i <= maxColumnLength; i++) {
      const ch = row.includes(i) ? '#' : ' ';
      printString = `${printString}${ch}`;
    }
    printString = `${printString}\n`
  });
  console.log(printString);

  return printString;
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  const separatorIndex = lines.findIndex(line => line.length === 0);
  const dots = lines.slice(0, separatorIndex).map(line => line.split(',').map(l => parseInt(l)));
  const folds = lines.slice(separatorIndex + 1).map(line => {
    const matches = line.match(/fold along ([yx])=([0-9]+)/);
    return [matches[1], matches[2]];
  });

  return {
    dotsAfterFirstFold: () => {
      const [axis, index] = folds[0];
      const foldResult = makeFold(dots, axis, index);

      return foldResult.length;
    },
    printedDotsAfterAllFolds: () => {
      const foldResult = folds.reduce((acc, [axis, index]) => makeFold(acc, axis, index), [...dots]);

      return asPrintString(foldResult);
    }
  }
}