const { getLines, numericArray } = require('./helpers');

const buildBoard = (boardNumbers) => ({
  numbers: boardNumbers,
  marked: numericArray(5).map(_ => Array(5).fill(false)),
});

const wholeRowIsMarked = (marked, rowIndex) => marked[rowIndex].every(Boolean);
const wholeColumnIsMarked = (marked, columnIndex) => marked.map(row => row[columnIndex]).every(Boolean);

const finalScore = ({ number, board }) => {
  const sum = board.marked
    .map((row, rowIndex) => row
      .map((marked, columnIndex) => marked ? 0 : board.numbers[rowIndex][columnIndex]))
    .reduce((acc, curr) => acc += curr.reduce((acc, curr) => acc += curr, 0), 0);
  return sum * number;
}

const getBingoForAllBoards = (bingoNumbers, boards) => {
  let bingos = [];
  loopBingoNumbers:
    for (const bingoNumber of bingoNumbers) {
      loopBoards:
        for (const board of boards) {
          if (!board.bingo) {
            const { numbers: boardNumbers, marked } = board;
            loopRows:
              for (const [rowIndex, row] of boardNumbers.entries()) {
                const columnIndex = row.indexOf(bingoNumber);
                if (columnIndex >= 0) {
                  marked[rowIndex][columnIndex] = true;
                  if (wholeRowIsMarked(board.marked, rowIndex) || wholeColumnIsMarked(marked, columnIndex)) {
                    bingos.push({ board, number: bingoNumber });
                    board.bingo = true;
                    break;
                  }
                }
              }
          }
        }
    }
  return bingos;
}

const buildBoards = (lines) => {
  const boards = [];
  let numbers;
  const boardLines = lines.slice(1).map(line => line.trim());
  boardLines.forEach((line, i) => {
    if (line.length === 0) {
      if (numbers) {
        boards.push(buildBoard(numbers));
      }
      numbers = [];
    } else {
      numbers.push(line.split(/\s+/).map(num => parseInt(num)));
      if (i === boardLines.length - 1) {
        boards.push(buildBoard(numbers));
      }
    }
  });
  return boards;
}

module.exports = async (datafile) => {
  const lines = await getLines(datafile);

  const bingoNumbers = lines[0].split(',').map(num => parseInt(num));
  const boards = buildBoards(lines);
  const bingos = getBingoForAllBoards(bingoNumbers, boards);

  return {
    firstToWinFinalScore: () => {
      return finalScore(bingos[0]);
    },

    lastToWinFinalScore: () => {
      return finalScore(bingos[bingos.length - 1]);
    },
  }
}

