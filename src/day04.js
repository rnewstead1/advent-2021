const { getLines, numericArray } = require('./helpers');

const buildBoard = (boardNumbers) => {
  return {
    numbers: boardNumbers,
    marked: numericArray(5).map(i => Array(5).fill(false)),
  };
}

const wholeRowIsMarked = (marked, rowIndex) => marked[rowIndex].every(Boolean);
const wholeColumnIsMarked = (marked, columnIndex) => marked.map(row => row[columnIndex]).every(Boolean);

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  return {
    finalScore: () => {
      const bingoNumbers = lines[0].split(',').map(num => parseInt(num));

      const boards = [];
      let boardNumbers;
      const boardLines = lines.slice(1).map(line => line.trim());
      boardLines.forEach((line, i) => {
        if (line.length === 0) {
          if (boardNumbers) {
            boards.push(buildBoard(boardNumbers));
          }
          boardNumbers = [];
        } else {
          boardNumbers.push(line.split(/\s+/).map(num => parseInt(num)));
          if (i === boardLines.length - 1) {
            boards.push(buildBoard(boardNumbers));
          }
        }
      });

      let bingo;
      outerLoop:
        for (let bingoNumber of bingoNumbers) {
          for (let board of boards) {
            for (const [rowIndex, row] of board.numbers.entries()) {
              const columnIndex = row.indexOf(bingoNumber);
              if (columnIndex >= 0) {
                board.marked[rowIndex][columnIndex] = true;
                if (wholeRowIsMarked(board.marked, rowIndex) || wholeColumnIsMarked(board.marked, columnIndex)) {
                  bingo = { board, number: bingoNumber };
                  break outerLoop;
                }
              }
            }
          }
        }
      const numbersToSum = bingo.board.marked
        .map((row, rowIndex) => row
          .map((marked, columnIndex) => marked ? 0 : bingo.board.numbers[rowIndex][columnIndex]));

      const sum = numbersToSum.reduce((acc, curr) => acc += curr.reduce((acc, curr) => acc += curr, 0), 0);
      return sum * bingo.number;
    },
  }
}

