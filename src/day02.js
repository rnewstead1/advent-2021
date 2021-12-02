const { getLines } = require('./file-helper');

const commandKeySimple = {
  forward: ([x, y], val) => [x + val, y],
  down: ([x, y], val) => [x, y + val],
  up: ([x, y], val) => [x, y - val],
};

const commandKeyWithAim = {
  forward: ([x, y, a], val) => [x + val, y + (val * a), a],
  down: ([x, y, a], val) => [x, y, a + val],
  up: ([x, y, a], val) => [x, y, a - val],
};

module.exports = async (datafile) => {
  const lines = await getLines(datafile);
  const instructions = lines
    .map(line => line.split(' '))
    .map(([command, val]) => [command, parseInt(val)]);

  return {
    positionSimple: () => {
      const [x, y] = instructions
        .reduce((position, [command, val]) => commandKeySimple[command](position, val), [0, 0]);
      return x * y;
    },
    positionWithAim: () => {
      const [x, y] = instructions
        .reduce((position, [command, val]) => commandKeyWithAim[command](position, val), [0, 0, 0]);
      return x * y;
    },
  }
}